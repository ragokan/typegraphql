import { Arg, Mutation, Resolver } from "type-graphql";
import { ProductInput } from "../../validation/ProductValidation";
import { Product } from "../../entity/Product";

@Resolver()
export class CreateProductResolver {
  @Mutation(() => Product, { nullable: true })
  async createProduct(
    @Arg("data") { name, owner }: ProductInput
  ): Promise<Product | null> {
    const { id } = await Product.create({ name, owner: { id: owner } }).save();
    const product = await Product.findOne(id, { relations: ["owner"] });

    return product || null;
  }
}
