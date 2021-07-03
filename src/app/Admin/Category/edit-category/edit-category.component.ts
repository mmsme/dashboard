import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Category } from "../../../Models/Category";
import { CategoryService } from "../../../Services/Category/Category.service";

@Component({
  selector: "ngx-edit-category",
  templateUrl: "./edit-category.component.html",
  styleUrls: ["./edit-category.component.scss"],
})
export class EditCategoryComponent implements OnInit {
  form: FormGroup;
  _categoryData: FormData;
  category: Category;

  constructor(
    private categoryService: CategoryService,
    private ar: ActivatedRoute
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
    });

    this._categoryData = new FormData();
  }

  ngOnInit() {
    this.ar.params.subscribe((url) => {
      const id = url.id;
      this.categoryService
        .getCategoryById(id)
        .subscribe((_category: Category) => {
          this.category = _category;
          this.Name.patchValue(this.category.name);
        });
    });
  }

  public get Name(): any {
    return this.form.get("name");
  }

  onImageSelected(event) {
    let files = event.target.files[0] as File;
    this._categoryData.append("file", files, files.name);
  }

  edit() {
    this._categoryData.append("name", this.Name.value);
    this.categoryService.updateCategory(
      this.category.categoryId,
      this._categoryData
    );
  }
}
