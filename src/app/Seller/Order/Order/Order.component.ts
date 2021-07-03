import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { OrderService } from "../../../Services/Order/Order.service";

@Component({
  selector: "app-Order",
  templateUrl: "./Order.component.html",
  styleUrls: ["./Order.component.scss"],
})
export class OrderComponent implements OnInit {
  settings = {
    noDataMessage: "Sorry no data to show!!",
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      productName: {
        title: "Product Name",
        type: "string",
        width: "150px",
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
      Quantity: {
        title: "Quantity",
        type: "number",
        valuePrepareFunction: (data) => {
          return data + " unit";
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

  constructor(private orderServ: OrderService) {}

  ngOnInit() {
    this.orderServ.getAllSellersOrders();
    this.orderServ.getOrdersUpdates().subscribe((data: any) => {
      this.source.load([...data]);
    });
  }
}
