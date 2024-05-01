import React, { useState, useEffect } from "react";
import { Button, Modal, InputNumber, Form, Input, DatePicker } from "antd";
import Swal from "sweetalert2";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import moment from "moment";

function EditProject(props) {
  const id = props.data.id;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(props.data.date);
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
      title: "แน่ใจหรือไม่?",
      text: "ต้องการแก้ไขรายละเอียดโครงการหรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ใช่, แก้ไขเลย",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await API.put(ApiRouter.project + id, {
          projectName: values.projectName || props.data.projectName,
          budget: values.budget || props.data.budget,
          area: values.area || props.data.area,
          remark: values.remark || props.data.remark,
          date: date || props.data.date,
        });
        if (res.data.status === true) {
          Swal.fire({
            title: "สำเร็จ!",
            text: "แก้ไขข้อมูลสำเร็จ",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
          setIsModalOpen(false);
          //set time out
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        } else {
          Swal.fire({
            title: "Error!",
            text: "เกิดข้อผิดพลาด ไม่สามารถแก้ไขข้อมูลได้ได้ โปรดลองใหม่อีกครั้ง",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        Swal.fire({
          title: "Cancelled",
          text: "ยกเลิกการแก้ไขข้อมูล",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
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
          cursor: "pointer",
          backgroundColor: "#fadb14",
          color: "#000",
        }}
      >
        แก้ไข{" "}
      </Button>

      <Modal
        // title="Basic Modal"
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
          แก้ไขรายละเอียดโครงการ
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
          <Form.Item label="ชื่อโครงการ" name="projectName">
            <Input defaultValue={props.data.projectName} />
          </Form.Item>
          <Form.Item label="ยอดตามสัญญา" name="budget">
            <InputNumber
              min={0}
              style={{
                width: "100%",
              }}
              defaultValue={props.data.budget}
            />
          </Form.Item>

          <p
            style={{
              marginBottom: "0",
              color: "red",
              marginLeft: "120px",
            }}
          >
            เดิม {props.data.date}
          </p>

          <Form.Item label="วันที่เริ่มโครงการ" name="date">
            <DatePicker
              // defaultValue={moment(props.data.date)}
              onChange={onChange}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>
          <Form.Item label="พื้นที่" name="area">
            <Input defaultValue={props.data.area} />
          </Form.Item>
          <Form.Item label="Remark" name="remark">
            <Input defaultValue={props.data.remark} />
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

export default EditProject;
