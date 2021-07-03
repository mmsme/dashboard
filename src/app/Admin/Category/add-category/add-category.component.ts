import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "../../../Services/Category/Category.service";

@Component({
  selector: "ngx-add-category",
  templateUrl: "./add-category.component.html",
  styleUrls: ["./add-category.component.scss"],
})
export class AddCategoryComponent implements OnInit {
  form: FormGroup;
  category: FormData;

  constructor(private categoryService: CategoryService) {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      image: new FormControl(null, [Validators.required]),
    });

    this.category = new FormData();
  }

  ngOnInit() {}

  public get Name(): any {
    return this.form.get("name");
  }

  public get Image(): any {
    return this.form.get("image");
  }

  onImageSelected(event) {
    let files = event.target.files[0] as File;
    this.category.append("file", files, files.name);
  }

  addCategory() {
    this.category.append("name", this.Name.value);
    this.categoryService.createCategory(this.category);
  }
}
