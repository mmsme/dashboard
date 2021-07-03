import { ProductService } from "./../../../Services/Product/Product.service";
import { Product } from "./../../../Models/Product";
import { NbWindowService } from "@nebular/theme";
import { Component, OnInit } from "@angular/core";
import { Promotion } from "../../../Models/Promotion";
import { Status } from "../../../Models/Status.enum";
import { PromotionService } from "../../../Services/Promotion/Promotion.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "app-Poromation",
  templateUrl: "./Poromation.component.html",
  styleUrls: ["./Poromation.component.scss"],
})
export class PoromationComponent implements OnInit {
  promotions: Promotion[] = [];
  Products: Product[] = [];
  selectedImage: any;
  selectedPromotion: Promotion;

  constructor(
    private promotionService: PromotionService,
    private windowService: NbWindowService,
    private productServices: ProductService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.promotions = this.promotionService.getAllPromotions();
    this.promotionService.promotionsUpdateHandler().subscribe((_promotions) => {
      this.promotions = _promotions;
    });
  }

  openForm(contentTemplate, title: string) {
    this.windowService.open(contentTemplate, {
      title: title,
    });
  }

  onFileSelected(event) {
    let file = event.target.files[0] as File;
    this.selectedImage = URL.createObjectURL(file);
  }

  add(product: Product, description: string, discount: number) {}

  edit(description, discount) {
    this.selectedPromotion.Description = description;
    this.selectedPromotion.Discount = discount;
    this.selectedPromotion.Image = this.selectedImage;
    this.promotionService.editPromotion(this.selectedPromotion);
  }

  delete(id: number) {
    this.promotionService.deletePromotion(id);
  }
}
