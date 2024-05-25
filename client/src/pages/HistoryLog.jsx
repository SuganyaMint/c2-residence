import React, { useEffect, useState } from "react";
import { Typography, Divider, Table, Button, BackTop } from "antd";
import SkeletonComponent from "../components/SkeletonComponent/SkeletonComponent";
import API from "../utils/ApiUrl";
import { ApiRouter } from "../utils/ApiRouter";
const { Title, Paragraph } = Typography;

function HistoryLog() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.history);
      if (res.data.status === true) {
        setLoading(false);
        setData(res.data.data);
      }
    };

    fetchData();
    setIsSubmit(false);
  }, [isSubmit]);

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      width: 70,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 70,
    },

    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
      align: "center",
      width: 70,
    },
    {
      title: "Login Date",
      dataIndex: "loginDate",
      key: "loginDate",
      align: "center",
      width: 60,
    },
    {
      title: "Logout Date",
      dataIndex: "logoutDate",
      key: "logoutDate",
      align: "center",
      width: 60,
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
          <Title level={2}>ประวัติการเข้าสู่ระบบ</Title>
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
              scroll={{ x: 500 }}
            />
          </Paragraph>
        </>
      )}
    </>
  );
}

export default HistoryLog;
