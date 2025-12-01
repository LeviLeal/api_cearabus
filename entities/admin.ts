import { PrimaryColumn, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ type: "varchar", length: 255 })
    nome: string
    @Column({ type: "varchar", length: 255 })
    cpf: string
    @Column({ type: "varchar", length: 255 })
    senha: string
}