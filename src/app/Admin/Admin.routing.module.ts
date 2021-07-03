import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./Admin.component";
import { AddCategoryComponent } from "./Category/add-category/add-category.component";
import { EditCategoryComponent } from "./Category/edit-category/edit-category.component";
import { ManageCategoryComponent } from "./Category/manage-category/manage-category.component";
import { AddEmployeeComponent } from "./Employee/AddEmployee/AddEmployee.component";
import { EmployeeProfileComponent } from "./Employee/EmployeeProfile/EmployeeProfile.component";
import { ManageEmployeeComponent } from "./Employee/ManageEmployee/ManageEmployee.component";
import { AddGovernorateComponent } from "./Governorate​/AddGovernorate/AddGovernorate.component";
import { ManageGovernorateComponent } from "./Governorate​/ManageGovernorate/ManageGovernorate.component";
import { ApproveProductComponent } from "./Products/ApproveProduct/ApproveProduct.component";
import { ApproveSellerComponent } from "./Seller/ApproveSeller/ApproveSeller.component";
import { BlockSellerComponent } from "./Seller/BlockSeller/BlockSeller.component";
import { AddSubCategoryComponent } from "./Sub Category/add-sub-category/add-sub-category.component";
import { EditSubCategoryComponent } from "./Sub Category/edit-sub-category/edit-sub-category.component";
import { ManageSubCategoryComponent } from "./Sub Category/manage-sub-category/manage-sub-category.component";

const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      /* -------------------------------- Category -------------------------------- */
      { path: "categories/manage", component: ManageCategoryComponent },
      { path: "categories/add", component: AddCategoryComponent },
      { path: "categories/edit/:id", component: EditCategoryComponent },

      /* ------------------------------ Sub Category ------------------------------ */
      { path: "subCategories/manage", component: ManageSubCategoryComponent },
      { path: "subCategories/add", component: AddSubCategoryComponent },
      { path: "subCategories/edit/:id", component: EditSubCategoryComponent },

      /* --------------------------------- product -------------------------------- */
      { path: "products/approve", component: ApproveProductComponent },

      /* --------------------------------- seller --------------------------------- */
      { path: "seller/approve", component: ApproveSellerComponent },
      { path: "seller/block", component: BlockSellerComponent },

      /* -------------------------------- employee -------------------------------- */
      { path: "employee/manage", component: ManageEmployeeComponent },
      { path: "employee/add", component: AddEmployeeComponent },
      { path: "employee/profile", component: EmployeeProfileComponent },

      /* ------------------------------- Governorate ------------------------------ */
      { path: "governorate/manage", component: ManageGovernorateComponent },
      { path: "governorate/add", component: AddGovernorateComponent },
      { path: "governorate/edit/:id", component: AddGovernorateComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
