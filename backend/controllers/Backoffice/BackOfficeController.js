const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const moment = require("moment");

const createProject = async (req, res) => {
    try {
        const createProject = await prisma.office_project.create({
            data: {
                project_office_ID: "PRO-" + moment().format("YYYYMMDDHHmmss"),
                projectName: req.body.projectName,
            }
        });
        res.json({
            status: true,
            message: "เพิ่มโครงการสำเร็จ",
            data: createProject,
        });

    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: error.message,
        });
    }
}

const get_office_project = async (req, res) => {
    const office_project = await prisma.office_project.findMany();
    res.json({
        status: true,
        message: "ดึงข้อมูลสำเร็จ",
        data: office_project
    });
    try {

    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: error.message,
        });
    }


}

const edit_office_project = async (req, res) => {
    try {
        const { project_office_ID } = req.params;
        const { projectName } = req.body;
        const office_project = await prisma.office_project.update({
            where: {
                project_office_ID: project_office_ID,
            },
            data: {
                projectName: projectName,
            },
        });
        if (office_project) {
            res.json({
                status: true,
                message: "แก้ไขข้อมูลสำเร็จ",
                data: office_project,
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

const get_office_master = async (req, res) => {
    const office_master = await prisma.office_master.findMany();
    res.json({
        status: true,
        message: "ดึงข้อมูลสำเร็จ",
        data: office_master
    });
    try {

    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: error.message,
        });
    }

}

const get_office_master_by_id = async (req, res) => {
    try {
        const { project_office_ID } = req.params;
        const office_master = await prisma.office_master.findUnique({
            where: {
                project_office_ID: project_office_ID,
            },
        });
        res.json({
            status: true,
            message: "ดึงข้อมูลสำเร็จ",
            data: office_master
        });

    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: error.message,
        });
    }
}

const create_office_master = async (req, res) => {
    try {
        const { month, master, project_office_ID } = req.body;

        let total_qty = master.reduce((acc, item) => {
            return acc + parseFloat(item.qty);
        }, 0);
        const getProject = await prisma.office_master.findMany({
            where: {
                project_office_ID: project_office_ID,
                month: month
            }
        })
        total_qty = total_qty + parseFloat(getProject[0].total_qty);


        async function createOfficeMasterRecords(master, project_office_ID, month) {
            for (const item of master) {
                const { detail, qty, remark } = item;
                console.log(item);
                await prisma.office_master.create({
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

            const updateTotalQty = await prisma.office_master.updateMany({
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
        createOfficeMasterRecords(master, project_office_ID, month)
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
        {
            console.log(error);
            res.json({
                status: false,
                message: error.message,
            });
        }
    }
}

const edit_office_master = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { detail, qty, remark } = req.body;
        const getProject = await prisma.office_master.findUnique({
            where: {
                id: id
            }
        })

        const project_office_ID = getProject.project_office_ID

        const total_qty = String(parseFloat(getProject.total_qty) - parseFloat(getProject.qty) + parseFloat(qty));
        const office_master = await prisma.office_master.update({
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

        const updateTotalQty = await prisma.office_master.updateMany({
            where: {
                project_office_ID: project_office_ID,
                month: getProject.month
            },
            data: {
                total_qty: total_qty
            }
        });
        if (office_master && updateTotalQty) {
            res.json({
                status: true,
                message: "แก้ไขข้อมูลสำเร็จ",
                data: office_master,
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

const delete_office_master = async (req, res) => {
    try {
        const { project_office_ID } = req.params;
        const office_master = await prisma.office_master.delete({
            where: {
                project_office_ID: project_office_ID,
            },
        });

        const office_actual = await prisma.office_actual.deleteMany({
            where: {
                project_office_ID: project_office_ID,
            },
        });
        if (office_master && office_actual) {
            res.json({
                status: true,
                message: "ลบข้อมูลสำเร็จ",
                data: office_master,
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

const getDetailProjectByID = async (req, res) => {
    try {
        const project_office_ID = req.params.project_office_ID
        const getProject = await prisma.office_master.findMany({
            where: {
                project_office_ID: project_office_ID
            },
        })

        const getNames = await prisma.office_project.findUnique({
            where: {
                project_office_ID: project_office_ID
            }
        })
        let dataArr = []
        getProject.map((data) => {

            dataArr.push({
                ...data,
                projectName: getNames.projectName
            })

        })

        //remove duplicate by month
        const data = dataArr.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.month === thing.month
            ))
        )
        data.sort((a, b) => b.id - a.id);


        res.json({
            status: true,
            message: "ดึงข้อมูลสำเร็จ",
            data: data,
            name: getNames.projectName
        })



    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: error.message,
        });
    }
}

const getDetailProjectByMonth = async (req, res) => {
    try {
        const {project_office_ID , month} = req.params

        const getProject = await prisma.office_master.findMany({
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

        // sort by id descending
        dataArr.sort((a, b) => b.id - a.id);
        res.json({
            status: true,
            message: "ดึงข้อมูลสำเร็จ",
            data: dataArr
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

const deleteDetailProgect = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const getOldData = await prisma.office_master.findUnique({
            where: {
                id: id
            }
        })
        let oladTotalQty = parseFloat(getOldData.total_qty)
        let newTotalQty = parseFloat(oladTotalQty) - parseFloat(getOldData.qty)
        const office_master = await prisma.office_master.delete({
            where: {
                id: id,
            },
        });


        const updateTotalQty = await prisma.office_master.updateMany({
            where: {
                project_office_ID: getOldData.project_office_ID,
                month: getOldData.month
            },
            data: {
                total_qty: String(newTotalQty)
            }
        });
        if (office_master && updateTotalQty) {
            res.json({
                status: true,
                message: "ลบข้อมูลสำเร็จ",
                data: office_master,
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

const addmonthByID = async (req, res) => {
    try {
        const { month , project_office_ID } = req.body;
        const getProject = await prisma.office_master.findMany({
            where: {
                project_office_ID: project_office_ID,
                month: month
            }
        })

        if (getProject.length > 0) {
            res.json({
                status: false,
                message: "มีข้อมูลเดือนนี้อยู่แล้ว",
            });
        } else {
            const addMonth = await prisma.office_master.create({
                data: {
                    project_office_ID: project_office_ID,
                    month: month,
                    detail: "เบ็ดเตล็ด",
                    total_qty: "0",
                    qty: "0",
                    remark: ""
                }
            })
            res.json({
                status: true,
                message: "เพิ่มข้อมูลสำเร็จ",
                data: addMonth
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
module.exports = {
    get_office_master,
    get_office_master_by_id,
    create_office_master,
    edit_office_master,
    delete_office_master,
    createProject,
    get_office_project,
    edit_office_project,
    getDetailProjectByID,
    getDetailProjectByMonth,
    deleteDetailProgect,
    addmonthByID

}