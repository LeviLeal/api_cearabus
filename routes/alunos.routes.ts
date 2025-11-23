import { Router } from "express";
import {
  cadastrarAluno,
  logarAluno,
} from "../controllers/aluno.controller";

const router = Router();

router.post("/cadastrar", cadastrarAluno);
router.post("/logar", logarAluno);

export default router;
