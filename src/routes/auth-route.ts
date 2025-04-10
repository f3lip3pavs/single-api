import { Router } from "express";
import { Auth } from "../controllers/auth-constroller";

const router: Router = Router();

router.post("/", Auth.login);

export default router;