import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "./NavigationBar";

export default function Root() {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
}
