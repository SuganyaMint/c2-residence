import React, { useState } from "react";
import { Button, Modal, Input, Form } from "antd";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import Swal from "sweetalert2";
function EditUserCompinen(props) {
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
    console.log("Success:", values);
    const data = {
      userName: props.data.userName,
      name: values.name == undefined ? props.data.name : values.name,
      surname:
        values.surname == undefined ? props.data.surname : values.surname,
     
      phone: values.phone == undefined ? props.data.phone : values.phone,
    };
    Swal.fire({
      icon: "question",
      title: "คุณต้องการแก้ไขข้อมูลใช่หรือไม่?",
      showDenyButton: true,
      confirmButtonText: "ใช่",
      denyButtonText: `ยกเลิก`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await API.put(ApiRouter.users + "/" + props.data.id, data);
        if (res.data.status === true) {
          Swal.fire("บันทึกข้อมูลแล้ว!", "", "success");
          handleCancel();
          setTimeout(() => {
            window.location.reload();
          }, 2000);
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
        style={{ backgroundColor: "#F8F22A", color: "#000000" }}
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
          }}
        >
          กรุณาใส่รายละเอียดผู้ใช้งานที่ต้องการแก้ไข
        </p>
        <p
          style={{
            color: "red",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          ไม่สามารถแก้ไข Username ได้
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
          <Form.Item label="Username" name="userName">
            <Input defaultValue={props.data.userName} disabled={true} />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input defaultValue={props.data.name} />
          </Form.Item>
          <Form.Item label="Surname" name="surname">
            <Input defaultValue={props.data.surname} />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input defaultValue={props.data.phone} />
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

export default EditUserCompinen;
