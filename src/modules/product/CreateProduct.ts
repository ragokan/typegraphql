import { Arg, Mutation, Resolver } from "type-graphql";
import { ProductInput } from "../../validation/ProductValidation";
import { Product } from "../../entity/Product";
import { getCustomRepository } from "typeorm";
import { ProductRepo } from "../repos/ProductRepo";

@Resolver()
export class CreateProductResolver {
  @Mutation(() => Product, { nullable: true })
  async createProduct(
    @Arg("data") { name, owner }: ProductInput
  ): Promise<Product | null> {
    const productRepo = getCustomRepository(ProductRepo);
    const product = await productRepo.createAndPopulate({ name, ownerId: owner });

    return product || null;
  }
}
