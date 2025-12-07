import { PrimaryColumn, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rota {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ type: "varchar", length: 255 })
    destinos: string
    @Column({ type: "varchar", length: 255 })
    horario: string
    @Column({ type: "varchar", length: 255 })
    instituicoes: string
    @Column({ type: "varchar", length: 255 })
    tipo_partida: string
}