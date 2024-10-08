import { Router } from "express";
const router = Router();

import {
  detailsUser,
  createUser,
  loginUser,
  deleteUser,
} from "../../controllers/userController.js";

router.get("/details", detailsUser);
router.post("/register", createUser);
router.post("/login", loginUser);
router.delete("/delete", deleteUser);

export default router;
