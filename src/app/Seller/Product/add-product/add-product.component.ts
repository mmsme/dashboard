import { InventoryService } from "./../../../Services/Inventory/Inventory.service";
import { Inventory } from "./../../../Models/Inventory";
import { Router } from "@angular/router";
import { mimeType } from "./../../../common/mime-type.validators";
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
import { CategoryService } from "./../../../Services/Category/Category.service";
import { Category } from "../../../Models/Category";
import { TokenProviderService } from "../../../Services/tokenProvider.service";

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
})
export class AddProductComponent implements OnInit {
  /* ---------------------------- fixed data for ui --------------------------- */
  steps: string[] = [
    "Choose Category",
    "Product Information",
    "Product Specification",
    "Product Pricing",
    "Images",
  ];
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

  /* ------------------------ used for handle ui inputs ----------------------- */
  min: Date;
  max: Date;
  inventories: Inventory[] = [];
  categories: Category[] = [];
  selectedCategory: Category = null;
  selectedColor: string = null;
  selectedFile!: File;
  Colors: string[] = [];
  SelectedImages: any[] = [];
  date: string;
  productSpecification: any;

  /* ---------------------------------- forms --------------------------------- */
  categoryForm: FormGroup;
  productInfoForm: FormGroup;
  priceForm: FormGroup;
  ImageForm: FormGroup;
  product: FormData = new FormData();

