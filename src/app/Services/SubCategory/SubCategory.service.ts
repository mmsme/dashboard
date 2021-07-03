import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from "@nebular/theme";
import { Subject } from "rxjs";
import { Category } from "../../Models/Category";
import { SubCategory } from "../../Models/SubCategory";
import { CategoryService } from "../Category/Category.service";
import { port } from "../portNumber";
import { TokenProviderService } from "../tokenProvider.service";

@Injectable({
  providedIn: "root",
})
export class SubCategoryService {
  private url = `http://localhost:${port}/api/SubCategory`;
  private subCategories = [];
  private updatedSubCategories = new Subject<any>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastrService: NbToastrService,
    private categoryServices: CategoryService,
    private tokenService: TokenProviderService
  ) {}

  getAllSubCategories() {
    this.categoryServices.getAllCategories();
    this.categoryServices
      .getCategoriesUpdatedHandler()
      .subscribe((_categories) => {
        _categories.forEach((category: Category) => {
          this.subCategories = this.subCategories.concat([
            ...category.subCategories,
          ]);
        });
        this.subCategories = this.subCategories.sort((a, b) => {
          return a.subCategoryId - b.subCategoryId;
        });
        this.updatedSubCategories.next([...this.subCategories]);
      });
  }

  getUpdatedSubCategory() {
    console.log("Ha Ha Ha Haweui beaa beaa");
    return this.updatedSubCategories.asObservable();
  }

  getSubcategoryById(id) {
    return this.http.get<SubCategory>(this.url + "/" + id);
  }

  createSubCategory(id, _subcategory: FormData) {
    let headers = this.tokenService.getAdminToken();
    this.http.post(this.url + "/" + id, _subcategory, { headers }).subscribe(
      () => {
        this.showToast("success", "Added successfully", "");
        this.router.navigate(["/admin/subCategories/manage"]);
      },
      () => {
        this.showToast("danger", "Failed", "");
      }
    );
  }

  editSubCategory(id, _subcategory) {
    let headers = this.tokenService.getAdminToken();
    this.http.put(this.url + "/" + id, _subcategory, { headers }).subscribe(
      () => {
        this.showToast("success", "Added successfully", "");
        this.router.navigate(["/admin/subCategories/manage"]);
      },
      () => {
        this.showToast("danger", "Failed", "");
      }
    );
  }

  deleteSubCategory(id) {
    let headers = this.tokenService.getAdminToken();

    this.http.delete(this.url + "/" + id, { headers }).subscribe(
      () => {
        let _update = this.subCategories.filter((c) => c.categoryId != id);
        this.subCategories = [..._update];
        this.updatedSubCategories.next([...this.subCategories]);
        this.showToast("success", "Delete successfully", "");
      },
      () => {
        this.showToast("danger", "Failed", "");
      }
    );
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
