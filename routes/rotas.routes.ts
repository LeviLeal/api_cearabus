import { Router } from "express";
import {
  listarRotas,
  criarRota,
  removerRota,
} from "../controllers/rota.controller";

const router = Router();

router.get("/listar/", listarRotas);
router.post("/criar/", criarRota);
router.delete("/remover/:id", removerRota);

export default router;
