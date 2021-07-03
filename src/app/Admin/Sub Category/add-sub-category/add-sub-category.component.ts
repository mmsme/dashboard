import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Category } from "../../../Models/Category";
import { CategoryService } from "../../../Services/Category/Category.service";
import { SubCategoryService } from "../../../Services/SubCategory/SubCategory.service";

@Component({
  selector: "ngx-add-sub-category",
  templateUrl: "./add-sub-category.component.html",
  styleUrls: ["./add-sub-category.component.scss"],
})
export class AddSubCategoryComponent implements OnInit {
  form: FormGroup;
  subCategory: FormData;
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService,
    private subCateServ: SubCategoryService
  ) {
    this.form = new FormGroup({
      categoryId: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      image: new FormControl(null, [Validators.required]),
    });

    this.subCategory = new FormData();
  }

  ngOnInit() {
    this.categoryService.getAllCategories();
    this.categoryService
      .getCategoriesUpdatedHandler()
      .subscribe((_categories) => {
        this.categories = [..._categories];
      });
  }

  public get categoryId(): any {
    return this.form.get("categoryId");
  }

  public get Name(): any {
    return this.form.get("name");
  }

  public get Image(): any {
    return this.form.get("image");
  }

  onImageSelected(event) {
    let files = event.target.files[0] as File;
    this.subCategory.append("file", files, files.name);
  }

  addSubCategory() {
    this.subCategory.append("name", this.Name.value);
    this.subCateServ.createSubCategory(this.categoryId.value, this.subCategory);
  }
}
