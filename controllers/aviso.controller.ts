import { Request, Response } from "express";
import AppDataSource from "../AppDataSource";
import bcrypt, { hash } from "bcrypt"
import { Aviso } from "../entities/aviso";

const avisoRepository = AppDataSource.getRepository(Aviso);

// LIST CURSO
export const listarAvisos = async (req: Request, res: Response) => {
    const cursos = await avisoRepository.find();

    return res.json({
        status: "OK",
        data: cursos
    });
};

// CREATE CURSO
export const criarAviso = async (req: Request, res: Response) => {
    const newAviso = new Aviso();

    newAviso.titulo = req.body.titulo;
    newAviso.mensagem = req.body.mensagem;

    const result = await avisoRepository.save(newAviso);

    return res.json({
        status: "OK",
        data: result,
    });
};


// REMOVER AVISO
export const removerAviso = async (req: Request, res: Response) => {
    if (!req.params.id) {
        return res.json({
            status: "Erro",
            message: "id nao informado",
        });
    }

    const avisoId = parseInt(req.params.id);
    const result = await avisoRepository.delete(avisoId);

    return res.json({
        status: "OK",
        data: result,
    });
};

