import { Connection } from "typeorm";
import { callGraphql } from "../GraphqlCaller";
import { testConnection } from "../TestConnection";
import faker from "faker";
import { User } from "../../entity/User";

let conn: Connection;
beforeAll(async () => {
  conn = await testConnection();
});

afterAll(async () => {
  await conn.close();
});

describe("Get User", () => {
  it("get user", async () => {
    const user = await User.create({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      confirmed: true,
    }).save();

    const getUserQuery = `
    query GetUser{
        getUser {
          id
          email
          name
            firstName
          lastName
        }
      }
`;

    const response = await callGraphql({ source: getUserQuery, userId: user.id });

    expect(response).toMatchObject({
      data: {
        getUser: {
          id: String(user.id),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        },
      },
    });
  });
});
