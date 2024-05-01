const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const login = async (req, res) => {
  try {
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
          { expiresIn: "1h" }
        );
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
      const user = await prisma.userTable.findUnique({
        where: {
          id: parseInt(decoded.id),
        },
      });
      if (user) {
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

module.exports = {
  login,
  authen,
};