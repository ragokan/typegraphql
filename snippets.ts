// import { Movie } from "../entity/Movie";
// import { Arg, ID, Int, Mutation, Query, Resolver } from "type-graphql";
// import { MovieUpdateInput } from "../inputTypes";

// @Resolver()
// class MovieResolver {
//   @Query(() => [Movie])
//   async getMovies() {
//     return await Movie.find();
//   }

//   @Query(() => Movie)
//   async getOneMovie(@Arg("id", () => ID) id: number) {
//     const movie = await Movie.findOne({ where: { id } });
//     return movie;
//   }

//   @Mutation(() => Movie)
//   async createMovie(
//     @Arg("title", () => String) title: string,
//     @Arg("duration", () => Int) duration: number
//   ) {
//     const movie = await Movie.create({ title, duration }).save();
//     return movie;
//   }

//   @Mutation(() => Movie)
//   async updateMovie(
//     @Arg("id", () => ID) id: number,
//     @Arg("data", () => MovieUpdateInput) data: MovieUpdateInput
//   ) {
//     const movie = await Movie.createQueryBuilder()
//       .update()
//       .where(`id = ${id}`)
//       .set({ ...data })
//       .returning("*")
//       .execute()
//       .then((updates) => updates.raw[0]);

//     return movie;
//   }

//   @Mutation(() => Boolean)
//   async deleteMovie(@Arg("id", () => ID) id: number) {
//     await Movie.delete({ id });
//     return true;
//   }
// }

// export { MovieResolver };
