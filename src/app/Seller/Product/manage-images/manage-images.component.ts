import { Product } from "./../../../Models/Product";
import { ProductService } from "./../../../Services/Product/Product.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-manage-images",
  templateUrl: "./manage-images.component.html",
  styleUrls: ["./manage-images.component.scss"],
})
export class ManageImagesComponent implements OnInit {
  products: Product[] = [];

  constructor(private _productServices: ProductService) {}
  ngOnInit() {
    this._productServices.getAllProducts();
    this._productServices.getProductsUpdateHandler().subscribe((_products) => {
      console.log(_products);

      this.products = _products;
    });
  }

  onEdit(event, productIndex, imgIndex) {
    let newImg = URL.createObjectURL(event.target.files[0] as File);
    this.products[productIndex].productImages[imgIndex] = newImg;
  }

  onRemove(productIndex, imgIndex) {
    this.products[productIndex].productImages.splice(imgIndex, 1);
  }

  showState(activeFlag: boolean) {
    if (activeFlag) {
      return "Active";
    }

    return "Not Active";
  }
}
