import connection from "../utils/connection";
import request from "supertest";
import app from "../../src/app";
import { dish } from "../utils/fixtures";
import { getRepository } from "typeorm";
import { Dish } from "../../src/entities/Dish";

describe("The dish router", () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterEach(async () => {
    await connection.clear();
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("The GET /dish/ route", () => {
    test("returns an array of the dish elements", async (done) => {
      await dish(5, [{ name: "test" }]);
      request(app)
        .get("/dish")
        .expect(200)
        .then((response) => {
          expect(response.body.length).toBe(5);
          expect(response.body[0].name).toBe("test");
          done();
        });
    });

    test("returns the correct number and page of results", async (done) => {
      await dish(15, [{ name: "test" }]);
      request(app)
        .get("/dish")
        .query({ page: 1, results: 5 })
        .expect(200)
        .then((response) => {
          expect(response.body.length).toBe(5);
          expect(response.body[0].name).not.toBe("test");
          done();
        });
    });

    test("returns an empty array if no dishes exist", (done) => {
      request(app)
        .get("/dish")
        .expect(200)
        .then((response) => {
          expect(response.body.length).toBe(0);
          done();
        });
    });
  });

  describe("The GET /dish/{id} route", () => {
    test("returns a single dish that matches the id", async (done) => {
      const dishes = await dish(1, [{ name: "test" }]);
      request(app)
        .get(`/dish/${dishes[0].id}`)
        .expect(200)
        .then((response) => {
          expect(response.body.name).toBe("test");
          done();
        });
    });

    test("returns an error if the dish is not found", (done) => {
      request(app)
        .get(`/dish/1`)
        .expect(404)
        .expect("No dish was found with that id", done);
    });
  });

  describe("The POST /dish/ route", () => {
    test("returns an error if no name is provided", (done) => {
      request(app)
        .post(`/dish`)
        .expect(400)
        .expect("Please provide a name value", done);
    });

    test("creates a new dish", (done) => {
      request(app)
        .post(`/dish`)
        .send({
          name: "test",
        })
        .expect(200)
        .then((response) => {
          expect(response.body.name).toBe("test");
          done();
        });
    });
  });

  describe("The PUT /dish/{id} route", () => {
    test("returns an error if not dish with that id", (done) => {
      request(app)
        .put(`/dish/1`)
        .send({ name: "new" })
        .expect(404)
        .expect("No dish was found with that id", done);
    });

    test("returns an error if no name provided", async (done) => {
      const d = await dish(1, [{ name: "old" }]);
      request(app)
        .put(`/dish/${d[0].id}`)
        .expect(400)
        .expect("Please provide a name value", done);
    });

    test("updates the dish and returns", async (done) => {
      const d = await dish(1, [{ name: "old" }]);
      request(app)
        .put(`/dish/${d[0].id}`)
        .send({ name: "new" })
        .expect(200)
        .then((response) => {
          expect(response.body.name).toBe("new");
          done();
        });
    });
  });

  describe("The DELETE /dish/{id} route", () => {
    test("returns an error if no dish found", async (done) => {
      request(app)
        .delete(`/dish/1`)
        .expect(404)
        .expect("No dish was found with that id", done);
    });

    test("returns ok if dish deleted correctly", async (done) => {
      const d = await dish(1);
      request(app)
        .delete(`/dish/${d[0].id}`)
        .expect(200)
        .expect("ok")
        .then(async () => {
          const repo = getRepository(Dish);
          const results = await repo.find();
          expect(results.length).toBe(0);
          done();
        });
    });
  });
});
