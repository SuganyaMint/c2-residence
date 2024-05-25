const express = require("express");
const router = express.Router();

const {
    getActualDetail,
    getActualDetailById,
    createActualDetail,
    updateActualDetail,
    deleteActualDetail,
    getSummaryAcualCost,
    getSummaryAcualCostByYear,
    getSummaryAcualCostByYearByStatus
} = require("../controllers/ActualDetailController");

router.post("/", createActualDetail);
router.get("/", getActualDetail);
router.get("/:id", getActualDetailById);
router.delete("/:id", deleteActualDetail);
router.put("/:id", updateActualDetail);
router.get("/summary/cost", getSummaryAcualCost);
router.get("/summary/cost/:year", getSummaryAcualCostByYear);
router.get("/summary/cost/:year/:status", getSummaryAcualCostByYearByStatus);


module.exports = router;
