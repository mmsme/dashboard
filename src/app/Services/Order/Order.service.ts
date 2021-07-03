import { Injectable } from "@angular/core";
import { Order } from "../../Models/Order";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  private Orders: Order[] = [
    {
      Id: 1,
      Customer: null,
      CustomerId: null,
      Cost: 250,
      OrderDate: new Date().toDateString(),
      DueDate: new Date().toDateString(),
      Approved: true,
      IsDeleted: false,
      Status: null,
      Employee: null,
      EmployeeId: null,
      StatusId: null,
    },
    {
      Id: 2,
      Customer: null,
      CustomerId: null,
      Cost: 100,
      OrderDate: new Date().toDateString(),
      DueDate: new Date().toDateString(),
      Approved: false,
      IsDeleted: true,
      Status: null,
      Employee: null,
      EmployeeId: null,
      StatusId: null,
    },
    {
      Id: 3,
      Customer: null,
      CustomerId: null,
      Cost: 250,
      OrderDate: new Date().toDateString(),
      DueDate: new Date().toDateString(),
      Approved: true,
      IsDeleted: false,
      Status: null,
      Employee: null,
      EmployeeId: null,
      StatusId: null,
    },
    {
      Id: 4,
      Customer: null,
      CustomerId: null,
      Cost: 300,
      OrderDate: new Date().toDateString(),
      DueDate: new Date().toDateString(),
      Approved: true,
      IsDeleted: false,
      Status: null,
      Employee: null,
      EmployeeId: null,
      StatusId: null,
    },
  ];

  constructor() {}

  getAllOrders(): Order[] {
    return [...this.Orders];
  }
}
