const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const moment = require("moment");

const login = async (req, res) => {
  try {
    console.log(req.body);
    let userName = req.body.userName;
    let password = req.body.password;

    let user = await prisma.userTable.findMany({
      where: {
        userName: userName,
      },
    });

    if (user.length === 1) {
      let isMatch = await bcrypt.compare(password, user[0].password);
      if (isMatch) {
        let token = JWT.sign(
          {
            id: user[0].id,
          },
          secret,
          { expiresIn: "3hr" }
        );

        const log = await prisma.loginHistory.create({
          data: {
            userName: userName,
            logoutDate: "",
            loginDate: moment().format("YYYY-MM-DD HH:mm:ss"),
          },
        });

        res.json({
          status: true,
          message: "Login successfully",
          token: token,
        });
      } else {
        res.json({
          status: false,
          message: "Login failed",
        });
      }
    } else {
      res.json({
        status: false,
        message: "Login failed",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: "Internal server error",
    });
  }
};

const authen = async (req, res) => {
  // console.log(req.headers.authorization);
  try {
    let token = req.headers.authorization.split(" ")[1];
    let decoded = JWT.verify(token, secret);
    if (decoded) {
      let dataArr = [];
      const user = await prisma.userTable.findUnique({
        where: {
          id: parseInt(decoded.id),
        },
      });
      dataArr.push(user);

      if (dataArr.length > 0) {
        let data = {
          userName: user.userName,
          name: user.name,
          surname: user.surname,
          phone: user.phone,
          role: user.role,
        };
        res.json({
          status: true,
          message: "Authentication successfully",
          data: data,
        });
      } else {
        res.json({
          status: false,
          message: "Authentication failed",
        });
      }
    } else {
      res.json({
        status: false,
        message: "Authentication failed",
      });
    }
  } catch (error) {
    res.json({
      status: false,
      message: "Internal server error",
    });
  }
};

const logout = async (req, res) => {
  try {
    let userName = req.params.userName;
    //update ใน loginHistory โดยการเอา userName มาหา ตัวล่าสุด แล้ว update logoutDate
    const getlog = await prisma.loginHistory.findFirst({
      where: {
        userName: userName,
      },
      orderBy: {
        loginDate: "desc",
      },
    });
    let id = getlog.id;
    let logoutDate = moment().format("YYYY-MM-DD HH:mm:ss")
    const log = await prisma.loginHistory.update({
      where: {
        id: id,
      },
      data: {
        logoutDate: logoutDate,
      },
    });

    if (log) {

      res.json({
        status: true,
        message: "Logout successfully",
      });
    } else {
      res.json({
        status: false,
        message: "Logout failed",
      });

    }

  } catch (error) {
    res.json({
      status: false,
      message: "Internal server error",
    });
  }

}

const getHistory = async (req, res) => {
  try {
    const log = await prisma.loginHistory.findMany({
      orderBy: {
        loginDate: "desc",
      },
    });
    const getUser = await prisma.userTable.findMany();

    for (let i = 0; i < log.length; i++) {
      for (let j = 0; j < getUser.length; j++) {
        if (log[i].userName === getUser[j].userName) {
          log[i].name = getUser[j].name;
          log[i].surname = getUser[j].surname;
          log[i].phone = getUser[j].phone;
          log[i].role = getUser[j].role;
        }
      }
    }
    //change date format
    for (let i = 0; i < log.length; i++) {
      log[i].loginDate = moment(log[i].loginDate).format("YYYY-MM-DD HH:mm:ss");
      log[i].logoutDate = moment(log[i].logoutDate).format("YYYY-MM-DD HH:mm:ss");
    }
    res.json({
      status: true,
      message: "Get history successfully",
      data: log,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Internal server error",
    });
  }
}

module.exports = {
  login,
  authen,
  logout,
  getHistory
};
