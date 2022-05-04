import { User } from "../entities/User";
import { MyContext } from "../types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import argon2 from 'argon2';
import { DebugInfo } from "src/constants";


@InputType()
class UsernamePasswordInput {
    @Field()
    username: string
    @Field()
    password: string
}

@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];

    @Field(() => User, {nullable: true})
    user?: User;
}

@Resolver()
export class UserResolver {
    @Query(() => User, {nullable: true})
    async me(
        @Ctx() {req, em} : MyContext
    ) {
        console.log(req.session)
        if (!req.session.userId){
            return null;
        }

        console.log(req.sessionID);
        console.log(req.session.userId);
        const user = await em.findOne(User, {id: req.session.userId})
        return user;
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() {em, req}: MyContext
    ) {
        if (options.username.length <= 2){
            return {
                    errors: [{
                        field: 'username',
                        message: 'username length must be greater than 2',
                    },
                ],
            };
        }
        if (options.password.length <= 5){
            return {
                    errors: [{
                        field: 'password',
                        message: 'password length must be greater than 2',
                    },
                ],
            };
        }

        const hashedPassword = await argon2.hash(options.password);
        const user = em.create(User, {
            username: options.username, 
            password: hashedPassword
        });
        try{
            await em.persistAndFlush(user);
        } catch (err) {
            if (err.code === "23505") {
                return {
                    errors: [{
                        field: 'username',
                        message: 'username has already been taken'
                    }]
                }
            }
        }
        // login
        req.session.userId = user.id;
        return {user};
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() {em, req}: MyContext
    ): Promise<UserResponse> {
        const foundUser = await em.findOne(User, {username: options.username});

        if (!foundUser){
            return {
                errors: [{
                    field: 'username',
                    message: "That username does not exist",
                 }]
            };
        }
        const valid = await argon2.verify(foundUser.password, options.password);
        if (!valid){
            return {
                errors: [{
                    field: 'password',
                    message: "Incorrect password",
                 }]
            };
        }

        req.session.userId = foundUser.id;

        return { 
            user: foundUser
        };
    }
}