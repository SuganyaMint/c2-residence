import React, { useEffect, useState } from "react";
import { Typography, Divider, Table, Button, BackTop } from "antd";
import SkeletonComponent from "../components/SkeletonComponent/SkeletonComponent";
import API from "../utils/ApiUrl";
import { ApiRouter } from "../utils/ApiRouter";
import CreateUserCompinent from "../components/UserComponent/CreateUserCompinent";
import Swal from "sweetalert2";
import EditUserCompinen from "../components/UserComponent/EditUserCompinen";
const { Title, Paragraph } = Typography;

function UserManagePage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.users);

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
      title: "คุณแน่ใจใช่ไหมที่จะลบผู้ใช้งาน?",
      text: "คุณจะไม่สามารถกู้คืนข้อมูลได้อีก!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ลบเลย!",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await API.delete(`${ApiRouter.users}/${id}`);

        if (res.data.status === true) {
          Swal.fire("ลบสำเร็จ!", "ข้อมูลของคุณถูกลบแล้ว.", "success");
          setIsSubmit(true);
        }
      }
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",

    },
    {
      title: "User name",
      dataIndex: "userName",
      key: "userName",
      align: "center",

    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",

    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    // {
    //   title: "Role",
    //   dataIndex: "role",
    //   key: "role",
    // },
    {
      title: "Action",
      align: "center",
      key: "action",
      render: (text, record) => (
        <>
          <EditUserCompinen data={record} />
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
          <Title level={2}>จัดการผู้ใช้งาน</Title>
          <CreateUserCompinent setIsSubmit={setIsSubmit} />
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
            />
          </Paragraph>
        </>
      )}
    </>
  );
}

export default UserManagePage;
