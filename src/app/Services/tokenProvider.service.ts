import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class TokenProviderService {
  getSellerToken() {
    let headers = new HttpHeaders({
      authorization: "Bearer " + localStorage.getItem("seller"),
    });

    return headers;
  }

  getSellerID() {
    return localStorage.getItem("sellerId");
  }

  getAdminToken() {
    let headers = new HttpHeaders({
      authorization: "Bearer " + localStorage.getItem("admin"),
    });

    return headers;
  }
}
