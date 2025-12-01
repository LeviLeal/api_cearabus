import { Router } from "express";
import {
  listarCursos, criarCurso
} from "../controllers/curso.controller";

const router = Router();

router.get("/listar/", listarCursos);
router.post("/criar/", criarCurso);

export default router;
