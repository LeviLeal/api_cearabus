import { Request, Response } from "express";
import AppDataSource from "../AppDataSource";
import { Aluno } from "../entities/aluno";
import bcrypt, { hash } from "bcrypt"

const alunoRepository = AppDataSource.getRepository(Aluno);

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

// LOGAR
export const logarAluno = async (req: Request, res: Response) => {

    const userCpf = req.body.cpf
    const password = req.body.senha

    // boolean
    const verificado = await verifyPasswordByCpf(userCpf, password)

    const aluno = await alunoRepository.findOne({ where: { cpf: userCpf } });

    if (aluno)
        aluno.senha = ""
    
    if (verificado) {
        return res.json({
            status: "Ok",
            msg: "Usuário logado com sucesso.",
            aluno: aluno
        });
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
    const hashedPassword = aluno?.senha

    if (!hashedPassword)
        return false;

    const isPasswordMatch = await bcrypt.compare(password, hashedPassword)

    console.log(isPasswordMatch)

    return isPasswordMatch
}