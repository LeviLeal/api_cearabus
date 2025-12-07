import "reflect-metadata";
import express, { Request, Response } from "express"
import cors from 'cors'
import AppDataSource from "./AppDataSource"

import AutenticarRoutes from "./routes/autenticar.routes"
import AdminRoutes from "./routes/admin.routes"
import CursoRoutes from "./routes/cursos.routes"
import AvisoRoutes from "./routes/avisos.routes"
import ReclamacaoRoutes from "./routes/reclamacoes.routes"
import RotaRoutes from "./routes/rotas.routes"

const app = express()

app.use(express.json())
app.use(cors())

AppDataSource.initialize().then(() => {

    // CREATE ALUNO
    app.listen(3000, () => {
        console.log("Server rodando")

        app.get("/", (req: Request, res: Response) => {
            return res.json({
                status: "OK",
            });
        })

        app.use("/autenticar/", AutenticarRoutes)
        app.use("/admin/", AdminRoutes)
        app.use("/curso/", CursoRoutes)
        app.use("/aviso/", AvisoRoutes)
        app.use("/reclamacao/", ReclamacaoRoutes)
        app.use("/rota/", RotaRoutes)

    })
}).catch((error) => {
    console.log(error)
})


