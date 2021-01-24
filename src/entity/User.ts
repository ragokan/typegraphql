import { Field, ID, ObjectType, Root } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  name(@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`;
  }

  @Column()
  password: string;

  @Column("bool", { default: false })
  confirmed: boolean;

  // Utils

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}
