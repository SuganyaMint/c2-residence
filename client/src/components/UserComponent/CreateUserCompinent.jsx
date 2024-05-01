import React, { useState } from "react";
import { Button, Modal, Input, Form } from "antd";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import Swal from "sweetalert2";

function CreateUserCompinent({setIsSubmit}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    Swal.fire({
      icon: "question",
      title: "คุณต้องการ Register ใช่หรือไม่?",
      showDenyButton: true,
      confirmButtonText: "ใช่",
      denyButtonText: `ยกเลิก`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await API.post(ApiRouter.register, values);
        if (res.data.status === true) {
          Swal.fire("บันทึกข้อมูลแล้ว!", "", "success");
          handleCancel();
          setIsSubmit(true);
          // setTimeout(() => {
          //   window.location.reload();
          // }, 2000);
        } else {
          Swal.fire("เกิดข้อผิดพลาดขณะบันทุกข้อมูล", "", "info");
          handleCancel();
        }
      } else if (result.isDenied) {
        // Swal.fire("ยกเลิกสำเร็จ", "", "info");
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        style={{
          backgroundColor: "#01567B",
          borderColor: "#01567B",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
        shape="round"
        size="large"
      >
        เพิ่มผู้ใช้งาน
      </Button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          กรุณาใส่รายละเอียดผู้ใช้งาน
        </p>
        <p
          style={{
            color: "red",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          * จำเป็นต้องใส่ข้อมูล
        </p>
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="userName"
            rules={[
              {
                required: true,
                message: "กรุณาใส่ Username!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "กรุณาใส่ชื่อ!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Surname"
            name="surname"
            rules={[
              {
                required: true,
                message: "กรุณาใส่นามสกุล!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              type="primary"
              htmlType="submit"
              style={{
                marginRight: "10px",
                //สีเทาเข้ม
                backgroundColor: "#787A79",
              }}
            >
              บันทึก
            </Button>
            <Button danger onClick={handleCancel}>
              ยกเลิก
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default CreateUserCompinent