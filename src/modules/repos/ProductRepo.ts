import { EntityRepository, Repository } from "typeorm";
import { Product } from "../../entity/Product";

interface ProductType extends Partial<Product> {
  ownerId: number;
}

@EntityRepository(Product)
export class ProductRepo extends Repository<Product> {
  async createAndPopulate({ name, ownerId }: ProductType): Promise<Product | null> {
    const { id } = await Product.create({ name, owner: { id: ownerId } }).save();
    const product = await Product.findOne(id, { relations: ["owner"] });

    return product || null;
  }
}
