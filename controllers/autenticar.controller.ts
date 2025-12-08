import { Request, Response } from "express";
import AppDataSource from "../AppDataSource";
import { Aluno } from "../entities/aluno";
import { Admin } from "../entities/admin";
import bcrypt from "bcrypt";

const alunoRepository = AppDataSource.getRepository(Aluno);
const adminRepository = AppDataSource.getRepository(Admin);

// CREATE ALUNO
export const cadastrarAluno = async (req: Request, res: Response) => {
    const userData = req.body;

    // arquivos recebidos do multer
    const files = req.files as {
        declaracaoMatricula?: Express.Multer.File[];
        comprovanteResidencia?: Express.Multer.File[];
    };

    const newAluno = new Aluno();

    const hashedPassword = await createHashPassword(userData.senha);

    newAluno.nome = userData.nome;
    newAluno.cpf = userData.cpf;
    newAluno.telefone = userData.telefone;
    newAluno.curso = userData.curso;
    newAluno.instituicao = userData.universidade;
    newAluno.numero_matricula = userData.numeroMatricula;
    newAluno.senha = hashedPassword;
    newAluno.turno = userData.turno;
    newAluno.ponto_embarque = userData.pontoEmbarque;

    // arquivos reais
    newAluno.declaracao_matricula =
        files?.declaracaoMatricula?.[0]?.path || "none";

    newAluno.comprovante_residencia =
        files?.comprovanteResidencia?.[0]?.path || "none";

    const result = await alunoRepository.save(newAluno);

    return res.json({
        status: "OK",
        data: result,
    });
};

// CREATE ADMIN
export const cadastrarAdmin = async (req: Request, res: Response) => {
    const userData = req.body;
    const newAdmin = new Admin();

    const hashedPassword = await createHashPassword(userData.senha);

    newAdmin.cpf = userData.cpf;
    newAdmin.senha = hashedPassword;
    newAdmin.nome = userData.nome;

    const result = await adminRepository.save(newAdmin);

    return res.json({
        status: "OK",
        data: result,
    });
};

// LOGAR
export const logar = async (req: Request, res: Response) => {
    const userCpf = req.body.cpf;
    const password = req.body.senha;

    const verificado = await verifyPasswordByCpf(userCpf, password);

    if (verificado.sucesso) {
        if (verificado.tipoUsuario == "estudante") {
            const aluno = await alunoRepository.findOne({ where: { cpf: userCpf } });
            if (aluno) aluno.senha = "";

            return res.json({
                status: "Ok",
                msg: "Usuário logado com sucesso.",
                user_data: aluno,
                tipo_user: "estudante",
            });
        } else if (verificado.tipoUsuario == "admin") {
            const admin = await adminRepository.findOne({ where: { cpf: userCpf } });
            if (admin) admin.senha = "";

            return res.json({
                status: "Ok",
                msg: "Usuário logado com sucesso.",
                user_data: admin,
                tipo_user: "admin",
            });
        }
    } else {
        return res.json({
            status: "Error",
            msg: "Erro de autenticação. Usuário ou senha errados.",
        });
    }
};

const createHashPassword = async (password: string) => {
    const saltHounds = 10;
    return await bcrypt.hash(password, saltHounds);
};

const verifyPasswordByCpf = async (userCpf: string, password: string) => {
    const aluno = await alunoRepository.findOne({ where: { cpf: userCpf } });

    if (aluno != null) {
        const hashedAlunoPassword = aluno?.senha;
        if (!hashedAlunoPassword) return { sucesso: false };

        const isPasswordMatch = await bcrypt.compare(password, hashedAlunoPassword);

        if (isPasswordMatch)
            return { sucesso: true, tipoUsuario: "estudante" };
        else return { sucesso: false };
    } else {
        const admin = await adminRepository.findOne({ where: { cpf: userCpf } });

        if (admin != null) {
            const hashedAdminPassword = admin?.senha;
            if (!hashedAdminPassword) return { sucesso: false };

            const isPasswordMatch = await bcrypt.compare(password, hashedAdminPassword);

            if (isPasswordMatch)
                return { sucesso: true, tipoUsuario: "admin" };
            else return { sucesso: false };
        } else {
            return { sucesso: false };
        }
    }
};
