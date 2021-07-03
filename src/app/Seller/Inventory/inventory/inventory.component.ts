import { InventoryService } from "./../../../Services/Inventory/Inventory.service";
import { Component, OnInit } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
import { TokenProviderService } from "../../../Services/tokenProvider.service";

@Component({
  selector: "app-inventory",
  templateUrl: "./inventory.component.html",
  styleUrls: ["./inventory.component.scss"],
})
export class InventoryComponent implements OnInit {
  /* --------------------------- table Configuration -------------------------- */
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
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
      city: {
        title: "City",
        type: "string",
      },
      street: {
        title: "Street",
        type: "string",
      },
      buildingNumber: {
        title: "Building Number",
        type: "string",
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(
    private _inventoryServices: InventoryService,
    private tokenProvider: TokenProviderService
  ) {}

  ngOnInit() {
    this.tokenProvider.getSellerToken();
    this._inventoryServices.getAll();
    this._inventoryServices
      .getInventoriesHandler()
      .subscribe((_inventories) => {
        this.source.load(_inventories);
      });
  }

  onCreateConfirm(event) {
    let inventory = event.newData;
    this._inventoryServices.add(inventory);
  }

  onEditConfirm(event) {
    let inventory = event.newData;
    this._inventoryServices.edit(inventory);
  }

  onDeleteConfirm(event) {
    let id = event.data.inventoryId;
    console.log(id);

    this._inventoryServices.delete(id);
  }
}
