import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ) { }

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations: {
                Categoria: true
            }
        });
    }

    async findById(id: number): Promise<Produto> {

        let produto = await this.produtoRepository.findOne({
            where: {
                id
            },
            relations: {
                Categoria: true
            }
        });

        if (!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);

        return produto;
    }

    async findAllByDescricao(descricao: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`)
            },
            relations: {
                Categoria: true
            }
        })
    }

    async create(Produto: Produto): Promise<Produto> {
        return await this.produtoRepository.save(Produto);
    }

    async update(produto: Produto): Promise<Produto> {

        await this.findById(produto.id);

        return await this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id);

        return await this.produtoRepository.delete(id);

    }

}