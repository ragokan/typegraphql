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

describe("Register", () => {
  it("create user", async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const registerMutation = `
      mutation Register {
        registerUser(
          data: {
            email: "${user.email}"
            firstName: "${user.firstName}"
            lastName: "${user.lastName}"
            password: "${user.password}"
          }
        ) {
          id
          email
          firstName
          lastName
          name
        }
      }
`;

    const response = await callGraphql({ source: registerMutation });

    expect(response).toMatchObject({
      data: {
        registerUser: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        },
      },
    });

    const dbUser = await User.findOne({ where: { email: user.email } });

    expect(dbUser).toBeDefined();
    expect(dbUser?.confirmed).toBeFalsy();
  });
});
