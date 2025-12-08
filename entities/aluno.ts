import { PrimaryColumn, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Aluno {
    @PrimaryGeneratedColumn()
    id: number
    @Column({ type: "varchar", length: 255 })
    nome: string
    @Column({ type: "varchar", length: 255 })
    senha: string
    @Column({ type: "varchar", length: 255 })
    cpf: string
    @Column({ type: "varchar", length: 255 })
    telefone: string
    @Column({ type: "varchar", length: 255 })
    instituicao: string
    @Column({ type: "varchar", length: 255 })
    curso: string
    @Column({ type: "varchar", length: 255 })
    ponto_embarque: string
    @Column({ type: "varchar", length: 255 })
    numero_matricula: string
    @Column({ type: "varchar", length: 255 })
    declaracao_matricula: string
    @Column({ type: "varchar", length: 255 })
    foto_rosto: string
    @Column({ type: "varchar", length: 255 })
    turno: string
    @Column({ type: "varchar", length: 255 })
    comprovante_residencia: string
    @Column({ type: "boolean"})
    aprovado: boolean = false
}