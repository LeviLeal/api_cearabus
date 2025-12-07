import { Router } from "express";
import {
  listarAlunos,
  aprovarAluno,
  removerAluno,
  reprovarAluno,
} from "../controllers/admin.controller";

const router = Router();

router.get("/listar_alunos/", listarAlunos);
router.patch("/aprovar/:id", aprovarAluno);
router.patch("/reprovar/:id", reprovarAluno);
router.delete("/remover/:id", removerAluno);

export default router;
