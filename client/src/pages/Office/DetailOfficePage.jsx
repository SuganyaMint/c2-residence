import React, { useEffect, useState } from "react";
import { Typography, Divider, Table, Button, BackTop } from "antd";
import SkeletonComponent from "../../components/SkeletonComponent/SkeletonComponent";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import { LeftCircleOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router-dom";
import SelectMonth from "../../components/Office/SelectMonth";
import PDFoffice from "../../components/Office/PDFoffice";

const { Title, Paragraph } = Typography;
export default function DetailOfficePage() {
  const navigate = useNavigate();

  const { project_office_ID } = useParams();
  //projectOfficeDetail
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [project_name, setProject_name] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(
        ApiRouter.projectOfficeDetail + project_office_ID
      );
      if (res.data.status === true) {
        setLoading(false);
        setData(res.data.data);
        setProject_name(res.data.name);
      }
    };
    fetchData();
    setIsSubmit(false);
  }, [isSubmit]);

  const [reports, setReports] = useState({});

  useEffect(() => {
    const fetchReports = async () => {
      const updatedReports = {};

      for (const record of data) {
        try {
          const res = await API.get(
            `${ApiRouter.projectOfficeActual}/report/${record.project_office_ID}/${record.month}`
          );
          if (res.data.status === true) {
            updatedReports[`${record.project_office_ID}_${record.month}`] = {
              master: res.data.master,
              actual: res.data.actual,
              remain: res.data.remain
            };
          }
        } catch (error) {
          console.error(
            `Error fetching report for ${record.project_office_ID} ${record.month}:`,
            error
          );
        }
      }

      setReports(updatedReports);
    };

    fetchReports();
  }, [data]);

  const columns = [
    {
      title: "เดือน",
      dataIndex: "month",
      key: "month",
      align: "center",
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (text, record) => {
        const reportKey = `${record.project_office_ID}_${record.month}`;
        const report = reports[reportKey];

        return (
          <>
            <Link to={`/back-office-createmaster/${record.project_office_ID}/${record.month}`}>
              <Button type="primary">ค่าใช่จ่ายตั้งต้น</Button>
            </Link>
            <Link to={`/back-office-createactual/${record.project_office_ID}/${record.month}`}>
              <Button
                type="primary"
                style={{
                  marginLeft: 10,
                  backgroundColor: "#009D69",
                }}
              >
                ค่าใช้จ่ายที่เกิดขึ้นจริง
              </Button>
            </Link>
            {report && <PDFoffice master={report.master} actual={report.actual} remain = {report.remain} />}
          </>
        );
      },
    },
  ];;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Title level={2}>รายละเอียดโครงการ : {project_name}</Title>
        <LeftCircleOutlined
          style={{
            fontSize: "30px",
            color: "#0074FF",
            cursor: "pointer",
          }}
          onClick={() => navigate("/back-office")}
        />
      </div>
      <Link to={`/back-office-createmaster/${project_office_ID}`}></Link>
      <SelectMonth
        project_office_ID={project_office_ID}
        setIsSubmit={setIsSubmit}
      />

      {loading || data.length === 0 ? (
        <SkeletonComponent />
      ) : (
        <Table
          style={{ marginTop: 30 }}
          dataSource={data}
          columns={columns}
          rowKey={(record) => record.id}
        />
      )}
    </div>
  );
}
