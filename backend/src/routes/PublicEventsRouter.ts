import { Router } from "express";
import { PublicEventsComponent } from "../components";

const router: Router = Router();

router.get("/", PublicEventsComponent.getAllEvents);

export default router;
