import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from "@nebular/theme";
import { Subject } from "rxjs";
import { Governorate } from "../../Models/Governorate";
import { port } from "../portNumber";
import { TokenProviderService } from "../tokenProvider.service";

@Injectable({
  providedIn: "root",
})
export class GovernorateService {
  private url = `http://localhost:${port}/api/Governorate`;
  private Governorates: Governorate[] = [];
  private UpdatedGovernorate = new Subject<Governorate[]>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenProvider: TokenProviderService,
    private toastrService: NbToastrService
  ) {}

  /* ----------------------------------- get ---------------------------------- */
  getAll() {
    let headers = this.tokenProvider.getAdminToken();
    this.http.get(this.url, { headers }).subscribe(
      (data: any) => {
        this.Governorates = [...data];
        this.UpdatedGovernorate.next([...this.Governorates]);
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

  getByID(id) {
    let headers = this.tokenProvider.getAdminToken();
    return this.http.get(this.url + "/" + id, { headers });
  }

  getUpdatedGovernorate() {
    return this.UpdatedGovernorate.asObservable();
  }

  /* ----------------------------------- add ---------------------------------- */
  add(governorate) {
    console.log("hi");

    let headers = this.tokenProvider.getAdminToken();
    this.http.post(this.url, { ...governorate }, { headers }).subscribe(
      (data) => {
        console.log(data);

        this.showToast("success", "Added Successfully", "");
        this.router.navigateByUrl("admin/governorate/manage");
      },
      (e) => {
        console.log(e);

        this.showToast(
          "danger",
          "An Error Occurred",
          "Check your internet connection"
        );
      }
    );
  }

  update(id, governorate) {
    let headers = this.tokenProvider.getAdminToken();
    this.http.put(this.url + "/" + id, governorate, { headers }).subscribe(
      () => {
        this.showToast("success", "Update", "");

        this.router.navigateByUrl("admin/governorate/manage");
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

  delete(id) {
    let headers = this.tokenProvider.getAdminToken();
    this.http.delete(this.url + "/" + id, { headers }).subscribe(
      () => {
        this.showToast("success", "Deleted", "");
        this.Governorates = this.Governorates.filter((g) => {
          return g.governorateId != id;
        });
        this.UpdatedGovernorate.next([...this.Governorates]);
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
