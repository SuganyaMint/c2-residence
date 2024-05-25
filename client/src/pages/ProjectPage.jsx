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

import * as XLSX from "xlsx";
import { ExportOutlined } from "@ant-design/icons";

import moment from "moment";
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

  const exportToExcel = (data) => {
    const year = new Date().getFullYear();
    const month = String(new Date().getMonth() + 1).padStart(2, "0");
    const day = String(new Date().getDate()).padStart(2, "0");
    const hour = String(new Date().getHours()).padStart(2, "0");
    const minute = String(new Date().getMinutes()).padStart(2, "0");
    const second = String(new Date().getSeconds()).padStart(2, "0");
    const formattedDate = `${year}${month}${day}`;
    const formattedTime = `${hour}:${minute}:${second}`;

    // Mapping data with necessary transformations
    const dataWithTransformations = Object.keys(data).map((key, index) => {
      const project = data[key];
      return {
        id: index + 1, // Assuming 'id' should be the index
        // projectID: key,
        projectName: project.projectName || key,
        budget: project.budget,
        totalActual: project.totalActual,
        remark: project.remark || "",
        status: project.status === 0 ? "กำลังดำเนินการ" : "เสร็จสิ้นโครงการ",
        area: project.area || "",
        date: project.date || "",
        createdAt: moment(project.createdAt).format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment(project.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
      };
    });

    // Create worksheet from data
    const ws = XLSX.utils.json_to_sheet(dataWithTransformations);

    // Define new headers
    const newHeaders = [
      [
        "id",
        "ชื่อโครงการ",
        "Budget",
        "ค่าใช้จ่ายจริง",
        "หมายเหตุ",
        "สถานะ",
        "พื้นที่โครงการ",
        "วันที่เริ่มโครงการ",
        "วันที่สร้างข้อมูล",
        "วันที่แก้ไขข้อมูล",
      ],
    ];

    // Prepend the new headers to the worksheet
    XLSX.utils.sheet_add_aoa(ws, newHeaders, { origin: "A1" });

    // Update the header row
    const range = XLSX.utils.decode_range(ws["!ref"]);
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const address = XLSX.utils.encode_col(C) + "1"; // <- first row
      if (!ws[address]) continue;
      ws[address].v = newHeaders[0][C];
    }

    // Find the range of the worksheet
    const lastRow = range.e.r + 1;

    // Add export date and time at the last row
    XLSX.utils.sheet_add_aoa(ws, [["exportDate", `${year}-${month}-${day}`]], {
      origin: { r: lastRow + 1, c: 0 },
    });
    XLSX.utils.sheet_add_aoa(ws, [["exportTime", formattedTime]], {
      origin: { r: lastRow + 2, c: 0 },
    });

    // Create a new workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "DataExport");

    // Write the workbook to a file
    XLSX.writeFile(wb, `Project_export-${formattedDate}.xlsx`);
  };

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

            {/* <ExportComponent data={data} type="project" /> */}
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
