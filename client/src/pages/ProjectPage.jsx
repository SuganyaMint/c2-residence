import React, { useEffect, useState } from "react";
import { Typography, Divider, Table, Button, BackTop } from "antd";
import SkeletonComponent from "../components/SkeletonComponent/SkeletonComponent";
import API from "../utils/ApiUrl";
import { ApiRouter } from "../utils/ApiRouter";
import Swal from "sweetalert2";
import ChangeStatus from "../components/ProjectComponent/ChangeStatus";
import EditProject from "../components/ProjectComponent/EditProject";
import CreateProject from "../components/ProjectComponent/CreateProject";
const { Title, Paragraph } = Typography;

import ExportComponent from "../components/ExportComponent";

function ProjectPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.project);

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
        const res = await API.delete(`${ApiRouter.project}/${id}`);

        if (res.data.status === true) {
          Swal.fire("ลบสำเร็จ!", "ข้อมูลของคุณถูกลบแล้ว.", "success");
          setIsSubmit(true);
          
        }
      }
    });
  };

  const columns = [
    {
      title: "ชื่อโครงการ",
      dataIndex: "projectName",
      key: "projectName",
      align: "center",
      width: 170,
    },
    {
      title: "ยอดตามสัญญา",
      dataIndex: "budget",
      key: "budget",
      align: "center",
      width: 120,

      render: (text) => Number(text).toLocaleString(),
    },
    {
      title: "ค่าใช้จ่าย",
      dataIndex: "totalActual",
      key: "totalActual",
      align: "center",
      width: 120,

      render: (text) => Number(text).toLocaleString(),
    },
    {
      title: "วันที่เริ่มโครงการ",
      dataIndex: "date",
      key: "date",
      align: "center",
      width: 120,
    },
    {
      title: "พื้นที่",
      dataIndex: "area",
      key: "area",
      align: "center",
      width: 120,
    },
    {
      title: "หมายเหตุ",
      dataIndex: "remark",
      key: "remark",
      align: "center",
      width: 100,
    },
    {
      title: "สถานะโครงการ",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: 70,

      render: (_, record) => (
        <>
          <ChangeStatus data={record} />
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      width: 150,

      render: (text, record) => (
        <>
          <EditProject data={record} />
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
          <Title level={2}>รายละเอียดโครงการ</Title>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <CreateProject setIsSubmit={setIsSubmit} />

            <ExportComponent data={data} type="project" />
          </div>

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

export default ProjectPage;
