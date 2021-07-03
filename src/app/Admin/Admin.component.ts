import { Component, OnInit } from "@angular/core";
import { User } from "../@core/data/users";
import { Admin_Menu } from "./admin-menu";

@Component({
  selector: "ngx-Admin",
  templateUrl: "./Admin.component.html",
  styleUrls: ["./Admin.component.scss"],
})
export class AdminComponent implements OnInit {
  menu = Admin_Menu;
  title = "Admin";
  user: User = {
    name: "Admin Name",
    picture: null,
  };
  constructor() {}

  ngOnInit() {}
}
