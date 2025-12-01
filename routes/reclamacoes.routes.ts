import { Router } from "express";
import {
  listarReclamacoes, criarReclamacao,
  removerReclamacao
} from "../controllers/reclamacao.controller";

const router = Router();

router.get("/listar/", listarReclamacoes);
router.post("/criar/", criarReclamacao);
router.delete("/remover/:id", removerReclamacao);

export default router;
