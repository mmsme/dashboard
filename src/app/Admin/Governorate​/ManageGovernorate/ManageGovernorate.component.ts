import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LocalDataSource } from "ng2-smart-table";
import { GovernorateService } from "../../../Services/Governorate/Governorate.service";

@Component({
  selector: "app-ManageGovernorate",
  templateUrl: "./ManageGovernorate.component.html",
  styleUrls: ["./ManageGovernorate.component.scss"],
})
export class ManageGovernorateComponent implements OnInit {
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
      governorateId: {
        title: "ID",
        type: "string",
      },
      governorateName: {
        title: "Governorate Name",
        type: "string",
      },
      duration: {
        title: "Duration",
        type: "number",
        valuePrepareFunction: (data) => {
          return data + " Day";
        },
      },
      shippingValue: {
        title: "Shipping Value",
        type: "number",
        valuePrepareFunction: (data) => {
          return data + " EGP";
        },
      },
    },
  };

  source = new LocalDataSource();

  constructor(private router: Router, private govServ: GovernorateService) {}

  ngOnInit() {
    this.govServ.getAll();
    this.govServ.getUpdatedGovernorate().subscribe((data) => {
      this.source.load(data);
    });
  }

  add() {
    this.router.navigateByUrl("admin/governorate/add");
  }

  onDelete(event) {
    this.govServ.delete(event.data.governorateId);
  }

  onEdit(event) {
    this.router.navigateByUrl(
      "admin/governorate/edit/" + event.data.governorateId
    );
  }
}
