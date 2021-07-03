import { ActivatedRoute } from "@angular/router";
import { Product } from "./../../../Models/Product";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import {
  NbComponentStatus,
  NbDateService,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from "@nebular/theme";
import { NbWindowService } from "@nebular/theme";
import * as moment from "moment";

import { CustomValidators } from "./../../../common/custom-validators";
import { ProductService } from "./../../../Services/Product/Product.service";

@Component({
  selector: "ngx-update-product",
  templateUrl: "./update-product.component.html",
  styleUrls: ["./update-product.component.scss"],
})
export class UpdateProductComponent implements OnInit {
  product: Product;
  selectedColor: string = null;
  min: Date;
  max: Date;
  quickColorList = [
    "red",
    "green",
    "blue",
    "yellow",
    "orange",
    "black",
    "white",
    "gold",
    "sliver",
    "violet",
  ];
  form: FormGroup;
  date: string = "";
  isLoading: boolean = true;
  colors = [];

  constructor(
    private _activatedRouter: ActivatedRoute,
    private productService: ProductService,
    private windowService: NbWindowService,
    private toastrService: NbToastrService,
    private fb: FormBuilder,
    private dateService: NbDateService<Date>
  ) {
    this.form = this.fb.group({
      productName: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          CustomValidators.checkSpaceInInput,
        ],
      ],
      description: [
        null,
        [
          Validators.required,
          Validators.minLength(50),
          Validators.maxLength(350),
        ],
      ],
      size: [null, [Validators.required]],
      manufacture: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          CustomValidators.checkSpaceInInput,
        ],
      ],
      quantity: [null, [Validators.required, Validators.min(1)]],
      price: [null, [Validators.required, Validators.min(1)]],
      discount: [null, [Validators.min(3), Validators.max(90)]],
      details: [null, Validators.required],
    });
  }

  ngOnInit() {
    this._activatedRouter.params.subscribe((url) => {
      const id = url.id;
      this.productService.getSellerProductByID(id).subscribe((res: any) => {
        this.product = res?.data as Product;
        console.log(this.product);

        this.form.patchValue(this.product);
        this.Stock.value = this.product.inventoryProducts[0].quantity;

        if (this.product.rangeDate) {
          let dateString = this.product.rangeDate.split(",");

          this.date = `${new Date(dateString[0]).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })} - ${new Date(dateString[1]).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}`;
        }

        this.colors = this.product.color.split(",");
        this.isLoading = false;
      });
    });

    this.min = this.dateService.addMonth(this.dateService.today(), 0);
    this.max = this.dateService.addMonth(this.dateService.today(), 6);
  }

  /**========================================================================
   **                           Form Controls
   *========================================================================**/

  get ProductName(): any {
    return this.form.get("productName");
  }

  get ProductDescription(): any {
    return this.form.get("description");
  }

  get Brand(): any {
    return this.form.get("manufacture");
  }

  get Size(): any {
    return this.form.get("size");
  }

  get Stock(): any {
    return this.form.get("quantity");
  }

  get Price(): any {
    return this.form.get("price");
  }

  get Discount(): any {
    return this.form.get("discount");
  }

  get Specification() {
    return this.form.get("details");
  }

  /**========================================================================
   **                           Color Piker Window Handlers
   *========================================================================**/
  openColorPikerWindow(contentTemplate) {
    this.windowService.open(contentTemplate, {
      title: `Color Selector Window`,
    });
  }

  quickColorHandler(_color) {
    this.selectedColor = _color;
  }

  addColor() {
    if (!this.colors.includes(this.selectedColor)) {
      this.colors.push(this.selectedColor);
      this.showToast(
        "success",
        "Color added successfully",
        `your color: ${this.selectedColor} has been added`
      );
    } else {
      this.showToast(
        "warning",
        "Duplicated Color",
        `Color: ${this.selectedColor}, is already exist`
      );
    }
  }

  removeColor(_color) {
    this.colors.splice(_color, 1);
    this.showToast("success", "Deleted", "Your Color has been deleted");
  }

  clearAllColors() {
    this.colors = [];
    this.showToast("success", "Cleared", "All Colors have been deleted");
  }

  /**========================================================================
   **                           Date Piker Handler
   *========================================================================**/
  handleDateChange(event) {
    let start = moment
      .utc(event.start, "DD-MM-YYYY", true)
      .toDate()
      .toDateString(); //.format("DD-MM-YYYY") //new Date(event.start).toISOString()
    let end = moment.utc(event.end, "DD-MM-YYYY", true).toDate().toDateString(); //).format("DD-MM-YYYY") //new Date(event.end).toISOString()
    this.date = start + "," + end;
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

  /**========================================================================
   **                           Update
   *========================================================================**/
  updateHandler() {
    if (this.form.invalid) {
      this.showToast("warning", "Invalid Data", "Your input data is not valid");
      return;
    }

    this.product.productName = this.ProductName.value;
    this.product.description = this.ProductDescription.value;
    this.product.details = this.Specification.value;
    this.product.manufacture = this.Brand.value;
    this.product.color = this.colors.toString();
    this.product.size = this.Size.value;
    this.product.quantity = this.Stock.value;
    this.product.price = this.Price.value;
    this.product.discount = this.Discount.value;
    this.product.rangeDate = this.date || "";

    this.productService.editProduct(this.product.productId, this.product);
  }
}
