import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from "@nebular/theme";
import { Subject } from "rxjs";
import { Seller } from "../../Models/Seller";
import { port } from "../portNumber";
import { TokenProviderService } from "../tokenProvider.service";

@Injectable({
  providedIn: "root",
})
export class SellerService {
  private url = `http://localhost:${port}/api/Seller`;
  private waitingSellers: Seller[];
  private waitingSellersUpdated = new Subject<Seller[]>();
  private activeSellers: Seller[];
  private activeSellerUpdate = new Subject<Seller[]>();
  private sellerProfile: Seller;
  private sellerInfo = new Subject<Seller>();

  constructor(
    private http: HttpClient,
    private _tokenProvider: TokenProviderService,
    private toastrService: NbToastrService
  ) {
    this.waitingSellers = [];
    this.activeSellers = [];
  }

  getWaitingSellers() {
    let headers = this._tokenProvider.getAdminToken();
    this.http.get<Seller>(this.url + "/waiting", { headers }).subscribe(
      (data: any) => {
        this.waitingSellers = [...data];
        this.waitingSellersUpdated.next([...data]);
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

  getWaitingSellerUpdates() {
    return this.waitingSellersUpdated.asObservable();
  }

  approveSeller(id) {
    let headers = this._tokenProvider.getAdminToken();
    this.http.post(this.url + "/apply/" + id, null, { headers }).subscribe(
      () => {
        this.waitingSellers = this.waitingSellers.filter((s) => {
          return s.sellerId != id;
        });

        this.waitingSellersUpdated.next([...this.waitingSellers]);
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

  getActiveSellers() {
    let headers = this._tokenProvider.getAdminToken();
    this.http.get<Seller>(this.url + "/Active", { headers }).subscribe(
      (data: any) => {
        this.activeSellers = [...data];
        this.activeSellerUpdate.next([...data]);
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

  getActiveUpdatedHandler() {
    return this.activeSellerUpdate.asObservable();
  }

  blockSeller(id) {
    let headers = this._tokenProvider.getAdminToken();
    this.http.post(this.url + "/block/" + id, null, { headers }).subscribe(
      () => {
        this.activeSellers = this.activeSellers.filter((s) => {
          return s.sellerId != id;
        });

        this.activeSellerUpdate.next([...this.activeSellers]);
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

  /* --------------------------------- profile -------------------------------- */
  getSellerProfile() {
    let headers = this._tokenProvider.getSellerToken();
    this.http.get<Seller>(this.url, { headers }).subscribe(
      (data) => {
        this.sellerProfile = data;
        this.sellerInfo.next(data);
      },
      () => {
        this.showToast("danger", "Check internet", "");
      }
    );
  }

  getSellerInfoUpdates() {
    return this.sellerInfo.asObservable();
  }

  /* ---------------------------------- edit ---------------------------------- */
  updateSeller(data) {
    let headers = this._tokenProvider.getSellerToken();
    this.http.put(this.url, data, { headers }).subscribe(
      () => {
        this.showToast("success", "updated", "");
        this.sellerProfile.applicationUser.fname = data.fname;
        this.sellerProfile.applicationUser.lname = data.lname;
        this.sellerProfile.applicationUser.email = data.email;
        this.sellerProfile.applicationUser.address = data.address;
        this.sellerProfile.applicationUser.phoneNumber = data.phoneNumber;
        this.sellerInfo.next(this.sellerProfile);
      },
      () => {
        this.showToast("danger", "Check internet", "");
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
