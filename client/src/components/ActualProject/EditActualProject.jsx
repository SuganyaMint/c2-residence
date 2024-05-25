import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Input,
  Form,
  InputNumber,
  DatePicker,
  Select,
} from "antd";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import Swal from "sweetalert2";

function EditActualProject(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState(null);
  // const [projectOption, setprojectOption] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await API.get(ApiRouter.project);
  //     const project = res.data.data;
  //     if (res.data.status === true) {
  //       project.map((item) => {
  //         if (item.status === 0) {
  //           projectOption.push({
  //             label: item.projectName,
  //             value: item.projectID,
  //           });
  //         }
  //       });
  //     }
  //     //remove duplicate
  //     const unique = projectOption.filter(
  //       (v, i, a) => a.findIndex((t) => t.value === v.value) === i
  //     );
  //     setprojectOption(unique);
  //   };
  //   fetchData();
  // }, [isModalOpen]);

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
      title: "คุณต้องการแก้ไขรายละเอียดโครงการใหม่ใช่หรือไม่?",
      showDenyButton: true,
      confirmButtonText: "ใช่",
      denyButtonText: `ยกเลิก`,
    }).then(async (result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const res = await API.put(ApiRouter.actualDetail + props.data.id, {
          // projectID: project,
          actualType: values.actualType || props.data.actualType,
          actualValue: values.actualValue || props.data.actualValue,
          date: date || props.data.date,
          remark: values.remark || props.data.remark,
        });
        if (res.data.status === true) {
          Swal.fire("บันทึกข้อมูลแล้ว!", "", "success");
          handleCancel();
          setTimeout(() => {
            window.location.reload();
          }, 1000);
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
          cursor: "pointer",
          backgroundColor: "#fadb14",
          color: "#000",
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
          }}
        >
          แก้ไขรายละเอียดค่าใช้จ่ายโครงการ
        </p>
        <p
          style={{
            color: "red",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          * ไม่สามารถแก้ไขชื่อโครงการได้
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
            <Input
              disabled={true}
              width="100%"
              defaultValue={props.data.projectName}
            />
          </Form.Item>
          <Form.Item label="ประเภทรายจ่าย" name="actualType">
            <Select
              defaultValue={props.data.actualType}
              options={[
                { value: "เครื่องจักร", label: "เครื่องจักร" },
                { value: "วัสดุ", label: "วัสดุ" },
                { value: "ค่าแรง", label: "ค่าแรง" },
                { value: "ค่าดำเนินการ", label: "ค่าดำเนินการ" },
                { value: "อื่นๆ", label: "อื่นๆ" },
              ]}
              width="100%"
            />
          </Form.Item>

          <Form.Item label="จำนวนรายจ่าย" name="actualValue">
            <InputNumber
              defaultValue={props.data.actualValue}
              min={0}
              style={{
                width: "100%",
              }}
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
          <Form.Item label="วันที่ใช้จ่าย" name="date">
            <DatePicker
              onChange={onChange}
              style={{
                width: "100%",
              }}
            />
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
export default EditActualProject;
