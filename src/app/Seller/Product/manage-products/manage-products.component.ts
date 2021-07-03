import { ProductService } from "./../../../Services/Product/Product.service";
import { Product } from "./../../../Models/Product";
import { Router } from "@angular/router";
import { LocalDataSource } from "ng2-smart-table";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-manage-products",
  templateUrl: "./manage-products.component.html",
  styleUrls: ["./manage-products.component.scss"],
})
export class ManageProductsComponent implements OnInit {
  /**========================================================================
   *?                           Table Setting Configuration
   *========================================================================**/

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
      productName: {
        title: "Product Name",
        type: "string",
        width: "150px",
      },
      active: {
        title: "Status",
        type: "string",
        valuePrepareFunction: (active) => {
          if (active == false) {
            return "Not active";
          } else {
            return "Active";
          }
        },
      },
      manufacture: {
        title: "Brand",
        type: "string",
        valuePrepareFunction: (manufacture) => {
          if (manufacture == "") {
            return "not specified";
          } else {
            return manufacture;
          }
        },
      },
      price: {
        title: "Price",
        type: "number",
        valuePrepareFunction: (price) => {
          return price + "$";
        },
      },
      inventoryProducts: {
        title: "Quantity",
        type: "number",
        valuePrepareFunction: (data) => {
          return data[0].quantity + " unit";
        },
      },
      discount: {
        title: "Discount",
        type: "number",
        valuePrepareFunction: (discount) => {
          if (discount == null || discount == 0) {
            return "No Discount";
          } else {
            return discount + "%";
          }
        },
      },
      rangeDate: {
        title: "Discount Date",
        type: "string",
        valuePrepareFunction: (_date: string) => {
          if (_date == null) {
            return "No data";
          } else {
            let date = _date.split(",");
            return `${new Date(date[0]).toLocaleDateString()} to ${new Date(
              date[1]
            ).toLocaleDateString()}`;
          }
        },
        outerWidth: "280px",
      },
      size: {
        title: "Size",
        type: "string",
        valuePrepareFunction: (size) => {
          if (size == null || size == "") {
            return "not available";
          } else {
            return size;
          }
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: ProductService, private route: Router) {}

  ngOnInit() {
    this.service.getAllProducts();
    this.service.getProductsUpdateHandler().subscribe((products: any) => {
      console.log(products);

      this.source.load(products);
    });
  }

  onEditConfirm(event) {
    this.route.navigateByUrl("/seller/product/update/" + event.data.productId);
  }

  onDeleteConfirm(event) {
    this.service.deleteProduct(event.data.productId);
  }
}
