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

function AllProjectChart2() {
  const [actualData, setActualData] = useState([]);
  const [allProject, setAllProject] = useState([]);
  const currentYear = new Date().getFullYear();
  const [yearOption, setYearOption] = useState([
    { value: currentYear, label: currentYear },
  ]);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [projectStatus, setProjectStatus] = useState(2);

  const handleChange = async (value) => {
    console.log("value", value);
    setSelectedYear(value);
    const res = await API.get(
      ApiRouter.actualSummary + `/${value}/${projectStatus}`
    );
    setActualData(res.data.data);
  };
  // console.log("actualData", actualData);

  const handleStatusChange = async (value) => {
    setProjectStatus(value);
    const res = await API.get(
      ApiRouter.actualSummary + `/${selectedYear}/${value}`
    );
    setActualData(res.data.data);
    // updateData();
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
    ค่าแรง: actualData[project]["ค่าแรง"],
    วัสดุ: actualData[project]["วัสดุ"],
    เครื่องจักร: actualData[project]["เครื่องจักร"],
    ค่าดำเนินการ: actualData[project]["ค่าดำเนินการ"],
    อื่นๆ: actualData[project]["อื่นๆ"],
    budget: actualData[project]["budget"],
    totalActual: actualData[project]["totalActual"],
    status: actualData[project]["status"],
  }));

  const tooltipFormatter = (value, name) => [value.toLocaleString(), name];

  const CustomTick = ({ x, y, payload, index, data }) => {
    const item = data[index];
    return (
      <g transform={`translate(${x},${y}) rotate(-45)`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666">
          {payload.value}
        </text>
        {item.status === 1 ? (
          <image href={imgStatus1} x={-75} y={50} height="20px" width="20px" />
        ) : (
          <image href={imgStatus2} x={-75} y={50} height="20px" width="20px" />
        )}
      </g>
    );
  };
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontSize: "28px",
          fontWeight: "bold",
          color: "#293242",
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        กราฟแสดงค่าใช้จ่ายแต่ละโครงการ
      </h1>
      <div
        style={{
          width: "100%",
          height: "600px",
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
              height={120}
              angle={-70} // ปรับมุมของป้ายชื่อ
              textAnchor="end" // ตั้งค่า anchor ของข้อความ
              tick={<CustomTick data={data} />} // ใช้ CustomTick component ที่กำหนดเอง
            />
            <YAxis tickFormatter={(value) => value.toLocaleString()} />
            <Tooltip formatter={tooltipFormatter} />
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
                //center

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
                      {/* {value.toLocaleString()} */}
                      {(value / 1000).toLocaleString()}k
                    </text>
                  );
                }}
              />
            </Bar>
            <Line type="monotone" dataKey="budget" stroke="#ff7300">
              {/* <LabelList
                dataKey="budget"
                position="top"
                fill="#ff7300"
                formatter={(value) => value.toLocaleString()}
              /> */}
            </Line>
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default AllProjectChart2;
