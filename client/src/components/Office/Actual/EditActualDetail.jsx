import React, { useState } from "react";
import { Button, Modal, Input, Form } from "antd";
import Swal from "sweetalert2";
import API from "../../../utils/ApiUrl";
import { ApiRouter } from "../../../utils/ApiRouter";

export default function EditActualDetail({ oldData, setIsSubmit }) {
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
      let dataSend = {
        project_office_ID: oldData.project_office_ID,
        detail: values.detail === undefined ? oldData.detail : values.detail,
        qty: values.qty === undefined ? oldData.qty : values.qty,
        remark: values.remark === undefined ? oldData.remark : values.remark,
      };
      Swal.fire({
        icon: "question",
        title: "คุณต้องการแก้ไขรายละเอียดค่าใช้จ่ายที่เกิดขึ้นจริงใช่ไหม?",
        showDenyButton: true,
        confirmButtonText: "ใช่",
        denyButtonText: `ยกเลิก`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const res = await API.put(ApiRouter.projectOfficeActual + oldData.id, dataSend);
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
          type="primary"
          onClick={showModal}
          style={{
            //สีเหลือง
            backgroundColor: "#E3A715",
            marginLeft: "10px",
          }}
        >
          แก้ไข
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
            แก้ไขรายละเอียดค่าใช้จ่ายที่เกิดขึ้นจริง
          </p>
  
          <Form
            name="basic"
            labelCol={{
              span: 8,
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
            <Form.Item label="รายละเอียด" name="detail">
              <Input defaultValue={oldData.detail} />
            </Form.Item>
  
            <Form.Item label="ค่าใช้จ่ายที่เกิดขึ้นจริง" name="qty">
              <Input defaultValue={oldData.qty} />
            </Form.Item>
  
            <Form.Item label="หมายเหตุ" name="remark">
              <Input defaultValue={oldData.remark} />
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
  