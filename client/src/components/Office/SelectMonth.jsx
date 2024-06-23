import React, { useState } from "react";
import { Button, Modal, Input, Form } from "antd";
import Swal from "sweetalert2";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import { DatePicker } from "antd";
import moment from "moment";
import dayjs from "dayjs";

export default function SelectMonth({ project_office_ID, setIsSubmit }) {
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
  const thisYear = new Date().getFullYear();
  let thisMonth = new Date().getMonth() + 1;
  if (thisMonth < 10) {
    thisMonth = `0${thisMonth}`;
  }
  const defaultMonth = `${thisYear}-${thisMonth}`;

  const monthFormat = "YYYY-MM";

  const onFinish = (values) => {

    let datasend = {
      month:
        values.month === undefined
          ? defaultMonth
          : values.month.format("YYYY-MM"),
      project_office_ID: project_office_ID,
    };
    Swal.fire({
      icon: "question",
      title: "คุณต้องการเพิ่มเดือน ใช่ไหม?",
      showDenyButton: true,
      confirmButtonText: "ใช่",
      denyButtonText: `ยกเลิก`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await API.post(ApiRouter.addMonthMaster, datasend);
        if (res.data.status === true) {
          Swal.fire("Saved!", "", "success");
          handleCancel();
          setIsSubmit(true);
        } else {
          Swal.fire(res.data.message, "", "error");

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
        เพิ่มเดือน
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
          เพิ่มเดือน
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
            label="เดือน"
            name="month"
        
          >
            <DatePicker
              defaultValue={dayjs(defaultMonth, monthFormat)}
              format={monthFormat}
              picker="month"
              style={{ marginBottom: "20px" }}
            />
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
