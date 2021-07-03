import { Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Category } from "./../../Models/Category";
import { Injectable } from "@angular/core";
import { TokenProviderService } from "../tokenProvider.service";
import { Router } from "@angular/router";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from "@nebular/theme";
import { port } from "../portNumber";
@Injectable({
  providedIn: "root",
})
export class CategoryService {
  private url = `http://localhost:${port}/api/Category`;

  private Categories: Category[] = [];
  private updatedCategories = new Subject<Category[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastrService: NbToastrService,
    private tokenService: TokenProviderService
  ) {}

  getAllCategories(): any {
    this.http.get<Category>(this.url).subscribe((_categories: any) => {
      this.Categories = [..._categories];
      this.updatedCategories.next([...this.Categories]);
    });
  }

  getCategoriesUpdatedHandler() {
    return this.updatedCategories.asObservable();
  }

  getCategoryById(id) {
    return this.http.get(this.url + "/" + id);
  }

  createCategory(_category: FormData) {
    let headers = this.tokenService.getAdminToken();

    this.http.post(this.url, _category, { headers }).subscribe(
      () => {
        this.showToast("success", "Added successfully", "");
        this.router.navigate(["/admin/categories/manage"]);
      },
      () => {
        this.showToast("danger", "Failed", "");
      }
    );
  }

  updateCategory(id, _category) {
    let headers = this.tokenService.getAdminToken();
    this.http.put(this.url + "/" + id, _category, { headers }).subscribe(
      () => {
        this.showToast("success", "Added successfully", "");
        this.router.navigate(["/admin/categories/manage"]);
      },
      () => {
        this.showToast("danger", "Failed", "");
      }
    );
  }

  deleteCategory(id) {
    let headers = this.tokenService.getAdminToken();
    this.http.delete(this.url + "/" + id, { headers }).subscribe(
      () => {
        this.showToast("success", "Deleted successfully", "");
        let _updatedCategories = this.Categories.filter(
          (c) => c.categoryId != id
        );
        this.Categories = [..._updatedCategories];
        this.updatedCategories.next([...this.Categories]);
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
