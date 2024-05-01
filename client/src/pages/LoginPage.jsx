import React, { useState } from "react";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import ApiUrl from "../utils/ApiUrl";
import { ApiRouter } from "../utils/ApiRouter";
import Swal from "sweetalert2";
import IMG from "../assets/bg1.jpeg";
const LoginComponent = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);

      const loginResponse = await ApiUrl.post(ApiRouter.login, values);
      if (loginResponse.data.status === true) {
        localStorage.setItem("token", loginResponse.data.token);
        Swal.fire({
          icon: "success",
          title: "Login Success",
          text: "You are now logged in",
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please check your username and password",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${IMG}) center/cover no-repeat`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "0 15px",
        }}
      >
        <Card
          style={{
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            margin: "0 auto",
          }}
        >
          <p
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#787A79",
            }}
          >
            กรุณาเข้าสู่ระบบ
          </p>
          <p
            style={{
              textAlign: "center",
              fontSize: "24px",
              fontWeight: "bold",
              color: "#787A79",
              marginBottom: "20px",
            }}
          >
            C2 RESIDENCE COMPANY LIMITED
          </p>
          <Form
            name="loginForm"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="userName"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="userName"
                disabled={loading}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                disabled={loading}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                style={{
                  backgroundColor: "#787A79",
                  borderColor: "#787A79",
                  color: "#fff",
                  width: "100%",
                }}
                htmlType="submit"
                loading={loading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default LoginComponent;
