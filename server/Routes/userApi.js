import { Router } from "express";
import passport from "passport";
import { index } from "../Controllers/userController.js";
const router = Router();

router.get("/", passport.authenticate("jwt", { session: false }), index);

export default router;
