import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Employee } from "../../../Models/Employee";
import { TokenProviderService } from "../../../Services/tokenProvider.service";

@Component({
  selector: "ngx-EmployeeProfile",
  templateUrl: "./EmployeeProfile.component.html",
  styleUrls: ["./EmployeeProfile.component.scss"],
})
export class EmployeeProfileComponent implements OnInit {
  form: FormGroup;
  employee: Employee;

  constructor(
    private fb: FormBuilder,
    private tokenServ: TokenProviderService
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
    });
  }

  ngOnInit() {}

  public get Fname(): any {
    return this.form.get("fname");
  }

  public get Lname(): any {
    return this.form.get("lname");
  }

  public get Email(): any {
    return this.form.get("email");
  }

  public get Address(): any {
    return this.form.get("address");
  }

  save() {}
}
