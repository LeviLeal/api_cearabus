import { Request, Response } from "express";
import AppDataSource from "../AppDataSource";
import { Aluno } from "../entities/aluno";
import { Admin } from "../entities/admin";
import bcrypt, { hash } from "bcrypt"

const alunoRepository = AppDataSource.getRepository(Aluno);
const adminRepository = AppDataSource.getRepository(Admin);

// CREATE ALUNO
export const cadastrarAluno = async (req: Request, res: Response) => {
    const userData = req.body;
    const newAluno = new Aluno();

    const hashedPassword = await createHashPassword(userData.senha)

    newAluno.nome = userData.nome;
    newAluno.curso = userData.curso;
    newAluno.cpf = userData.cpf;
    newAluno.instituicao = userData.universidade;
    newAluno.senha = hashedPassword;
    newAluno.turno = userData.turno;
    newAluno.ponto_embarque = "none";
    newAluno.declaracao_matricula = "none";
    newAluno.foto_rosto = "none";

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

    const hashedPassword = await createHashPassword(userData.senha)

    newAdmin.cpf = userData.cpf;
    newAdmin.senha = hashedPassword;
    newAdmin.nome = userData.nome

    const result = await adminRepository.save(newAdmin);

    return res.json({
        status: "OK",
        data: result,
    });
};

// LOGAR
export const logar = async (req: Request, res: Response) => {

    const userCpf = req.body.cpf
    const password = req.body.senha

    // boolean
    const verificado = await verifyPasswordByCpf(userCpf, password)

    
    if (verificado.sucesso) {
        if (verificado.tipoUsuario == "estudante") {
            const aluno = await alunoRepository.findOne({ where: { cpf: userCpf } });
            if (aluno)
                aluno.senha = ""
            return res.json({
                status: "Ok",
                msg: "Usuário logado com sucesso.",
                user_data: aluno,
                tipo_user: "estudante"
            });
        } else if (verificado.tipoUsuario == "admin") {
            const admin = await alunoRepository.findOne({ where: { cpf: userCpf } });
            if (admin)
                admin.senha = ""
            return res.json({
                status: "Ok",
                msg: "Usuário logado com sucesso.",
                user_data: admin,
                tipo_user: "admin"
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
    const saltHounds = 10
    const hashedPassword = await bcrypt.hash(password, saltHounds)
    return hashedPassword
}


const verifyPasswordByCpf = async (userCpf: string, password: string) => {

    const aluno = await alunoRepository.findOne({ where: { cpf: userCpf } });

    // Se não achar nenhum usuario com esse cpf 
    if (aluno != null) {
        const hashedAlunoPassword = aluno?.senha
        if (!hashedAlunoPassword)
            return { sucesso: false }
        const isPasswordMatch = await bcrypt.compare(password, hashedAlunoPassword)

        if (isPasswordMatch)
            return { sucesso: true, tipoUsuario: "estudante" }
        else
            return { sucesso: false }
    } else {
        const admin = await adminRepository.findOne({ where: { cpf: userCpf } });
        if (admin != null) {
            const hashedAdminPassword = admin?.senha
            if (!hashedAdminPassword)
                return { sucesso: false }
            const isPasswordMatch = await bcrypt.compare(password, hashedAdminPassword)

            if (isPasswordMatch)
                return { sucesso: true, tipoUsuario: "admin" }
            else
                return { sucesso: false }
        } else {
            return { sucesso: false }
        }
    }

}