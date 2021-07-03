import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { NbWindowService } from "@nebular/theme";
import { LocalDataSource } from "ng2-smart-table";
import { map } from "rxjs/operators";
import { Employee } from "../../../Models/Employee";
import { EmployeeService } from "../../../Services/Employee/Employee.service";

@Component({
  selector: "app-ManageEmployee",
  templateUrl: "./ManageEmployee.component.html",
  styleUrls: ["./ManageEmployee.component.scss"],
})
export class ManageEmployeeComponent implements OnInit {
  form: FormGroup;
  selectedId: any;
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
      fullName: {
        title: "Name",
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
      salary: {
        title: "Salary",
        type: "string",
      },
      hireDate: {
        title: "Hire Date",
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
  source: LocalDataSource = new LocalDataSource();

  constructor(
    private employeeServices: EmployeeService,
    private router: Router,
    private windowService: NbWindowService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      salary: [
        null,
        [Validators.required, Validators.min(2000), Validators.max(10000)],
      ],
    });

    this.employeeServices.getAllEmployees();
    this.employeeServices
      .getEmployeesUpdateHandler()
      .pipe(
        map((data) => {
          return data.map((e: Employee) => {
            return {
              id: e.employeeId,
              fullName: e.applicationUser.fname + " " + e.applicationUser.lname,
              email: e.applicationUser.email,
              address: e.applicationUser.address,
              salary: e.salary,
              hireDate: e.hireDate,
              ...e,
            };
          });
        })
      )
      .subscribe((list) => {
        this.source.load([...list]);
      });
  }

  public get Salary(): any {
    return this.form.get("salary");
  }

  onAdd() {
    this.router.navigate(["admin/employee/add"]);
  }

  onEditConfirm(event, content) {
    this.selectedId = event.data.id;

    console.log(this.selectedId);

    this.windowService.open(content, {
      title: `Edit Salary`,
    });
  }

  editSalary() {
    this.employeeServices.editSalary(this.selectedId, this.Salary.value);
  }

  onDeleteConfirm(event) {
    let id = event.data.id;
    this.employeeServices.delete(id);
  }
}
