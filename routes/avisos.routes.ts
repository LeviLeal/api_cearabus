import { Router } from "express";
import {
  listarAvisos, criarAviso, removerAviso
} from "../controllers/aviso.controller";

const router = Router();

router.get("/listar/", listarAvisos);
router.post("/criar/", criarAviso);
router.delete("/remover/:id", removerAviso);

export default router;
