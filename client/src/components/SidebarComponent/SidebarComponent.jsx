import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
const { Sider } = Layout;
import { Link, useNavigate } from "react-router-dom";
import { MenuArray } from "./MenuArray";


function SidebarComponent(props) {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {};
    fetchData();
  }, []);

  const selectedKeys = window.location.pathname.split("/")[1];

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        //   console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
      }}
    >
      <div className="logo">
        <h2>C2 RESIDENCE</h2>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        onClick={(key) => {
          if (key.key !== "home") {
            navigate(key.key);
          } else {
            window.location.href = "/";
          }
        }}
        defaultSelectedKeys={[selectedKeys]}
        items={MenuArray}
      />
    </Sider>
  );
}

export default SidebarComponent;
