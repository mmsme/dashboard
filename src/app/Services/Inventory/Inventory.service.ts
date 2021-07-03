import { Subject } from "rxjs";
import { Inventory } from "./../../Models/Inventory";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  NbToastrService,
  NbGlobalPhysicalPosition,
  NbComponentStatus,
} from "@nebular/theme";
import { TokenProviderService } from "../tokenProvider.service";
import { port } from "../portNumber";

@Injectable({
  providedIn: "root",
})
export class InventoryService {
  private url = `http://localhost:${port}/api/Inventory`;
  token;
  private inventories: Inventory[] = [];
  private updatedInventory = new Subject<Inventory[]>();

  constructor(
    private http: HttpClient,
    private toastrService: NbToastrService,
    //? this for test only
    private _tokenProvider: TokenProviderService
  ) {}

  getAll() {
    let headers = this._tokenProvider.getSellerToken();
    this.http.get<Inventory[]>(this.url, { headers }).subscribe(
      (_inventories: Inventory[]) => {
        this.inventories = [..._inventories];
        this.updatedInventory.next([...this.inventories]);
        console.log(this.inventories);
      },
      (error) => {
        this.showToast(
          "danger",
          "An Error Occurred",
          "Check your internet connection"
        );
      }
    );
  }

  getInventoriesHandler() {
    return this.updatedInventory.asObservable();
  }

  add(inventory) {
    let headers = this._tokenProvider.getSellerToken();
    this.http.post(this.url, inventory, { headers }).subscribe(
      (_inventory: Inventory) => {
        this.inventories.push(_inventory);
        this.updatedInventory.next([...this.inventories]);

        this.showToast(
          "success",
          "Added Successfully",
          "Your Inventory has been added"
        );
      },
      (error) => {
        this.showToast(
          "danger",
          "An Error Occurred",
          "Check your internet connection"
        );
      }
    );
  }

  edit(_inventory: Inventory) {
    let headers = this._tokenProvider.getSellerToken();
    this.http
      .put(this.url + "/" + _inventory.inventoryId, _inventory, {
        headers,
      })
      .subscribe(
        (_inventory: Inventory) => {
          const index = this.inventories.findIndex(
            (i) => i.inventoryId == _inventory?.inventoryId
          );
          this.inventories[index] = _inventory;
          this.updatedInventory.next([...this.inventories]);
          this.showToast(
            "success",
            "Updated Successfully",
            "Your Inventory has been updated"
          );
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
    let headers = this._tokenProvider.getSellerToken();
    this.http.delete(this.url + "/" + id, { headers }).subscribe(
      () => {
        let updated = this.inventories.filter((i) => i.inventoryId != id);
        this.inventories = [...updated];
        this.updatedInventory.next([...this.inventories]);
      },
      () => {
        this.showToast("danger", "An Error Occurred", "");
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
