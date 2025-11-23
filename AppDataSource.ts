import { DataSource } from "typeorm"
import { Aluno } from "./entities/aluno"

const AppDataSource = new DataSource({
    type: "mariadb",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "cearabus",
    synchronize: true,
    logging: true,
    entities: [Aluno],
    subscribers: [],
    migrations: []
})

export default AppDataSource