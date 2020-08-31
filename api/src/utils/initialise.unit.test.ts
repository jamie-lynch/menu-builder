import { initialise } from "./initialise";
import dotenv from "dotenv";
import { mocked } from "ts-jest/utils";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

jest.mock("dotenv");
const mockedDotenv = mocked(dotenv, true);

describe("The initialise function", () => {
  let previousAppEnv: string;

  beforeAll(() => {
    previousAppEnv = process.env.APP_ENV;
  });

  beforeEach(() => {
    delete process.env.APP_ENV;
    mockedDotenv.config.mockReset();
  });

  afterAll(() => {
    process.env.APP_ENV = previousAppEnv;

    delete process.env.DB_NAME;
    delete process.env.DB_HOST;
    delete process.env.DB_PASS;
    delete process.env.DB_USER;
    delete process.env.DB_PORT;
  });

  test("runs dotenv if app env is not defined", () => {
    initialise().then(() => {
      expect(mockedDotenv.config).toHaveBeenCalled();
    });
  });

  test("does not run dotenv if app env is defined", () => {
    process.env.APP_ENV = "dev";
    initialise().then(() => {
      expect(mockedDotenv.config).not.toHaveBeenCalled();
    });
  });

  test("resolves with the typeorm config", () => {
    process.env.APP_ENV = "dev";
    process.env.DB_NAME = "name";
    process.env.DB_HOST = "host";
    process.env.DB_PASS = "pass";
    process.env.DB_USER = "user";
    process.env.DB_PORT = "3306";

    initialise().then((config: MysqlConnectionOptions) => {
      expect(config.database).toBe("name");
      expect(config.host).toBe("host");
      expect(config.username).toBe("user");
      expect(config.password).toBe("pass");
      expect(config.port).toBe(3306);
      expect(config.type).toBe("mysql");
      expect(config.synchronize).toBe(false);
    });
  });
});
