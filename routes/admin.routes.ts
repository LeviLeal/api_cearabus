import { Router } from "express";
import {
  listarAlunos,
  aprovarAluno,
  removerAluno,
} from "../controllers/admin.controller";

const router = Router();

router.get("/", listarAlunos);
router.patch("/aprovar/:id", aprovarAluno);
router.delete("/remover/:id", removerAluno);

export default router;
