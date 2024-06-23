const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");

//office_actual

const create_office_actual = async (req, res) => {
  try {
    const { project_office_ID, month, actual } = req.body;
    let total_qty = actual.reduce((acc, item) => {
      return acc + parseFloat(item.qty);
    }, 0);

    const getProject = await prisma.office_actual.findMany({
      where: {
        project_office_ID: project_office_ID,
        month: month
      }
    })
    if (getProject.length === 0) {
      total_qty = total_qty
    } else {
      total_qty = total_qty + parseFloat(getProject[0].total_qty);
    }


    async function createOfficeMasterRecords(actual, project_office_ID, month, total_qty) {
      for (const item of actual) {
        const { detail, qty, remark } = item;
        await prisma.office_actual.create({
          data: {
            project_office_ID: project_office_ID,
            month: month,
            detail: detail,
            total_qty: String(total_qty), // Using the calculated total_qty
            qty: qty,
            remark: remark == undefined ? "" : remark, // Corrected to use remark instead of total_qty
          },
        });
      }

      const updateTotalQty = await prisma.office_actual.updateMany({
        where: {
          project_office_ID: project_office_ID,
          month: month
        },
        data: {
          total_qty: String(total_qty)
        }
      });
    }

    // Example usage:
    createOfficeMasterRecords(actual, project_office_ID, month, total_qty)
      .then(() => {
        res.json({
          status: true,
          message: "เพิ่มข้อมูลสำเร็จ",
        });
      })
      .catch(error => {
        console.error('Error creating records:', error);
        res.json({
          status: false,
          message: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล",
        });
      });



  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: error.message,
    });


  }
}

const getActualByMonth = async (req, res) => {
  try {
    const { project_office_ID, month } = req.params


    const getProject = await prisma.office_actual.findMany({
      where: {
        month: month,
        project_office_ID: project_office_ID
      },
    })
    const getName = await prisma.office_project.findMany()
    let dataArr = []
    getProject.map((data) => {
      getName.map((name) => {
        if (data.project_office_ID === name.project_office_ID) {
          dataArr.push({
            ...data,
            projectName: name.projectName
          })
        }
      })
    })
    //remove duplicate id
    dataArr = dataArr.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)

    // sort by id descending
    dataArr.sort((a, b) => a.id - b.id);
    res.json({
      status: true,
      message: "ดึงข้อมูลสำเร็จ2",
      data: dataArr,
      name: getName[0].projectName,

    })
  }
  catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: error.message,
    });
  }

}

const deleteActualOffice = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const getOldData = await prisma.office_actual.findUnique({
      where: {
        id: id
      }
    })
    let oladTotalQty = parseFloat(getOldData.total_qty)
    let newTotalQty = parseFloat(oladTotalQty) - parseFloat(getOldData.qty)
    const office_actual = await prisma.office_actual.delete({
      where: {
        id: id,
      },
    });


    const updateTotalQty = await prisma.office_actual.updateMany({
      where: {
        project_office_ID: getOldData.project_office_ID,
        month: getOldData.month
      },
      data: {
        total_qty: String(newTotalQty)
      }
    });
    if (office_actual && updateTotalQty) {
      res.json({
        status: true,
        message: "ลบข้อมูลสำเร็จ",
        data: office_actual,
      });
    } else {
      res.json({
        status: false,
        message: "ลบข้อมูลไม่สำเร็จ",
      });
    }

  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: error.message,
    });
  }

}
const edit_office_actual = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { detail, qty, remark } = req.body;
    const getProject = await prisma.office_actual.findUnique({
      where: {
        id: id
      }
    })

    const project_office_ID = getProject.project_office_ID

    const total_qty = String(parseFloat(getProject.total_qty) - parseFloat(getProject.qty) + parseFloat(qty));
    const office_actual = await prisma.office_actual.update({
      where: {
        id: id,
      },
      data: {
        project_office_ID: project_office_ID,
        detail: detail,
        total_qty: total_qty,
        qty: qty,
        remark: remark
      },
    });

    const updateTotalQty = await prisma.office_actual.updateMany({
      where: {
        project_office_ID: project_office_ID,
        month: getProject.month
      },
      data: {
        total_qty: total_qty
      }
    });
    if (office_actual && updateTotalQty) {
      res.json({
        status: true,
        message: "แก้ไขข้อมูลสำเร็จ",
        data: office_actual,
      });
    } else {
      res.json({
        status: false,
        message: "แก้ไขข้อมูลไม่สำเร็จ",
      });
    }

  } catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: error.message,
    });
  }
}



const getPDF_report = async (req, res) => {
  try {
    const { project_office_ID, month } = req.params

    const getMaster = await prisma.office_master.findMany({
      where: {
        project_office_ID: project_office_ID,
        month: month
      },
      orderBy: {
        id: 'asc'
      }
    });

    // Check if getMaster has at least one element before accessing it
    let totalQty = getMaster.length > 0 ? parseFloat(getMaster[0].total_qty) : 0;

    const getProject = await prisma.office_actual.findMany({
      where: {
        project_office_ID: project_office_ID,
        month: month,
      }
    });

    const getName = await prisma.office_project.findMany();

    let dataArr = getProject.reduce((acc, data) => {
      getName.forEach(name => {
        if (data.project_office_ID === name.project_office_ID) {
          const qty = parseFloat(data.qty);
          const remainingQty = totalQty - qty;
          acc.push({
            ...data,
            projectName: name.projectName,
            qty: qty.toLocaleString(),
            total_qty: totalQty.toLocaleString(),
            remain: remainingQty.toLocaleString()
          });
          // Update totalQty to the remaining quantity
          totalQty = remainingQty;
        }
      });
      return acc;
    }, []);

    //remove duplicate id
    dataArr = dataArr.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)

    // sort by id descending
    dataArr.sort((a, b) => a.id - b.id);

    // console.log(dataArr);


    let remainTotal = (parseFloat(getMaster[0].total_qty) - parseFloat(getProject[0].total_qty)).toLocaleString()

    //qty to localeString and total_qty to localeString
    getMaster.map((data) => {
      data.qty = parseFloat(data.qty).toLocaleString()
      data.total_qty = parseFloat(data.total_qty).toLocaleString()
    })


    res.json({
      status: true,
      message: "ดึงข้อมูลสำเร็จ",
      actual: dataArr,
      master: getMaster,
      remain: remainTotal

    })
  }
  catch (error) {
    console.log(error);
    res.json({
      status: false,
      message: error.message,
    });
  }

}
module.exports = {
  create_office_actual,
  getActualByMonth,
  deleteActualOffice,
  edit_office_actual,
  getPDF_report
};
