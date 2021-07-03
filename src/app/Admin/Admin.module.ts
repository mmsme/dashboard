import { Ng2SmartTableModule } from "ng2-smart-table";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CKEditorModule } from "ng2-ckeditor";
import { EditorsModule } from "./../pages/editors/editors.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ThemeModule } from "./../@theme/theme.module";
import {
  NbCardModule,
  NbMenuModule,
  NbStepperModule,
  NbButtonModule,
  NbInputModule,
  NbSelectModule,
  NbDatepickerModule,
  NbAlertModule,
  NbToastrModule,
  NbBadgeModule,
  NbListModule,
  NbTreeGridModule,
  NbAccordionModule,
  NbIconModule,
  NbActionsModule,
} from "@nebular/theme";

/* -------------------------------------------------------------------------- */
/* ---------------------------- Admin Components ---------------------------- */
import { AdminComponent } from "./Admin.component";
import { AdminRoutingModule } from "./Admin.routing.module";

/* -------------------------------- Category -------------------------------- */
import { ManageCategoryComponent } from "./Category/manage-category/manage-category.component";
import { AddCategoryComponent } from "./Category/add-category/add-category.component";
import { EditCategoryComponent } from "./Category/edit-category/edit-category.component";

/* ------------------------------- subCategory ------------------------------ */
import { ManageSubCategoryComponent } from "./Sub Category/manage-sub-category/manage-sub-category.component";
import { AddSubCategoryComponent } from "./Sub Category/add-sub-category/add-sub-category.component";
import { EditSubCategoryComponent } from "./Sub Category/edit-sub-category/edit-sub-category.component";

/* --------------------------------- product -------------------------------- */
import { ApproveProductComponent } from "./Products/ApproveProduct/ApproveProduct.component";

/* --------------------------------- seller --------------------------------- */
import { ApproveSellerComponent } from "./Seller/ApproveSeller/ApproveSeller.component";
import { BlockSellerComponent } from "./Seller/BlockSeller/BlockSeller.component";

/* -------------------------------- Employee -------------------------------- */
import { ManageEmployeeComponent } from "./Employee/ManageEmployee/ManageEmployee.component";
import { AddEmployeeComponent } from "./Employee/AddEmployee/AddEmployee.component";
import { EmployeeProfileComponent } from "./Employee/EmployeeProfile/EmployeeProfile.component";

/* ------------------------------- Governorate ------------------------------ */
import { ManageGovernorateComponent } from "./Governorate​/ManageGovernorate/ManageGovernorate.component";
import { AddGovernorateComponent } from "./Governorate​/AddGovernorate/AddGovernorate.component";

@NgModule({
  declarations: [
    AdminComponent,
    ManageCategoryComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    ManageSubCategoryComponent,
    AddSubCategoryComponent,
    EditSubCategoryComponent,
    ApproveProductComponent,
    ApproveSellerComponent,
    BlockSellerComponent,
    ManageEmployeeComponent,
    AddEmployeeComponent,
    ManageGovernorateComponent,
    AddGovernorateComponent,
    EmployeeProfileComponent,
  ],
  imports: [
    AdminRoutingModule,
    CommonModule,
    ThemeModule,
    NbCardModule,
    NbMenuModule,
    NbStepperModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    NbDatepickerModule,
    NbAlertModule,
    NbToastrModule,
    NbBadgeModule,
    NbListModule,
    NbTreeGridModule,
    NbAccordionModule,
    NbIconModule,
    NbActionsModule,
    EditorsModule,
    CKEditorModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AdminModule {}
