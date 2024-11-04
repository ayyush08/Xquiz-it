import { Router } from "express";
import { getUserQuestions,addQuestion } from "../controllers/questions.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();


router.use(verifyJWT)
router.route('/add').post(addQuestion)
router.route('/get-questions').get(getUserQuestions);

export default router
