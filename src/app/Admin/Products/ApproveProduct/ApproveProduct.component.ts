import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../../Services/Product/Product.service";
import { LocalDataSource } from "ng2-smart-table";
import { Product } from "../../../Models/Product";

@Component({
  selector: "app-ApproveProduct",
  templateUrl: "./ApproveProduct.component.html",
  styleUrls: ["./ApproveProduct.component.scss"],
})
export class ApproveProductComponent implements OnInit {
  settings = {
    noDataMessage: "Sorry no data to show!!",
    actions: {
      add: false,
      edit: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-edit"></i>',
      confirmDelete: true,
    },
    columns: {
      productId: {
        title: "ID",
        type: "string",
      },
      productName: {
        title: "Name",
        type: "string",
      },
      description: {
        title: "Description",
        type: "string",
      },
      price: {
        title: "Price",
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
    },
  };

  source: LocalDataSource;

  constructor(private _productServices: ProductService) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this._productServices.getWaitingProducts();
    this._productServices.getWaitingUpdatedHandler().subscribe((data) => {
      console.log(data);

      this.source.load([...data]);
    });
  }

  onApprove(event) {
    let id = event.data.productId;
    this._productServices.approveProduct(id);
  }
}