  constructor(
    private _categoryService: CategoryService,
    private _productService: ProductService,
    private _inventoryService: InventoryService,
    protected dateService: NbDateService<Date>,
    private windowService: NbWindowService,
    private toastrService: NbToastrService,
    private fb: FormBuilder,
    private router: Router,
    private tokenProvider: TokenProviderService
  ) {
    /* ------------------------------ Category Form ----------------------------- */
    this.categoryForm = this.fb.group({
      inventory: [null, Validators.required],
      mainCategory: [null, Validators.required],
      subCategory: [null, Validators.required],
    });

    /* ---------------------------- Product Info Form --------------------------- */
    this.productInfoForm = this.fb.group({
      productName: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
          CustomValidators.checkSpaceInInput,
        ],
      ],
      productDescription: [
        null,
        [
          Validators.required,
          Validators.minLength(50),
          CustomValidators.checkSpaceInInput,
          Validators.maxLength(350),
        ],
      ],
      size: [null, [Validators.required, CustomValidators.checkSpaceInInput]],
      brand: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          CustomValidators.checkSpaceInInput,
        ],
      ],

      stock: [null, [Validators.required, Validators.min(1)]],
    });

    /* ------------------------------- Price Form ------------------------------- */
    this.priceForm = this.fb.group({
      price: [null, [Validators.required, Validators.min(1)]],
      discount: [null, [Validators.min(3), Validators.max(90)]],
    });

    /* ---------------------------- Image FormControl --------------------------- */
    this.ImageForm = this.fb.group({
      image: [
        { validators: [Validators.required], asyncValidators: [mimeType] },
      ],
    });
  }

  ngOnInit() {
    // get Category

    this._categoryService.getAllCategories();
    this._categoryService
      .getCategoriesUpdatedHandler()
      .subscribe((_categories) => {
        this.categories = _categories;
      });

    // get Inventory
    this._inventoryService.getAll();
    this._inventoryService.getInventoriesHandler().subscribe((_inventories) => {
      this.inventories = _inventories;
    });

    this.min = this.dateService.addMonth(this.dateService.today(), 0);
    this.max = this.dateService.addMonth(this.dateService.today(), 6);
  }

  /**========================================================================
   *                           Get Category Form Control
   *========================================================================**/

  get Inventory(): any {
    return this.categoryForm.get("inventory");
  }

  get MainCategory(): any {
    return this.categoryForm.get("mainCategory");
  }

  get SubCategory(): any {
    return this.categoryForm.get("subCategory");
  }

  /**========================================================================
   *                         Get Product Info Form Controls
   *========================================================================**/

  get ProductName(): any {
    return this.productInfoForm.get("productName");
  }

  get ProductDescription(): any {
    return this.productInfoForm.get("productDescription");
  }

  get Brand(): any {
    return this.productInfoForm.get("brand");
  }

  get Size(): any {
    return this.productInfoForm.get("size");
  }

  get Stock(): any {
    return this.productInfoForm.get("stock");
  }

  /**========================================================================
   *                           Get Price Form Controls
   *========================================================================**/

  get Price(): any {
    return this.priceForm.get("price");
  }

  get Discount(): any {
    return this.priceForm.get("discount");
  }

  /**========================================================================
   *                           Image Form Controls
   *========================================================================**/

  get Image(): any {
    return this.ImageForm.get("image");
  }

  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */
  /* -------------------------------------------------------------------------- */

  /**========================================================================
   *                           Category Handler
   *========================================================================**/
  changeCategory(id) {
    this.selectedCategory = this.categories.find((c) => c.categoryId == id);
  }

  /**========================================================================
   *                           Color Piker Window Handlers
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
    if (!this.Colors.includes(this.selectedColor)) {
      this.Colors.push(this.selectedColor);
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
    this.Colors.splice(_color, 1);
    this.showToast("success", "Deleted", "Your Color has been deleted");
  }

  clearAllColors() {
    this.Colors = [];
    this.showToast("success", "Cleared", "All Colors have been deleted");
  }

  /**========================================================================
   *                           Product Specification
   *========================================================================**/
  productSpecificationHandler(event) {
    this.productSpecification = event.editor.getData();
  }

  /**========================================================================
   *                           Date Piker Handler
   *========================================================================**/
  handleDateChange(event) {
    if (event.end) {
      let start = moment
        .utc(event.start, "DD-MM-YYYY", true)
        .toDate()
        .toDateString(); //.format("DD-MM-YYYY") //new Date(event.start).toISOString()
      let end = moment
        .utc(event.end, "DD-MM-YYYY", true)
        .toDate()
        .toDateString(); //).format("DD-MM-YYYY") //new Date(event.end).toISOString()
      this.date = start + "," + end;
      this.priceForm.updateValueAndValidity();
    } else {
      this.showToast("danger", "Invalid Data Range", "");
      this.priceForm.setErrors({});
    }
  }

  /**========================================================================
   *                           Image Form Handler
   *========================================================================**/

  onFileSelect(event: any): any {
    let files = event.target.files;
    for (let i = 0; i < files.length; i++) {
      if (this.isImage(files[i].name)) {
        this.product.append("files", files[i], files[i].name);
        this.SelectedImages.push(URL.createObjectURL(files[i]));
      } else {
        this.showToast(
          "danger",
          "invalid File",
          `your file ${files[i].name} is not an image`
        );
      }
    }
  }

  getExtension(filename) {
    var parts = filename.split(".");
    return parts[parts.length - 1];
  }

  isImage(filename) {
    var ext = this.getExtension(filename);
    switch (ext.toLowerCase()) {
      case "jpg":
      case "gif":
      case "bmp":
      case "png":
        //etc
        return true;
    }
    return false;
  }

  addProduct() {
    if (
      this.ImageForm.valid &&
      this.priceForm.valid &&
      this.productInfoForm.valid &&
      this.categoryForm.valid
    ) {
      let inventoryId = this.Inventory.value;
      this.product.append("ProductName", this.ProductName.value);
      this.product.append("Description", this.ProductDescription.value);
      this.product.append("Details", this.productSpecification);
      this.product.append("Manufacture", this.Brand.value);
      this.product.append("Size", this.Size.value);
      this.product.append("color", this.Colors.toString());
      this.product.append("quantity", this.Stock.value);
      this.product.append("price", this.Price.value);
      this.product.append("discount", this.Discount.value || 0);
      this.product.append("rangeDate", this.date || "");
      this.product.append("brandId", "1");
      this.product.append("subCategotyId", this.SubCategory.value);
      this._productService.addProduct(inventoryId, this.product);

      // this.ImageForm.reset();
      // this.priceForm.reset();
      // this.productInfoForm.reset();
      // this.categoryForm.reset();
    }
  }
  /**========================================================================
   *                           Toast Maker
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
