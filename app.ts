import "reflect-metadata";
import express, { Request, Response } from "express"
import cors from 'cors'
import AppDataSource from "./AppDataSource"
import { Aluno } from "./entities/aluno"

import AlunoRoutes from "./routes/alunos.routes"
import AdminRoutes from "./routes/admin.routes"

const app = express()

app.use(express.json())
app.use(cors())

AppDataSource.initialize().then(() => {
    const alunoRepository = AppDataSource.getRepository(Aluno)


    // CREATE ALUNO
    app.listen(3000, () => {
        console.log("Server rodando")

        app.get("/", (req: Request, res: Response) => {
            return res.json({
                status: "OK",
            });
        })

        app.use("/aluno/", AlunoRoutes)
        app.use("/admin/", AdminRoutes)


    })
}).catch((error) => {
    console.log(error)
})


