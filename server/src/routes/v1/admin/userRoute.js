import { Router } from "express";
const router = Router();

import {
  userReturn,
  loginAdmin,
} from "../../../controllers/admin/userController.js";

router.get("/", userReturn);
router.post("/login", loginAdmin);

export default router;
