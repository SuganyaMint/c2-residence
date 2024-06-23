const express = require("express");
const router = express.Router();

const BackOfficeActualController = require("../../controllers/Backoffice/BackOfficeActual.Controller");

router.post("/", BackOfficeActualController.create_office_actual);
router.get("/:project_office_ID/:month", BackOfficeActualController.getActualByMonth);
router.delete("/:id", BackOfficeActualController.deleteActualOffice);
router.put("/:id", BackOfficeActualController.edit_office_actual);

router.get("/report/:project_office_ID/:month", BackOfficeActualController.getPDF_report);


//
module.exports = router;

