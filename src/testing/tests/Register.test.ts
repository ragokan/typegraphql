import { Connection } from "typeorm";
import { callGraphql } from "../GraphqlCaller";
import { testConnection } from "../TestConnection";

let conn: Connection;
beforeAll(async () => {
  conn = await testConnection();
});

afterAll(async () => {
  await conn.close();
});

const registerMutation = `
mutation Register($data:RegisterInput!) {
    registerUser(
      data: $data
    ) {
      id
      email
      firstName
      lastName
      name
    }
  }
  
`;

describe("Register", () => {
  it("create user", async () => {
    console.log(
      await callGraphql({
        source: registerMutation,
        variableValues: {
          data: {
            firstName: "Okan",
            lastName: "Yeah",
            email: "okanyeah@yeah.com",
            password: "yeah",
          },
        },
      })
    );
  });
});
