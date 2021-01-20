import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { ProductInput } from "../../validation/ProductValidation";
import { Product } from "../../entity/Product";

@Resolver()
export class GetProductResolver {
  @Query(() => Product, { nullable: true })
  async getProduct(@Arg("id") id: number): Promise<Product | null> {
    try {
      const product = await Product.findOne(id, { relations: ["owner"] });
      if (!product) return null;

      return product;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
