import { Query, Resolver } from "type-graphql";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  async helloWorldxd() {
    return "Hello World";
  }
}
