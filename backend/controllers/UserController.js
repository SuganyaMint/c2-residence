const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { userName, password, name, surname, phone } = req.body;
    let hashPassword = await bcrypt.hash(password, 10);
    let checkUserName = await prisma.userTable.findMany({
      where: {
        userName: userName,
      },
    });
    if (checkUserName.length > 0) {
      res.json({
        status: false,
        message: "User name already exists",
      });
      return;
    }
    let user = await prisma.userTable.create({
      data: {
        userName: userName,
        password: hashPassword,
        name: name,
        surname: surname,
        phone: phone == undefined ? "" : phone,
        role: "user",
      },
    });
    if (user) {
      res.json({
        status: true,
        message: "User created successfully",
        data: user,
      });
    } else {
      console.log(error);
      res.json({
        status: false,
        message: "User creation failed",
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

const getUser = async (req, res) => {
  try {
    let user = await prisma.userTable.findMany();
    if (user) {
      res.json({
        status: true,
        message: "User created successfully",
        data: user,
      });
    } else {
      res.json({
        status: false,
        message: "User creation failed",
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

const getUserByUserName = async (req, res) => {
  try {
    let user = await prisma.userTable.findMany({
      where: {
        userName: req.params.userName,
      },
    });
    if (user) {
      res.json({
        status: true,
        message: "User created successfully",
        data: user,
      });
    } else {
      res.json({
        status: false,
        message: "User creation failed",
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
const delelteUserById = async (req, res) => {
  try {
    let user = await prisma.userTable.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (user) {
      res.json({
        status: true,
        message: "User deleted successfully",
        data: user,
      });
    } else {
      res.json({
        status: false,
        message: "User deletion failed",
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
const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, surname, phone } = req.body;
    let user = await prisma.userTable.update({
      where: {
        id: parseInt(id),
      },
      data: {
        // userName: userName,
        name: name,
        surname: surname,
        phone: phone,
      },
    });
    if (user) {
      res.json({
        status: true,
        message: "User updated successfully",
        data: user,
      });
    } else {
      res.json({
        status: false,
        message: "User update failed",
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
  register,
  getUser,
  getUserByUserName,
  delelteUserById,
  editUser,
};
