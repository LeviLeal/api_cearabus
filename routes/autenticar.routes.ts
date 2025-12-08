import { Router } from "express";
import multer from "multer";
import {
  cadastrarAdmin,
  cadastrarAluno,
  logar,
} from "../controllers/autenticar.controller";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 999999);
    cb(null, unique + "-" + file.originalname);
  },
});

const upload = multer({ storage });

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
