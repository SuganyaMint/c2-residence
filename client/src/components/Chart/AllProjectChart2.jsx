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
function AllProjectChart2() {
  const [datas, setData] = useState([]);
  const [actualData, setActualData] = useState([]);
  const typeAcual = ["ค่าแรง", "วัสดุ", "เครื่องจักร", "อื่นๆ"];
  const colors = [
    "#A8D1E7",
    "#E7DCFC",
    "#FFBB28",
    "#F898A4",
    "#ADD495",
    "#FADCDC",
    "#8BD2EC",
    "#D4D2F2",
    "#E6C2BF",
    "#D2DBD6",
    "#F0F4BF",
    "#F8D5F8",
  ];
  useEffect(() => {
    const fetchData = async () => {
      const res = await API.get(ApiRouter.project);
      setData(res.data.data);
      const getActual = await API.get(ApiRouter.actualSummary);
      // console.log(getActual.data.data);
      setActualData(getActual.data.data);
    };
    fetchData();
  }, []);

  const data = Object.keys(actualData).map((project, index) => {
    return {
      name: project,
      ค่าแรง: actualData[project]["ค่าแรง"],
      วัสดุ: actualData[project]["วัสดุ"],
      เครื่องจักร: actualData[project]["เครื่องจักร"],
      อื่นๆ: actualData[project]["อื่นๆ"],
      budget: actualData[project]["budget"],
    };
  });
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
      <ComposedChart
        width={800}
        height={500}
        data={data}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
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
          dataKey="อื่นๆ"
          stroke="#293242"
          barSize={30}
          fill="#8BD2EC"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} />
          ))}
          <LabelList
            dataKey="ค่าแรง"
            position="top"
            content={(props) => {
              const { x, y, value } = props;
              return (
                <text x={x} y={y} dy={-4} textAnchor="center" fill="#293242">
                  {value}
                </text>
              );
            }}
          />
        </Bar>
        <Line type="monotone" dataKey="budget" stroke="#ff7300" />
      </ComposedChart>
    </>
  );
}

export default AllProjectChart2;
