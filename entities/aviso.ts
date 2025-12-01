import { PrimaryColumn, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Aviso {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ type: "varchar", length: 255 })
    titulo: string
    @Column({ type: "varchar", length: 255 })
    mensagem: string
}