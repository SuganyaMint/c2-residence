import React, { useState } from "react";
import { Layout, Button } from "antd";
const { Header } = Layout;
import Swal from "sweetalert2";

function NavbarComponent({ name }) {
  const onLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Logout!", "You are now logged out.", "success");
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/";
        }, 1200);
      }
    });
  };
  return (
    <Header
      style={{
        padding: 0,
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <div
        style={{
          display: "flex",
          padding: "0 24px",
          float: "right",
          alignItems: "center",
          height: "64px",
        }}
      >
        <h3
          style={{
            marginRight: "20px",
          }}
        >
          Name : {name}
        </h3>
        <Button type="dashed" onClick={onLogout} danger>
          Logout
        </Button>
      </div>
    </Header>
  );
}

export default NavbarComponent;
