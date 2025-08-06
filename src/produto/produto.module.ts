import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Produto } from "../produto/entities/produto.entity";
import { ProdutoController } from "./controllers/produto.controller";
import { ProdutoService } from "./services/produto.service";

@Module({
    imports: [TypeOrmModule.forFeature([Produto])],
    providers: [ProdutoService],
    controllers: [ProdutoController],
    exports: [ProdutoService]
})
export class ProdutoModule {}