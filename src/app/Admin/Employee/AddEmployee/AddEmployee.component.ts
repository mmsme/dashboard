import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmployeeService } from "../../../Services/Employee/Employee.service";

@Component({
  selector: "app-AddEmployee",
  templateUrl: "./AddEmployee.component.html",
  styleUrls: ["./AddEmployee.component.scss"],
})
export class AddEmployeeComponent implements OnInit {
  isEdit: boolean = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.form = this.fb.group({
      fname: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      lname: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      address: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.min(8), Validators.max(30)],
      ],
      salary: [
        null,
        [Validators.required, Validators.min(2000), Validators.max(10000)],
      ],
    });
  }

  ngOnInit() {}

  public get Fname(): any {
    return this.form.get("fname");
  }

  public get Lname(): any {
    return this.form.get("lname");
  }

  public get Address(): any {
    return this.form.get("address");
  }

  public get Email(): any {
    return this.form.get("email");
  }

  public get Password(): any {
    return this.form.get("password");
  }

  public get Salary(): any {
    return this.form.get("salary");
  }

  onAdd() {
    console.log("Ana Msh 3rafney");
    let employee = {
      fname: this.Fname.value,
      lname: this.Lname.value,
      address: this.Address.value,
      email: this.Email.value,
      password: this.Password.value,
      salary: this.Salary.value,
    };
    this.employeeService.add(employee);
  }

  onUpdate() {}

  onClick() {
    console.log("Ana Msh 3rafney");

    if (this.isEdit == false) {
      this.onAdd();
    } else {
      this.onUpdate();
    }
  }
}
