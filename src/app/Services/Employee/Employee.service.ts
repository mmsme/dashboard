import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { Employee } from "../../Models/Employee";
import { port } from "../portNumber";
import { TokenProviderService } from "../tokenProvider.service";

@Injectable({
  providedIn: "root",
})
export class EmployeeService {
  private url = `http://localhost:${port}/api/Employee`;
  private Employees: Employee[] = [];
  private EmployeesUpdate = new Subject<Employee[]>();

  constructor(
    private http: HttpClient,
    private tokenProvider: TokenProviderService,
    private router: Router
  ) {}

  getAllEmployees() {
    let headers = this.tokenProvider.getAdminToken();
    this.http.get(this.url, { headers }).subscribe((data: any) => {
      this.Employees = [...data];
      this.EmployeesUpdate.next([...this.Employees]);
    });
  }

  getEmployeesUpdateHandler() {
    return this.EmployeesUpdate.asObservable();
  }

  /* -----------------------------------  ---------------------------------- */
  add(employee: any) {
    let s = "/Authentication​/register-emplyee";
    let headers = this.tokenProvider.getAdminToken();
    this.http
      .post(
        `http://localhost:${port}/api/Authentication/register-emplyee`,
        employee,
        { headers }
      )
      .subscribe((employee: any) => {
        console.log(employee);

        this.router.navigate(["admin/employee/manage"]);
      });
  }

  update(_employee: any) {
    let headers = this.tokenProvider.getAdminToken();
    this.http
      .put(this.url + "/PersonalData", _employee, { headers })
      .subscribe(() => {
        const index = this.Employees.findIndex((e) => {
          return e.employeeId == e.employeeId;
        });

        this.Employees[index].applicationUser.fname = _employee.fname;
        this.Employees[index].applicationUser.lanme = _employee.lname;
        this.Employees[index].applicationUser.email = _employee.email;
        this.Employees[index].applicationUser.address = _employee.address;

        this.EmployeesUpdate.next([...this.Employees]);
        this.router.navigate(["admin/employee/manage"]);
      });
  }

  editSalary(id, salary) {
    let headers = this.tokenProvider.getAdminToken();

    const index = this.Employees.findIndex((e) => {
      return e.employeeId == e.employeeId;
    });

    this.Employees[index].salary = salary;
    console.log(this.Employees[index]);

    this.http
      .put(this.url + "/EditSalary/" + id, this.Employees[index], { headers })
      .subscribe(() => {
        this.EmployeesUpdate.next([...this.Employees]);
      });
  }

  delete(id) {
    let headers = this.tokenProvider.getAdminToken();
    this.http.delete(this.url + "/" + id, { headers }).subscribe(() => {
      let update = this.Employees.filter((e) => {
        return e.employeeId != id;
      });

      this.Employees = update;
      this.EmployeesUpdate.next([...this.Employees]);
    });
  }
}
