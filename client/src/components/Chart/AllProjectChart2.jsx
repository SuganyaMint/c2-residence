import React, { useEffect, useState } from "react";
import API from "../../utils/ApiUrl";
import { ApiRouter } from "../../utils/ApiRouter";
import {
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  Cell,
  LabelList,
} from "recharts";
import imgStatus1 from "../../assets/icon/green.png";
import imgStatus2 from "../../assets/icon/ye.png";
import { Select } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import ICON from "../../assets/icon/pdfICON2.png";

function AllProjectChart2() {
  const [actualData, setActualData] = useState([]);
  const [allProject, setAllProject] = useState([]);
  const currentYear = new Date().getFullYear();
  const [yearOption, setYearOption] = useState([
    { value: currentYear, label: currentYear },
  ]);
  const [selectedYear, setSelectedYear] = useState("All project");
  const [projectStatus, setProjectStatus] = useState(2);

  const handleChange = async (value) => {
    setSelectedYear(value);
    const res = await API.get(
      ApiRouter.actualSummary + `/${value}/${projectStatus}`
    );
    setActualData(res.data.data);
  };

  const handleStatusChange = async (value) => {
    setProjectStatus(value);
    const res = await API.get(
      ApiRouter.actualSummary + `/${selectedYear}/${value}`
    );
    setActualData(res.data.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get(ApiRouter.project);

        const dataArr = res.data.data.map((item) => {
          const year = new Date(item.date).getFullYear();
          return { value: year, label: year };
        });

        const uniqueYears = Array.from(
          new Set(dataArr.map((item) => item.value))
        ).map((year) => ({
          value: year,
          label: year,
        }));

        const allProject = { value: "All project", label: "All project" };
        uniqueYears.unshift(allProject);

        setYearOption(uniqueYears);

        const getActual = await API.get(ApiRouter.actualSummary);
        setActualData(getActual.data.data);
        setAllProject(getActual.data.data);
      } catch (error) {
        console.error("Error fetching project data", error);
      }
    };

    fetchData();
  }, []);

  const data = Object.keys(actualData).map((project) => ({
    name: project,
    ค่าแรง: parseFloat(actualData[project]["ค่าแรง"]),
    วัสดุ: parseFloat(actualData[project]["วัสดุ"]),
    เครื่องจักร: parseFloat(actualData[project]["เครื่องจักร"]),
    ค่าดำเนินการ: parseFloat(actualData[project]["ค่าดำเนินการ"]),
    อื่นๆ: parseFloat(actualData[project]["อื่นๆ"]),
    งบประมาณ: actualData[project]["budget"],
    totalActual: actualData[project]["totalActual"],
    status: actualData[project]["status"],
    remain: actualData[project]["budget"] - actualData[project]["totalActual"],
  }));

  const CustomTick = ({ x, y, payload, index, data }) => {
    const item = data[index];
    return (
      <g transform={`translate(${x},${y}) rotate(-45)`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666">
          {payload.value}
        </text>
        {item.status === 1 ? (
          <image href={imgStatus1} x={-100} y={80} height="20px" width="20px" />
        ) : (
          <image href={imgStatus2} x={-100} y={80} height="20px" width="20px" />
        )}
      </g>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <p className="label">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name} : ${entry.value.toLocaleString()}`}
            </p>
          ))}
          <p
            style={{ color: "black" }}
          >{`เหลือ : ${payload[0].payload.remain.toLocaleString()}`}</p>
        </div>
      );
    }

    return null;
  };

  const exportToPDF = () => {
    // เลือก container ที่ต้องการแปลงเป็นภาพ
    const input = document.getElementById("chart-container-wrapper");

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");
      const imgWidth = 297; // ความกว้างของหน้ากระดาษในมม. (A4)
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // คำนวณความสูงตามอัตราส่วน

      // เพิ่มภาพเข้าไปใน PDF
      pdf.addImage(imgData, "PNG", 10, 10, imgWidth - 20, imgHeight - 20);

      // ดึงวันเดือนปีและเวลาปัจจุบัน
      const now = new Date();
      const dateStr = now.toLocaleDateString();
      const timeStr = now.toLocaleTimeString();

      // เพิ่มข้อความวันเดือนปีและเวลาเข้าไปใน PDF
      pdf.setFontSize(10); // กำหนดขนาดฟอนต์
      pdf.text(`Exported on: ${dateStr} ${timeStr}`, 10, imgHeight + 30); // ตั้งตำแหน่งของข้อความ

      // บันทึก PDF
      pdf.save(`chart-${dateStr}-${timeStr}.pdf`);
    });
  };

  return (
    <>
      <div id="chart-container-wrapper">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            marginBottom: "20px",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              fontSize: "28px",
              fontWeight: "bold",
              color: "#293242",
              marginTop: "10px",
              marginBottom: "20px",
              flex: 1,
            }}
          >
            กราฟแสดงค่าใช้จ่ายแต่ละโครงการ
          </h1>
          <img
            onClick={exportToPDF}
            src={ICON} // Use a placeholder image or your desired image source here
            style={{
              width: "40px",
              height: "40px",
              position: "absolute",
              right: "10px",
              cursor: "pointer",
            }}
          />
        </div>
        <div
          id="chart-container"
          style={{
            width: "100%",
            height: "700px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>
              <Select
                defaultValue={selectedYear}
                value={selectedYear}
                style={{
                  width: 120,
                  marginRight: "10px",
                }}
                onChange={handleChange}
                options={yearOption}
              />
              <Select
                defaultValue={projectStatus}
                value={projectStatus}
                style={{
                  width: 200,
                }}
                onChange={handleStatusChange}
                options={[
                  { value: 0, label: "กำลังดำเนินการ" },
                  { value: 1, label: "เสร็จสิ้นโครงการ" },
                  { value: 2, label: "ทุกสถานะ" },
                ]}
              />
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  marginRight: "20px",
                  marginBottom: "5px",
                }}
              >
                <img
                  src={imgStatus1}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "5px",
                  }}
                />
                <p>เสร็จสิ้นโครงการ</p>
              </div>
              <div
                style={{
                  display: "flex",
                }}
              >
                <img
                  src={imgStatus2}
                  style={{
                    width: "20px",
                    height: "20px",
                    marginRight: "5px",
                  }}
                />
                <p>กำลังดำเนินการ</p>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis
                dataKey="name"
                height={160}
                angle={-70} // ปรับมุมของป้ายชื่อ
                textAnchor="end" // ตั้งค่า anchor ของข้อความ
                tick={<CustomTick data={data} />} // ใช้ CustomTick component ที่กำหนดเอง
              />
              <YAxis tickFormatter={(value) => value.toLocaleString()} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar
                stackId="a"
                dataKey="ค่าแรง"
                stroke="#293242"
                barSize={30}
                fill="#F6C6C7"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Bar>
              <Bar
                stackId="a"
                dataKey="เครื่องจักร"
                stroke="#293242"
                barSize={30}
                fill="#82ca9d"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Bar>
              <Bar
                stackId="a"
                dataKey="วัสดุ"
                stroke="#293242"
                barSize={30}
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Bar>
              <Bar
                stackId="a"
                dataKey="ค่าดำเนินการ"
                stroke="#293242"
                barSize={30}
                fill="#FFBD0E"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
              </Bar>
              <Bar
                stackId="a"
                dataKey="อื่นๆ"
                stroke="#293242"
                barSize={30}
                fill="#8BD2EC"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} />
                ))}
                <LabelList
                  dataKey="totalActual"
                  position="top"
                  content={(props) => {
                    const { x, y, value } = props;
                    return (
                      <text
                        x={x}
                        y={y}
                        dy={-4}
                        textAnchor="middle"
                        fill="#293242"
                      >
                        {(value / 1000).toLocaleString()}k
                      </text>
                    );
                  }}
                />
              </Bar>
              <Line type="monotone" dataKey="งบประมาณ" stroke="#ff7300"></Line>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}

export default AllProjectChart2;
