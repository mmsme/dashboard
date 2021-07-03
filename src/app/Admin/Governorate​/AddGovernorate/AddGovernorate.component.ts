import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Governorate } from "../../../Models/Governorate";
import { GovernorateService } from "../../../Services/Governorate/Governorate.service";

@Component({
  selector: "app-AddGovernorate",
  templateUrl: "./AddGovernorate.component.html",
  styleUrls: ["./AddGovernorate.component.scss"],
})
export class AddGovernorateComponent implements OnInit {
  isEdit: boolean = false;
  Gov: Governorate;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private govServ: GovernorateService,
    private ar: ActivatedRoute
  ) {}

  ngOnInit() {
    this.ar.params.subscribe((url) => {
      const id = url.id;
      if (id) {
        this.isEdit = true;
        this.govServ.getByID(id).subscribe((g: Governorate) => {
          this.Gov = g;
          this.form.patchValue(this.Gov);
        });
      } else {
        this.isEdit = false;
      }
    });

    this.form = this.fb.group({
      governorateName: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      duration: [
        null,
        [Validators.required, , Validators.min(1), Validators.max(10)],
      ],
      shippingValue: [
        null,
        [Validators.required, , Validators.min(100), Validators.max(3000)],
      ],
    });
  }

  public get GovernorateName(): any {
    return this.form.get("governorateName");
  }

  public get Duration(): any {
    return this.form.get("duration");
  }

  public get ShippingValue(): any {
    return this.form.get("shippingValue");
  }

  add() {
    let governorate = {
      governorateName: this.GovernorateName.value,
      duration: this.Duration.value,
      shippingValue: this.ShippingValue.value,
    };

    console.log(governorate);

    this.govServ.add(governorate);
  }

  edit() {
    this.Gov.governorateName = this.GovernorateName.value;
    this.Gov.duration = this.Duration.value;
    this.Gov.shippingValue = this.ShippingValue.value;

    this.govServ.update(this.Gov.governorateId, this.Gov);
  }
}
