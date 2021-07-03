import { Component, OnInit } from "@angular/core";
import { User } from "../@core/data/users";
import { SellerService } from "../Services/Seller/Seller.service";
import { Seller_Menu } from "./seller_menu";

@Component({
  selector: "app-Seller",
  templateUrl: "./Seller.component.html",
  styleUrls: ["./Seller.component.scss"],
})
export class SellerComponent implements OnInit {
  menu = Seller_Menu;
  user: User = {
    name: "Seller Name",
    picture: null,
  };

  title = "Seller";

  constructor(private sellerServ: SellerService) {}

  ngOnInit() {
    this.sellerServ.getSellerProfile();
    this.sellerServ.getSellerInfoUpdates().subscribe((data) => {
      this.user.name =
        data.applicationUser.fname + " " + data.applicationUser.lname;
    });
  }
}
