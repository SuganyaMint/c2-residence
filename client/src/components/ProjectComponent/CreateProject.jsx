import React, { useState } from "react";
import { Button, Modal, Input, Form, InputNumber, DatePicker } from "antd";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import Swal from "sweetalert2";
function CreateProject({ setIsSubmit }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(null);
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
      title: "คุณต้องการเพิ่มโครงการใหม่ใช่หรือไม่?",
      showDenyButton: true,
      confirmButtonText: "ใช่",
      denyButtonText: `ยกเลิก`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await API.post(ApiRouter.project, {
          projectName: values.projectName,
          budget: values.budget,
          date: date,
          area: values.area,
          remark: values.remark,
        });
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
  const onChange = (date, dateString) => {
    setDate(dateString);
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
        เพิ่มโครงการใหม่
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
          กรุณาใส่รายละเอียดโครงการ
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
            label="ชื่อโครงการ"
            name="projectName"
            rules={[
              {
                required: true,
                message: "กรุณาใส่ ชื่อโครงการ!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ยอดตามสัญญา"
            name="budget"
            rules={[
              {
                required: true,
                message: "กรุณาใส่ยอดตามสัญญา!",
              },
            ]}
          >
            <InputNumber
              min={0}
              step={0.01}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item
            label="วันที่เริ่มโครงการ"
            name="date"
            rules={[
              {
                required: true,
                message: "กรุณาใส่ วันที่เริ่มโครงการ!",
              },
            ]}
          >
            <DatePicker
              onChange={onChange}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item label="พื้นที่" name="area">
            <Input />
          </Form.Item>
          <Form.Item label="Remark" name="remark">
            <Input />
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

export default CreateProject;
