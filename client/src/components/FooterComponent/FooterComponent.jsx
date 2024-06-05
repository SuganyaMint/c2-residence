import { Layout } from "antd";
import React from "react";
const { Footer } = Layout;

function FooterComponent() {
  return (
    <Footer style={{ textAlign: "center" }}>
      Version 1.0.0 ©2024 Created by{" "}
      <a
        href="https://suganya-profiles.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Suganya.P
      </a>
    </Footer>
  );
}

export default FooterComponent;
