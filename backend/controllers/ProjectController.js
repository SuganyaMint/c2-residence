const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");
const { connect } = require("../routes/ProjectRouter");

const getProject = async (req, res) => {
  try {
    let project = await prisma.project.findMany();
    if (project) {
      res.json({
        status: true,
        data: project,
      });
    } else {
      res.json({
        status: false,
        message: "Project not found",
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

const getProjectById = async (req, res) => {
  try {
    let project = await prisma.project.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (project) {
      res.json({
        status: true,
        data: project,
      });
    } else {
      res.json({
        status: false,
        message: "Project not found",
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

const createProject = async (req, res) => {
  try {
    const { projectName, budget, remark, area ,date } = req.body;
    const projectID = "PROJ" + moment().format("YYYYMMDDHHmmss");
    let project = await prisma.project.create({
      data: {
        projectID,
        projectName,
        budget,
        totalActual: 0,
        remark: remark || "",
        area: area || "",
        status: 0,
        date
      },
    });
    if (project) {
      res.json({
        status: true,
        message: "Project created successfully",
        data: project,
      });
    } else {
      res.json({
        status: false,
        message: "Project creation failed",
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
const updateProject = async (req, res) => {
  try {
    const { projectName, budget, totalActual, remark, date} = req.body;

    let project = await prisma.project.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        projectName,
        budget,
        totalActual,
        remark,
        date
      },
    });
    if (project) {
      res.json({
        status: true,
        message: "Project updated successfully",
        data: project,
      });
    } else {
      res.json({
        status: false,
        message: "Project updation failed",
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

const deleteProject = async (req, res) => {
  try {
    let project = await prisma.project.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });

    if (project) {
      const projectID = project.projectID;
      let actualDetail = await prisma.actualDetail.deleteMany({
        where: {
          projectID: projectID,
        },
      });
      if (actualDetail) {
        res.json({
          status: true,
          message: "Project and its actual details deleted successfully",
          data: project,
        });
      } else {
        res.json({
          status: false,
          message: "Project deletion failed",
        });
      }
    } else {
      res.json({
        status: false,
        message: "Project deletion failed",
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

const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    let project = await prisma.project.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        status,
      },
    });
    if (project) {
      res.json({
        status: true,
        message: "Project status updated successfully",
        data: project,
      });
    } else {
      res.json({
        status: false,
        message: "Project status updation failed",
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


module.exports = {
  getProject,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  updateStatus,
};
