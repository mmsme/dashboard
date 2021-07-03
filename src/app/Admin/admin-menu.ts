import { NbMenuItem } from "@nebular/theme";
import { settings } from "cluster";
import { link } from "fs";
import { icon } from "leaflet";
import { title } from "process";

export const Admin_Menu: NbMenuItem[] = [
  {
    title: "Employees",
    icon: "people-outline",
    link: "admin",
    home: true,
    children: [
      {
        title: "Manage Employee",
        link: "/admin/employee/manage",
      },
    ],
  },
  {
    title: "Categories",
    link: "admin",
    icon: "archive-outline",
    home: true,
    children: [
      {
        title: "Manage Categories",
        link: "/admin/categories/manage",
      },
    ],
  },
  {
    title: "Sub Categories",
    link: "admin",
    icon: "archive-outline",
    home: true,
    children: [
      {
        title: "Manage Sub Categories",
        link: "/admin/subCategories/manage",
      },
    ],
  },
  {
    title: "Products",
    link: "admin",
    home: true,
    icon: "cube-outline",
    children: [
      {
        title: "Approve Product",
        link: "/admin/products/approve",
      },
    ],
  },
  {
    title: "Sellers",
    icon: "person-outline",
    home: true,
    link: "admin",
    children: [
      {
        title: "Approve Seller",
        link: "/admin/seller/approve",
      },
      {
        title: "Block Seller",
        link: "/admin/seller/block",
      },
    ],
  },
  {
    title: "Governorate",
    icon: "car-outline",
    home: true,
    link: "admin",
    children: [
      { title: "Manage Governorates", link: "/admin/governorate/manage" },
    ],
  },
  // {
  //   title: "Settings",
  //   home: true,
  //   icon: "settings-2-outline",
  //   link: "admin",
  //   children: [
  //     {
  //       title: "profile",
  //       link: "/admin/employee/profile",
  //     },
  //   ],
  // },
];
