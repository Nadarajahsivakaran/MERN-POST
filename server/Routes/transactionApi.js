import { Router } from "express";
import {
  index,
  create,
  drop,
  update,
} from "../Controllers/transactionController.js";

const router = Router();

router.get("/", index);
router.post("/", create);
router.delete("/:id", drop);
router.patch("/:id", update);

export default router;
