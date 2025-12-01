import { Request, Response } from "express";
import AppDataSource from "../AppDataSource";
import bcrypt, { hash } from "bcrypt"
import { Curso } from "../entities/curso";

const cursoRepository = AppDataSource.getRepository(Curso);

// LIST CURSO
export const listarCursos = async (req: Request, res: Response) => {
    const cursos = await cursoRepository.find();

    return res.json({
        status: "OK",
        data: cursos
    });
};

// CREATE CURSO
export const criarCurso = async (req: Request, res: Response) => {
    const cursoNome = req.body.nome;
    const newCurso = new Curso();

    newCurso.nome = cursoNome

    const result = await cursoRepository.save(newCurso);

    return res.json({
        status: "OK",
        data: result,
    });
};
