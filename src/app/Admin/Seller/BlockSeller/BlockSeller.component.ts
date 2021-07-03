import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { map } from "rxjs/operators";
import { Seller } from "../../../Models/Seller";
import { ProductService } from "../../../Services/Product/Product.service";
import { SellerService } from "../../../Services/Seller/Seller.service";

@Component({
  selector: "app-BlockSeller",
  templateUrl: "./BlockSeller.component.html",
  styleUrls: ["./BlockSeller.component.scss"],
})
export class BlockSellerComponent implements OnInit {
  settings = {
    noDataMessage: "Sorry no data to show!!",
    actions: {
      add: false,
      edit: false,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
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
    },
  };

  source: LocalDataSource;

  constructor(private _sellerServices: SellerService) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this._sellerServices.getActiveSellers();
    this._sellerServices
      .getActiveUpdatedHandler()
      .pipe(
        map((data) => {
          console.log(data);

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

  onBlock(event) {
    let id = event.data.Id;
    this._sellerServices.blockSeller(id);
  }
}
