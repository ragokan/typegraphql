import { Post } from "../../entity/Post";
import { Resolver, Query } from "type-graphql";

@Resolver()
export class GetPostsResolver {
  @Query(() => [Post])
  async getPosts(): Promise<Post[]> {
    const posts = await Post.find();

    return posts;
  }
}
