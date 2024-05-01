import React, { useEffect, useState } from "react";
import { Typography, Divider, Table, Button, BackTop } from "antd";
import SkeletonComponent from "../components/SkeletonComponent/SkeletonComponent";
import API from "../utils/ApiUrl";
import { ApiRouter } from "../utils/ApiRouter";
import Swal from "sweetalert2";
import EditActualProject from "../components/ActualProject/EditActualProject";
import CreateActualProject from "../components/ActualProject/CreateActualProject";
const { Title, Paragraph } = Typography;

function ActualProjectPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.actualDetail);
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
      title: "คุณแน่ใจใช่ไหมที่จะProjectใช่ไหม?",
      text: "คุณจะไม่สามารถกู้คืนข้อมูลได้อีก!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await API.delete(`${ApiRouter.actualDetail}/${id}`);

        if (res.data.status === true) {
          Swal.fire("ลบสำเร็จ!", "ข้อมูลของคุณถูกลบแล้ว.", "success");
          setIsSubmit(true);
        }
      }
    });
  };

  const columns = [
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    //   align: "center",
    //   width: 50,
    // },
    {
      title: "ชื่อโครงการ",
      dataIndex: "projectName",
      key: "projectName",
      align: "center",
      width: 130,
    },
    {
      title: "จำนวนรายจ่าย",
      dataIndex: "actualValue",
      key: "actualValue",
      align: "center",
      width: 70,

      render: (text) => Number(text).toLocaleString(),
    },

    {
      title: "ประเภทค่าใช้จ่าย",
      dataIndex: "actualType",
      key: "actualType",
      align: "center",
      width: 150,

    },
    {
      title: "หมายเหตุ",
      dataIndex: "remark",
      key: "remark",
      align: "center",
      width: 60,
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      width: 150,

      render: (text, record) => (
        <>
          <EditActualProject data={record} />
          <Button
            danger
            type="primary"
            style={{ marginLeft: 10 }}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <>
          <SkeletonComponent />
        </>
      ) : (
        <>
          <Title level={2}>รายละเอียดค่าใช้จ่ายโครงการ</Title>
          <CreateActualProject setIsSubmit={setIsSubmit} />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "20px",
            }}
          ></div>
          <Divider />
          <Paragraph>
            <Table
              dataSource={data}
              columns={columns}
              rowKey={(record) => record.id}
              scroll={{ x: 1500 }}
            />
          </Paragraph>
        </>
      )}
    </>
  );
}

export default ActualProjectPage;
