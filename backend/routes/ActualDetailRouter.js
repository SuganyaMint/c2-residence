const express = require("express");
const router = express.Router();

const {
    getActualDetail,
    getActualDetailById,
    createActualDetail,
    updateActualDetail,
    deleteActualDetail,
    getSummaryAcualCost
} = require("../controllers/ActualDetailController");

router.post("/", createActualDetail);
router.get("/", getActualDetail);
router.get("/:id", getActualDetailById);
router.delete("/:id", deleteActualDetail);
router.put("/:id", updateActualDetail);
router.get("/summary/cost", getSummaryAcualCost);

module.exports = router;
