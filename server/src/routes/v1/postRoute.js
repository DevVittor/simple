import { Router } from "express";

const router = Router();

import {
  listPost,
  createPost,
  deletePost,
} from "../../controllers/postController.js";

router.get("/list", listPost);
router.post("/create", createPost);
router.post("/delete", deletePost);

export default router;
