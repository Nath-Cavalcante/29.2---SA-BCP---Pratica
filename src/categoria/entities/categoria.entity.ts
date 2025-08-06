import { IsNotEmpty } from "class-validator"
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { ProdutoModule } from "../../produto/produto.module"
import { Produto } from "../../produto/entities/produto.entity"


@Entity({name: "tb_categoria"})
export class Categoria {

    @PrimaryGeneratedColumn()    
    id: number

    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    genero: string

    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    estilo: string

    @ManyToOne(() => Produto, (produto) => produto.Categoria,{
        onDelete: "CASCADE"})
    Produto: Produto
    }