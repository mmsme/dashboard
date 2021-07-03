import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LocalDataSource } from "ng2-smart-table";
import { SubCategoryService } from "../../../Services/SubCategory/SubCategory.service";

@Component({
  selector: "ngx-manage-sub-category",
  templateUrl: "./manage-sub-category.component.html",
  styleUrls: ["./manage-sub-category.component.scss"],
})
export class ManageSubCategoryComponent implements OnInit {
  subCategories: any[] = [];

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
      subCategoryId: {
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
    private subCategoryServices: SubCategoryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.subCategoryServices.getAllSubCategories();
    this.subCategoryServices
      .getUpdatedSubCategory()
      .subscribe((_subcategories) => {
        console.log(_subcategories);

        this.source.load(_subcategories);
      });
  }

  add() {
    this.router.navigate(["/admin/subCategories/add"]);
  }

  onEditConfirm(event) {
    let id = event.data.subCategoryId;
    this.router.navigateByUrl("/admin/subCategories/edit/" + id);
  }

  onDeleteConfirm(event) {
    let id = event.data.subCategoryId;
    this.subCategoryServices.deleteSubCategory(id);
  }
}
