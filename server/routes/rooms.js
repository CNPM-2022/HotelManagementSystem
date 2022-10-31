import express from "express";

const router = express.Router();

import { getAllRooms, getRoomsById } from "../controllers/RoomsController.js";

router.get("/allrooms", getAllRooms);
router.get("/:id", getRoomsById);

export default router;
