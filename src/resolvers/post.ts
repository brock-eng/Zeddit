import { Post } from "src/entitites/Post";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts() {
        return "dog fart"
    }
}