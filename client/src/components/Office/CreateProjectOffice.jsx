import React, { useState } from "react";
import { Button, Modal, Input, Form } from "antd";
import Swal from "sweetalert2";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";

export default function CreateProjectOffice({ setIsSubmit }) {
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

  const onFinish = (values) => {
    //projectOffice
    Swal.fire({
      icon: "question",
      title: "คุณต้องการเพิ่ม Project ใช่ไหม?",
      showDenyButton: true,
      confirmButtonText: "ใช่",
      denyButtonText: `ยกเลิก`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await API.post(ApiRouter.projectOffice, values);
        if (res.data.status === true) {
          Swal.fire("Saved!", "", "success");
          handleCancel();
          setIsSubmit(true);
        } else {
          Swal.fire("Error!", "", "error");
        }
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Button
        onClick={showModal}
        type="primary"
        style={{
          backgroundColor: "#01567B",
          borderColor: "#01567B",
          boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        }}
        shape="round"
        size="large"
      >
        เพิ่ม Project
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
            marginBottom: "20px",
          }}
        >
          กรุณาใส่รายละเอียดโครงการ
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
            label="ชื่อโครงการ"
            name="projectName"
            rules={[
              {
                required: true,
                message: "กรุณาใส่ชื่อโครงการ!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 10,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              บันทึก
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
