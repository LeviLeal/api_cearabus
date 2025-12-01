import { Request, Response } from "express";
import AppDataSource from "../AppDataSource";
import bcrypt, { hash } from "bcrypt"
import { Reclamacao } from "../entities/reclamacao";

const reclamacaoRepository = AppDataSource.getRepository(Reclamacao);

// LIST RECLAMACOES
export const listarReclamacoes = async (req: Request, res: Response) => {
    const reclamacoes = await reclamacaoRepository.find();
    return res.json({
        status: "OK",
        data: reclamacoes
    });
};

// CREATE RECLAMACAO
export const criarReclamacao = async (req: Request, res: Response) => {
    const newReclamacao = new Reclamacao();

    newReclamacao.mensagem = req.body.mensagem
    newReclamacao.telefone = req.body.telefone

    const result = await reclamacaoRepository.save(newReclamacao);


    return res.json({
        status: "OK",
        data: result,
    });
};

// REMOVER RECLAMACAO
export const removerReclamacao = async (req: Request, res: Response) => {
    if (!req.params.id) {
        return res.json({
            status: "Erro",
            message: "id nao informado",
        });
    }

    const reclamacaoId = parseInt(req.params.id);
    const result = await reclamacaoRepository.delete(reclamacaoId);

    return res.json({
        status: "OK",
        data: result,
    });
};
