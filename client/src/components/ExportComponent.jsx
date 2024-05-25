import React from "react";
import * as XLSX from "xlsx";
import EXCELICON from "../assets/icon/excelicon.webp";

import moment from "moment";
function ExportComponent(props) {
  let data = props.data;
  let type = props.type;

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
    <div>
      <img
        onClick={() => exportToExcel(data)}
        src={EXCELICON}
        style={{
          width: "30px",
          height: "30px",
          cursor: "pointer",
        }}
      />
    </div>
  );
}

export default ExportComponent;
