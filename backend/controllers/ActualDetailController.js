const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");

const getActualDetail = async (req, res) => {
  try {
    let actualDetail = await prisma.actualDetail.findMany();
    let project = await prisma.project.findMany();

    project.map((item) => {
      actualDetail.map((item2) => {
        if (item.projectID === item2.projectID) {
          item2.projectName = item.projectName;
          item2.area = item.area;
          item2.status = item.status;
        }
      });
    });
    if (actualDetail) {
      res.json({
        status: true,
        data: actualDetail,
      });
    } else {
      res.json({
        status: false,
        message: "Actual Detail not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

const getActualDetailById = async (req, res) => {
  try {
    let actualDetail = await prisma.actualDetail.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (actualDetail) {
      res.json({
        status: true,
        data: actualDetail,
      });
    } else {
      res.json({
        status: false,
        message: "Actual Detail not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

const createActualDetail = async (req, res) => {
  try {
    const { projectID, actualValue, actualType, remark, date } = req.body;
    const actualDetailID = "ACT" + moment().format("YYYYMMDDHHmmss");
    let actualDetail = await prisma.actualDetail.create({
      data: {
        actualDetailID,
        projectID,
        actualValue,
        actualType,
        remark: remark || "",
        date,
      },
    });

    //update totalActual in project
    let project = await prisma.project.findUnique({
      where: {
        projectID: projectID,
      },
    });
    let totalActual = project.totalActual + actualValue;
    await prisma.project.update({
      where: {
        projectID,
      },
      data: {
        totalActual,
      },
    });

    if (actualDetail && project) {
      res.json({
        status: true,
        message: "Actual Detail created successfully",
      });
    } else {
      res.json({
        status: false,
        message: "Actual Detail not created",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

const updateActualDetail = async (req, res) => {
  try {
    const { projectID, actualValue, actualType, remark, date } = req.body;

    let actualDetail = await prisma.actualDetail.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        projectID,
        actualValue,
        actualType,
        remark,
        date,
      },
    });
    if (actualDetail) {
      res.json({
        status: true,
        message: "Actual Detail updated successfully",
      });
    } else {
      res.json({
        status: false,
        message: "Actual Detail not updated",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

const deleteActualDetail = async (req, res) => {
  try {
    let getactualDetail = await prisma.actualDetail.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    let projectID = getactualDetail.projectID;

    //update totalActual in project
    let project = await prisma.project.findUnique({
      where: {
        projectID,
      },
    });
    let totalActual = project.totalActual - getactualDetail.actualValue;
    await prisma.project.update({
      where: {
        projectID,
      },
      data: {
        totalActual,
      },
    });

    let actualDetail = await prisma.actualDetail.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (actualDetail) {
      res.json({
        status: true,
        message: "Actual Detail deleted successfully",
      });
    } else {
      res.json({
        status: false,
        message: "Actual Detail not deleted",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

const getSummaryAcualCost = async (req, res) => {
  try {
    let actualDetail = await prisma.actualDetail.findMany();
    let project = await prisma.project.findMany();

    project.map((item) => {
      actualDetail.map((item2) => {
        if (item.projectID === item2.projectID) {
          item2.projectName = item.projectName;
          item2.area = item.area;
          item2.status = item.status;
        }
      });
    });
    const typeAcual = ["ค่าแรง", "วัสดุ", "เครื่องจักร", "อื่นๆ"];

    // const summedValues = {};

    // // สร้างโครงสร้างข้อมูลเริ่มต้นสำหรับการรวม
    // typeAcual.forEach((type) => {
    //   summedValues[type] = {};
    // });

    // // แบ่งแยกข้อมูลและรวมค่าแต่ละประเภทแยกตามโครงการ
    // actualDetail.forEach((item) => {
    //   const { actualType, projectName, actualValue } = item;
    //   if (typeAcual.includes(actualType)) {
    //     if (!summedValues[actualType][projectName]) {
    //       summedValues[actualType][projectName] = 0;
    //     }
    //     summedValues[actualType][projectName] += actualValue;
    //   }
    // });

    //sort by projectID:
    actualDetail.sort((a, b) => (a.projectID > b.projectID ? 1 : -1));
    const reversedData = {};
    actualDetail.forEach((item) => {
      const { actualType, projectName, actualValue } = item;
      if (typeAcual.includes(actualType)) {
        // ตรวจสอบว่า reversedData[projectName] มีค่าเป็น undefined หรือไม่
        if (!reversedData[projectName]) {
          // ถ้า reversedData[projectName] เป็น undefined ให้สร้าง object ใหม่ที่มีโครงสร้างที่ถูกต้อง
          reversedData[projectName] = {
            ค่าแรง: 0,
            วัสดุ: 0,
            เครื่องจักร: 0,
            อื่นๆ: 0,
          };
        }
        // เพิ่มค่า actualValue เข้าไปใน reversedData[projectName][actualType]
        reversedData[projectName][actualType] += actualValue;
      }
    });

    const budget = {};
    const totalActual = {};
    project.map((item) => {
      budget[item.projectName] = item.budget;
      totalActual[item.projectName] = item.totalActual;
    });
    //เอา object budget มาใส่ใน reversedData
    for (const [key, value] of Object.entries(reversedData)) {
      value["budget"] = budget[key];
      value["totalActual"] = totalActual[key];
    }
    res.json({
      status: true,
      //   data1: summedValues,
      data: reversedData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  getActualDetail,
  getActualDetailById,
  createActualDetail,
  updateActualDetail,
  deleteActualDetail,
  getSummaryAcualCost,
};
