const express = require("express");
const router = express.Router();

const BackOfficeController = require("../../controllers/Backoffice/BackOfficeController");

router.get("/", BackOfficeController.get_office_master);
router.get("/:project_office_ID", BackOfficeController.get_office_master_by_id);

router.post("/", BackOfficeController.create_office_master);
router.put("/:id", BackOfficeController.edit_office_master);
router.delete("/:project_office_ID", BackOfficeController.delete_office_master);

router.post("/project", BackOfficeController.createProject);
router.get("/get/project", BackOfficeController.get_office_project);
router.put("/project/:project_office_ID", BackOfficeController.edit_office_project);

router.get("/get/detail/:project_office_ID", BackOfficeController.getDetailProjectByID);
router.get("/get/detail/month/:project_office_ID/:month", BackOfficeController.getDetailProjectByMonth);
router.delete("/detail/:id", BackOfficeController.deleteDetailProgect);

router.post("/month/master", BackOfficeController.addmonthByID);


//addmonthByID
module.exports = router;


