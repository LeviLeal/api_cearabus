import { Request, Response } from "express";
import AppDataSource from "../AppDataSource";
import { Rota } from "../entities/rota";

const rotaRepository = AppDataSource.getRepository(Rota);

// LISTAR ROTAS
export const listarRotas = async (req: Request, res: Response) => {

    const rotas = await rotaRepository.find();

    return res.json({
        status: "OK",
        data: rotas
    });
};

// CRIAR ROTA
export const criarRota = async (req: Request, res: Response) => {
    const newRota = new Rota();

    newRota.nome = req.body.nome;
    newRota.horario = req.body.horario;
    newRota.destinos = req.body.destinos;
    newRota.instituicoes = req.body.instituicoes;
    newRota.tipo_partida = req.body.tipoPartida;

    const result = await rotaRepository.save(newRota);

    return res.json({
        status: "OK",
        data: result,
    });
};


// REMOVER ROTA
export const removerRota = async (req: Request, res: Response) => {
    if (!req.params.id) {
        return res.json({
            status: "Erro",
            message: "id nao informado",
        });
    }

    const rotaId = parseInt(req.params.id);
    const result = await rotaRepository.delete(rotaId);

    return res.json({
        status: "OK",
        data: result,
    });
};

