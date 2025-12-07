import { Request, Response } from "express";
import AppDataSource from "../AppDataSource";
import { Aluno } from "../entities/aluno";

const alunoRepository = AppDataSource.getRepository(Aluno);

// LIST ALUNOS
export const listarAlunos = async (req: Request, res: Response) => {
    const alunos = await alunoRepository.find();

    return res.json({
        status: "OK",
        data: alunos,
    });
};

// APROVAR IDENTIDADE
export const aprovarAluno = async (req: Request, res: Response) => {
    if (!req.params.id) {
        return res.json({
            status: "Erro",
            message: "id nao informado",
        });
    }

    let userId = parseInt(req.params.id);
    const aluno = await alunoRepository.findOne({ where: { id: userId } });

    if (aluno == null) {
        return res.json({
            status: "Erro",
            message: "Aluno nao existe",
        });
    }

    aluno.aprovado = true;

    const result = await alunoRepository.save(aluno);

    return res.json({
        status: "OK",
        data: result,
    });
};


// APROVAR IDENTIDADE
export const reprovarAluno = async (req: Request, res: Response) => {
    if (!req.params.id) {
        return res.json({
            status: "Erro",
            message: "id nao informado",
        });
    }

    let userId = parseInt(req.params.id);
    const aluno = await alunoRepository.findOne({ where: { id: userId } });

    if (aluno == null) {
        return res.json({
            status: "Erro",
            message: "Aluno nao existe",
        });
    }

    aluno.aprovado = false;

    const result = await alunoRepository.save(aluno);

    return res.json({
        status: "OK",
        data: result,
    });
};


// REMOVER IDENTIDADE
export const removerAluno = async (req: Request, res: Response) => {
    if (!req.params.id) {
        return res.json({
            status: "Erro",
            message: "id nao informado",
        });
    }

    const userId = parseInt(req.params.id);
    const result = await alunoRepository.delete(userId);

    return res.json({
        status: "OK",
        data: result,
    });
};
