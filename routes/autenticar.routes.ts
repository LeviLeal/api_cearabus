import { Router } from "express";
import {
  cadastrarAdmin,
  cadastrarAluno,
  logar,
} from "../controllers/autenticar.controller";

const router = Router();

router.post("/cadastrar_aluno", cadastrarAluno);
router.post("/cadastrar_admin", cadastrarAdmin);
router.post("/logar", logar);

export default router;
