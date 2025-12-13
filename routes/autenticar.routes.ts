import { Router } from "express";
import { upload } from "../config/multer";
import { cadastrarAluno, cadastrarAdmin, logar } from "../controllers/autenticar.controller";

const router = Router();

router.post(
  "/cadastrar_aluno",
  upload.fields([
    { name: "declaracaoMatricula", maxCount: 1 },
    { name: "comprovanteResidencia", maxCount: 1 },
  ]),
  cadastrarAluno
);
router.post("/cadastrar_admin", cadastrarAdmin);
router.post("/logar", logar);
export default router;
