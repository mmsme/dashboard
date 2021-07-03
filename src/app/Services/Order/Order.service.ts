import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from "@nebular/theme";
import { Subject } from "rxjs";
import { Order } from "../../Models/Order";
import { port } from "../portNumber";
import { TokenProviderService } from "../tokenProvider.service";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private readonly url = `http://localhost:${port}/api/Seller`;

  private Orders: any[] = [];
  private ordersUpdate = new Subject<any>();

  constructor(
    private http: HttpClient,
    private tokenProvider: TokenProviderService,
    private toastrService: NbToastrService
  ) {}

  getAllSellersOrders() {
    let headers = this.tokenProvider.getSellerToken();
    this.http.get<any>(this.url + "/orders", { headers }).subscribe(
      (data: any) => {
        this.Orders = [...data];
        this.ordersUpdate.next([...this.Orders]);
      },
      () => {
        this.showToast("danger", "check your internet", "");
      }
    );
  }

  getOrdersUpdates() {
    return this.ordersUpdate.asObservable();
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
