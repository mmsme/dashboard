import { Product } from "./../../Models/Product";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import {
  NbToastrService,
  NbComponentStatus,
  NbGlobalPhysicalPosition,
} from "@nebular/theme";
import { TokenProviderService } from "../tokenProvider.service";
import { port } from "../portNumber";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private url = `http://localhost:${port}/api/Product`;

  /* -------------------------------- products -------------------------------- */
  private Products: Product[] = [];
  private ProductsUpdated = new Subject<Product[]>();

  /* ---------------------------- waiting products ---------------------------- */

  private waitingProducts: Product[] = [];
  private waitingProductsUpdates = new Subject<Product[]>();

  constructor(
    private http: HttpClient,
    private toastrService: NbToastrService,
    private _tokenProvider: TokenProviderService
  ) {}

  /* --------------------------------- get all -------------------------------- */
  getAllProducts() {
    let headers = this._tokenProvider.getSellerToken();

    this.http.get<Product[]>(this.url + "/seller", { headers }).subscribe(
      (_products: any[]) => {
        this.Products = [...(_products[0] as Product[])];
        this.ProductsUpdated.next([...this.Products]);
      },
      () => {
        this.showToast(
          "danger",
          "An Error Occurred",
          "Check your internet connection"
        );
      }
    );
  }

  getProductsUpdateHandler() {
    return this.ProductsUpdated.asObservable();
  }

  getSellerProductByID(id) {
    var subject = new Subject<any>();

    let headers = this._tokenProvider.getSellerToken();

    this.http
      .get(this.url + "/Details/seller/" + id, { headers })
      .subscribe((product) => {
        subject.next(product);
      });

    return subject.asObservable();
  }

  getWaitingProducts() {
    let headers = this._tokenProvider.getAdminToken();

    this.http.get<any>(this.url + "/waiting", { headers }).subscribe((data) => {
      this.waitingProducts = [...data];
      this.waitingProductsUpdates.next([...data]);
    });
  }

  getWaitingUpdatedHandler() {
    return this.waitingProductsUpdates.asObservable();
  }

  /* ----------------------------------- add ---------------------------------- */
  addProduct(inventoryId: number, product: FormData) {
    let headers = this._tokenProvider.getSellerToken();

    this.http
      .post(this.url + "/" + inventoryId, product, { headers })
      .subscribe(
        (data: any) => {
          this.Products.push(data);
          this.ProductsUpdated.next([...this.Products]);
          this.showToast(
            "success",
            "Added successfully",
            "your product added to our database"
          );
        },
        (err) => {
          this.showToast("danger", "Failed", "failed to add product");
        }
      );
  }

  /* --------------------------------- update --------------------------------- */

  editProduct(id, data) {
    let headers = this._tokenProvider.getSellerToken();
    this.http.put(this.url + "/" + id, data, { headers }).subscribe(() => {
      this.showToast(
        "success",
        "Updated Successfully",
        "your product has been updated"
      );
    });
  }
  /* --------------------------------- delete --------------------------------- */
  deleteProduct(id) {
    let headers = this._tokenProvider.getSellerToken();

    this.http.delete(this.url + "/" + id, { headers }).subscribe(
      () => {
        // to update the products
        this.showToast(
          "success",
          "Deleted successfully",
          "your product deleted successfully"
        );
        let updatedProduct = this.Products.filter((p) => p.productId != id);
        this.Products = [...updatedProduct];
        this.ProductsUpdated.next([...this.Products]);
      },
      () => {
        this.showToast("danger", "Failed", "failed to delete product");
      }
    );
  }

  /* ----------------------------- approve Product ---------------------------- */
  approveProduct(id) {
    let headers = this._tokenProvider.getAdminToken();
    this.http
      .put(this.url + "/approve-product/" + id, null, { headers })
      .subscribe(() => {
        this.waitingProducts = this.waitingProducts.filter((p) => {
          return p.productId != id;
        });

        this.waitingProductsUpdates.next([...this.waitingProducts]);
      });
  }

  /**========================================================================
   *todo                         Toast Services
   *========================================================================**/

  private showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 2000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };
    const titleContent = title ? `${title}` : "";

    this.toastrService.show(body, `${titleContent}`, config);
  }
}
