import React, { useState, useEffect } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Space,
  Typography,
  Divider,
  Table,
  InputNumber,
} from "antd";
const { Title, Paragraph } = Typography;
import { useParams } from "react-router-dom";
import SkeletonComponent from "../../../components/SkeletonComponent/SkeletonComponent";
import EditMasterDetail from "../../../components/Office/EditMasterDetail";
import { LeftCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../../../utils/ApiUrl";
import { ApiRouter } from "../../../utils/ApiRouter";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);



export default function ActualProjectPage() {
    const { project_office_ID, month } = useParams();

    const onFinish = async (values) => {
    
  
      const data = {
        ...values,
        month: month,
        project_office_ID: project_office_ID,
      };
      Swal.fire({
        icon: "question",
        title: "คุณต้องการบันทึกข้อมูลใช่หรือไม่?",
        showDenyButton: true,
        confirmButtonText: "ใช่",
        denyButtonText: `ไม่ใช่`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const res = await API.post(ApiRouter.office, data);
          if (res.data.status === true) {
            Swal.fire("สำเร็จ!", res.data.message, "success");
            //set time out and redirect to back-office
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else {
            Swal.fire("ผิดพลาด!", res.data.message, "error");
          }
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    };
  
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [isSubmit, setIsSubmit] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        const res = await API.get(ApiRouter.projectOfficeActual +project_office_ID+"/"+ month);
  
        if (res.data.status === true) {
          setLoading(false);
          setData(res.data.data);
        }
      };
  
      fetchData();
      setIsSubmit(false);
    }, [isSubmit]);
  
    const handleDelete = async (id) => {
      Swal.fire({
        title: "คุณต้องการลบรายละเอียดค่าใช้จ่ายตั้งต้นใช่ไหม?",
        text: "คุณจะไม่สามารถกู้คืนข้อมูลได้อีก!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่, ลบเลย!",
        cancelButtonText: "ยกเลิก",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const res = await API.delete(`${ApiRouter.projectOfficeDetailDelete}/${id}`);
  
          if (res.data.status === true) {
            Swal.fire("ลบสำเร็จ!", "ข้อมูลของคุณถูกลบแล้ว.", "success");
            setIsSubmit(true);
          }
        }
      });
    };
  
  
    const columns = [
      {
        title: "รายละเอียด",
        dataIndex: "detail",
        key: "detail",
        align: "center",
      },
  
      {
        title: "ค่าใช้จ่ายตั้งต้น ",
        dataIndex: "qty",
        key: "qty",
        align: "center",
        render: (text) => Number(text).toLocaleString(),
      },
  
      {
        title: "หมายเหตุ",
        dataIndex: "remark",
        key: "remark",
        align: "center",
      },
  
      {
        title: "Action",
        // dataIndex: "month",
        // key: "month",
        align: "center",
        render: (text, record) => (
          <>
            <EditMasterDetail oldData={record} setIsSubmit={setIsSubmit} />
            <Button
              danger
              type="primary"
              style={{ marginLeft: 10 }}
              onClick={() => handleDelete(record.id)}
            >
              ลบ
            </Button>
          </>
        ),
      },
    ];
    return (
      <>
        {/* {loading ? (
          <SkeletonComponent />
        ) : ( */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                // marginBottom: "20px",
              }}
            >
              <Title level={2}>
                เพิ่มค่าใช้จ่าย ที่ใช้จริง : 
              </Title>
              <Link to={`/back-office-createmaster/${project_office_ID}`}>
  
                <LeftCircleOutlined
                  style={{
                    fontSize: "30px",
                    color: "#0074FF",
                    cursor: "pointer",
                  }}
                />
              </Link>
            </div>
            <Title level={2}>
              {/* ประจำเดือน : {data[0].month} ยอดรวม :{" "}
              {Number(data[0].total_qty).toLocaleString()} บาท */}
            </Title>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "20px",
              }}
            ></div>
            <Table dataSource={data} columns={columns} />;
            <Divider />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            ></div>
            <Form
              name="dynamic_form_nest_item"
              onFinish={onFinish}
              style={{
                maxWidth: 1200,
              }}
              autoComplete="off"
            >
   
              <Form.List name="master">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: "flex",
                          marginBottom: 8,
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          label="รายละเอียด"
                          name={[name, "detail"]}
                          style={{ width: "500px" }}
                          rules={[
                            {
                              required: true,
                              message: "กรุณาใส่รายละเอียด!",
                            },
                          ]}
                        >
                          <Input placeholder="รายละเอียด" />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          label="จำนวนทีตั้งไว้"
                          name={[name, "qty"]}
                          rules={[
                            {
                              required: true,
                              message: "กรุณาใส่จำนวนทีตั้งไว้!",
                            },
                          ]}
                        >
                          <InputNumber
                            style={{ width: "150px" }}
                            placeholder="จำนวนทีตั้งไว้"
                            min="0"
                            max="100000000000"
                            step="1"
                            stringMode
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          label="หมายเหตุ"
                          name={[name, "remark"]}
                        >
                          <Input
                            placeholder="หมายเหตุ"
                            style={{ width: "300px" }}
                          />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                        style={{
                          width: "25%",
                          display: "block",
                          marginLeft: "auto",
                          marginRight: "auto",
                        }}
                      >
                        เพิ่มรายการ
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    //center button
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                >
                  บันทึก
                </Button>
              </Form.Item>
            </Form>
          </div>
        {/* )} */}
      </>
    );
  }
  