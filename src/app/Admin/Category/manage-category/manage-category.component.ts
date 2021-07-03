import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LocalDataSource } from "ng2-smart-table";
import { CategoryService } from "../../../Services/Category/Category.service";

@Component({
  selector: "ngx-manage-category",
  templateUrl: "./manage-category.component.html",
  styleUrls: ["./manage-category.component.scss"],
})
export class ManageCategoryComponent implements OnInit {
  settings = {
    noDataMessage: "Sorry no data to show!!",
    actions: {
      add: false,
    },
    edit: {
      confirmSave: true,
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      categoryId: {
        title: "Id",
        type: "number",
      },
      name: {
        title: "Name",
        type: "string",
      },
      createdAt: {
        title: "Created At",
        type: "string",
        valuePrepareFunction: (date) => {
          return new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
        },
      },
      updatedAt: {
        title: "Updated At",
        type: "string",
        valuePrepareFunction: (date) => {
          return new Date().toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          });
        },
      },
      image: {
        title: "Image",
        type: "html",
        valuePrepareFunction: (url) => {
          if (!url) {
            return "there is no image";
          }
          return "<a href='" + url + "' target='_blank' >image</a>";
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private categoryServices: CategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.categoryServices.getAllCategories();
    this.categoryServices
      .getCategoriesUpdatedHandler()
      .subscribe((_categories) => {
        this.source.load([..._categories]);
        console.log(this.source);
      });
  }

  add() {
    this.router.navigate(["/admin/categories/add"]);
  }

  onEditConfirm(event) {
    this.router.navigateByUrl(
      "/admin/categories/edit/" + event.data.categoryId
    );
  }

  onDeleteConfirm(event) {
    let id = event.data.categoryId;
    this.categoryServices.deleteCategory(id);
  }
}
