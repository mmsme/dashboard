import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { map } from "rxjs/operators";
import { Seller } from "../../../Models/Seller";
import { port } from "../../../Services/portNumber";
import { ProductService } from "../../../Services/Product/Product.service";
import { SellerService } from "../../../Services/Seller/Seller.service";

@Component({
  selector: "app-ApproveSeller",
  templateUrl: "./ApproveSeller.component.html",
  styleUrls: ["./ApproveSeller.component.scss"],
})
export class ApproveSellerComponent implements OnInit {
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
      fullName: {
        title: "Full Name",
        type: "string",
      },
      email: {
        title: "Email",
        type: "string",
      },
      address: {
        title: "Address",
        type: "string",
      },
      phoneNumber: {
        title: "Phone Number",
        type: "string",
      },
      storeName: {
        title: "Store Name",
        type: "string",
      },
      nationalCard: {
        title: "National Card",
        type: "html",
        valuePrepareFunction: (url) => {
          return "<a href='" + url + "' target='_blank' >National Card</a>";
        },
      },
      contract: {
        title: "Contract",
        type: "html",
        valuePrepareFunction: (url) => {
          return "<a href='" + url + "' target='_blank' >Contract</a>";
        },
      },
      taxCard: {
        title: "Tax Card",
        type: "html",
        valuePrepareFunction: (url) => {
          return "<a href='" + url + "' target='_blank' >Tax Card</a>";
        },
      },
      commercialRegistryCard: {
        title: "Commercial Registry Card",
        type: "html",
        valuePrepareFunction: (url) => {
          return (
            "<a href='" +
            url +
            "' target='_blank' >Commercial Registry Card</a>"
          );
        },
      },
    },
  };

  source: LocalDataSource;

  constructor(private _sellerServices: SellerService) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this._sellerServices.getWaitingSellers();
    this._sellerServices
      .getWaitingSellerUpdates()
      .pipe(
        map((data) => {
          return data.map((seller: Seller) => {
            return {
              Id: seller.sellerId,
              fullName:
                seller.applicationUser.fname + seller.applicationUser.lname,
              email: seller.applicationUser.email,
              address: seller.applicationUser.address,
              phoneNumber: seller.applicationUser.phoneNumber,
              nationalCard: seller.nationalCard,
              storeName: seller.storeName,
              contract: seller.contract,
              commercialRegistryCard: seller.commercialRegistryCard,
              taxCard: seller.taxCard,
            };
          });
        })
      )
      .subscribe((data) => {
        this.source.load([...data]);
      });
  }

  onApprove(event) {
    let id = event.data.Id;
    this._sellerServices.approveSeller(id);
  }
}
