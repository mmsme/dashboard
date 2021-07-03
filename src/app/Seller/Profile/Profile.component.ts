import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Seller } from "../../Models/Seller";
import { SellerService } from "../../Services/Seller/Seller.service";
import { TokenProviderService } from "../../Services/tokenProvider.service";

@Component({
  selector: "app-Profile",
  templateUrl: "./Profile.component.html",
  styleUrls: ["./Profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  seller: Seller;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sellerServ: SellerService,
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
      phoneNumber: [
        null,
        [Validators.required, Validators.pattern("^01[0125][0-9]{8}$")],
      ],
    });
  }

  ngOnInit() {
    // this.sellerServ.getSellerProfile().((_seller: Seller) => {
    //   this.seller = _seller;
    //   this.form.patchValue(this.seller.applicationUser);
    // });

    this.sellerServ.getSellerProfile();
    this.sellerServ.getSellerInfoUpdates().subscribe((_seller: any) => {
      this.seller = _seller;
      this.form.patchValue(this.seller.applicationUser);
    });
  }

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

  public get PhoneNumber(): any {
    return this.form.get("phoneNumber");
  }

  save() {
    let data = {
      fname: this.Fname.value,
      lname: this.Lname.value,
      email: this.Email.value,
      address: this.Address.value,
      phoneNumber: this.PhoneNumber.value,
    };
    this.sellerServ.updateSeller(data);
  }
}
