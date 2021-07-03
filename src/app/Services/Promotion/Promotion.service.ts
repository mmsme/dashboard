import { Promotion } from "./../../Models/Promotion";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import {
  NbComponentStatus,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from "@nebular/theme";
import { Status } from "../../Models/Status.enum";

@Injectable({
  providedIn: "root",
})
export class PromotionService {
  private promotions: Promotion[] = [];
  private promotionsUpdated = new Subject<Promotion[]>();

  constructor(private toastrService: NbToastrService) {}

  getAllPromotions() {
    return [...this.promotions];
  }

  promotionsUpdateHandler() {
    return this.promotionsUpdated.asObservable();
  }

  addPromotion(_promotion: Promotion) {
    if (this.promotions.length == 0) {
      _promotion.Id = 1;
    } else {
      _promotion.Id = this.promotions[this.promotions.length - 1].Id + 1;
    }

    this.promotions.push(_promotion);
    this.showToast("success", "Success", "your Promotion Has been added");
    this.promotionsUpdated.next([...this.promotions]);
  }

  editPromotion(_promotion: Promotion) {
    const index = this.promotions.findIndex((p) => (p.Id = _promotion.Id));

    this.showToast(
      "success",
      "updated",
      "your poromation updated successfully"
    );

    this.promotions[index] = _promotion;
    this.promotionsUpdated.next([...this.promotions]);
  }

  deletePromotion(Id) {
    let updatedPromotions = this.promotions.filter((p) => p.Id !== Id);

    this.promotions = updatedPromotions;
    this.showToast(
      "success",
      "deleted",
      "your poromation deleted successfully"
    );
    this.promotionsUpdated.next([...this.promotions]);
  }

  /**========================================================================
   **                           Toast Maker
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
