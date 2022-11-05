import { Router } from "express";
import passport from "passport";
import transacrionRoute from "./transactionApi.js";
import authRoute from "./authApi.js";
import userRoute from "./userApi.js";
import categoryRoute from "./categoryApi.js";

const router = Router();

const auth = passport.authenticate("jwt", { session: false });

router.use("/transaction", auth, transacrionRoute);
router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/category", auth, categoryRoute);

export default router;
