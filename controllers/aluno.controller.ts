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
    newAluno.senha = hashedPassword;
    newAluno.cpf = userData.cpf;
    newAluno.telefone = userData.telefone;
    newAluno.cidade_distrito = userData.cidade_distrito;
    newAluno.endereco = userData.endereco;
    newAluno.instituicao = userData.instituicao;
    newAluno.curso = userData.curso;
    newAluno.ponto_embarque = userData.ponto_embarque;
    newAluno.declaracao_matricula = userData.declaracao_matricula;
    newAluno.foto_rosto = userData.foto_rosto;
    newAluno.turno = userData.turno;

    const result = await alunoRepository.save(newAluno);

    return res.json({
        status: "OK",
        data: result,
    });
};

// LOGAR
export const logarAluno = async (req: Request, res: Response) => {

    const cpf = req.body.cpf
    const password = req.body.senha

    // boolean
    const verificado = await verifyPasswordByCpf(cpf, password)

    if (verificado) {
        return res.json({
            status: "Ok",
            msg: "Usuário logado com sucesso."
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