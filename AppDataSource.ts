import { DataSource } from "typeorm"
import { Aluno } from "./entities/aluno"
import { Admin } from "./entities/admin"
import { Curso } from "./entities/curso"
import { Reclamacao } from "./entities/reclamacao"
import { Aviso } from "./entities/aviso"
import { Rota } from "./entities/rota"

const AppDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "cearabus",
    synchronize: true,
    logging: true,
    entities: [Aluno, Admin, Curso, Reclamacao, Aviso, Rota],
    subscribers: [],
    migrations: []
})

export default AppDataSource