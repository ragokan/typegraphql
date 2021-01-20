import { Resolver, Mutation, Arg, ClassType, UseMiddleware } from "type-graphql";
import { Middleware } from "type-graphql/dist/interfaces/Middleware";
import { User } from "../../entity/User";
import { RegisterInput } from "../../validation/RegisterValidation";

function createBaseResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  returnType: T,
  inputType: X,
  entity: any,
  middleware?: Middleware<any>[]
) {
  @Resolver()
  abstract class BaseResolver {
    @Mutation(() => returnType, { name: suffix })
    @UseMiddleware(...(middleware || []))
    async create(@Arg("data", () => inputType) data: typeof inputType) {
      return await entity.create().save();
    }
  }

  return BaseResolver;
}

export const CreateUserResolver = createBaseResolver(
  "createUser",
  User,
  RegisterInput,
  User
);

// import { Product } from "../../entity/Product";
// import { ProductInput } from "../../validation/ProductValidation";
// export const CreateProductResolver = createBaseResolver(
//   "createProduct",
//   Product,
//   ProductInput,
//   Product
// );
