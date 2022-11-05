import { Router } from "express";
import { destroy, create } from "../Controllers/categoryController.js";
const router = Router();

router.delete("/:id", destroy);
router.post("/", create);

export default router;
