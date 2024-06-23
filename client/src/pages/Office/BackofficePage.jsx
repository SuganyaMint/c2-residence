import React, { useEffect, useState } from "react";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import { Button, Table, Typography } from "antd";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import CreateProjectOffice from "../../components/Office/CreateProjectOffice";
import EditProjectOffice from "../../components/Office/EditProjectOffice";
const { Title, Paragraph } = Typography;

function BackofficePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.getprojectOffice);

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
      title: "Action",
      key: "action",
      align: "center",
      width: 150,

      render: (text, record) => (
        <>
          <Link to={`/back-office-createmaster/${record.project_office_ID}`}>
            <Button type="primary" style={{ marginLeft: 10 }}>
              ดูรายละเอียด
            </Button>
          </Link>
          <EditProjectOffice
            oldData={record}
            setIsSubmit={setIsSubmit}
            project_office_ID={record.project_office_ID}
          />
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
      <Title level={2}>ค่าใช้จ่าย Office รายเดือนของแต่ละโครงการ</Title>
      <CreateProjectOffice setIsSubmit={setIsSubmit} />
      <Table
        dataSource={data}
        columns={columns}
        style={{
          marginTop: 40,
        }}
      />
    </>
  );
}

export default BackofficePage;
