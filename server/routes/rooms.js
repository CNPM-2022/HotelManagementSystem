import express from "express";

const router = express.Router();

import {
  getAllRooms,
  getRoomsById,
  roomById,
} from "../controllers/RoomsController.js";

router.get("/allrooms", getAllRooms);
router.get("/:id", getRoomsById);
router.post("/roombyid", roomById);

export default router;
