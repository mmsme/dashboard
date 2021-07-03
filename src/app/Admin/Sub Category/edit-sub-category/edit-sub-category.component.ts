import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { SubCategory } from "../../../Models/SubCategory";
import { SubCategoryService } from "../../../Services/SubCategory/SubCategory.service";

@Component({
  selector: "ngx-edit-sub-category",
  templateUrl: "./edit-sub-category.component.html",
  styleUrls: ["./edit-sub-category.component.scss"],
})
export class EditSubCategoryComponent implements OnInit {
  form: FormGroup;
  subCategory: SubCategory;
  subCategoryData: FormData;

  constructor(
    private subCateServ: SubCategoryService,
    private ar: ActivatedRoute
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      image: new FormControl(null, [Validators.required]),
    });

    this.subCategoryData = new FormData();
  }

  ngOnInit() {
    this.ar.params.subscribe((url) => {
      const id = url.id;
      this.subCateServ.getSubcategoryById(id).subscribe((_subcategory) => {
        this.subCategory = _subcategory;
        this.form.patchValue(this.subCategory);
      });
    });
  }

  public get Name(): any {
    return this.form.get("name");
  }

  public get Image(): any {
    return this.form.get("image");
  }

  onImageSelected(event) {
    let files = event.target.files[0] as File;
    this.subCategoryData.append("file", files, files.name);
  }

  editSubCategory() {
    this.subCategoryData.append("name", this.Name.value);
    this.subCateServ.createSubCategory(
      this.subCategory.categoryId,
      this.subCategoryData
    );
  }
}
