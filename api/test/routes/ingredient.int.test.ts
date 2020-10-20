import connection from "../utils/connection";
import request from "supertest";
import app from "../../src/app";
import { ingredient } from "../utils/fixtures";
import { getRepository } from "typeorm";
import { Dish } from "../../src/entities/Dish";

describe("The ingredient router", () => {
  beforeAll(async () => {
    await connection.create();
  });

  afterEach(async () => {
    await connection.clear();
  });

  afterAll(async () => {
    await connection.close();
  });

  describe("The GET /ingredient/ route", () => {
    test("returns an array of the ingredient elements", async (done) => {
      await ingredient(5, [{ name: "test" }]);
      request(app)
        .get("/ingredient")
        .expect(200)
        .then((response) => {
          expect(response.body.length).toBe(5);
          expect(response.body[0].name).toBe("test");
          done();
        });
    });

    test("returns the correct number and page of results", async (done) => {
      await ingredient(15, [{ name: "test" }]);
      request(app)
        .get("/ingredient")
        .query({ page: 1, results: 5 })
        .expect(200)
        .then((response) => {
          expect(response.body.length).toBe(5);
          expect(response.body[0].name).not.toBe("test");
          done();
        });
    });

    test("returns an empty array if no ingredientes exist", (done) => {
      request(app)
        .get("/ingredient")
        .expect(200)
        .then((response) => {
          expect(response.body.length).toBe(0);
          done();
        });
    });
  });

  describe("The GET /ingredient/{id} route", () => {
    test("returns a single ingredient that matches the id", async (done) => {
      const ingredientes = await ingredient(1, [{ name: "test" }]);
      request(app)
        .get(`/ingredient/${ingredientes[0].id}`)
        .expect(200)
        .then((response) => {
          expect(response.body.name).toBe("test");
          done();
        });
    });

    test("returns an error if the ingredient is not found", (done) => {
      request(app)
        .get(`/ingredient/1`)
        .expect(404)
        .expect("No ingredient was found with that id", done);
    });
  });

  describe("The POST /ingredient/ route", () => {
    test("returns an error if no name is provided", (done) => {
      request(app)
        .post(`/ingredient`)
        .expect(400)
        .expect("Please provide a name value", done);
    });

    test("creates a new ingredient", (done) => {
      request(app)
        .post(`/ingredient`)
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

  describe("The PUT /ingredient/{id} route", () => {
    test("returns an error if not ingredient with that id", (done) => {
      request(app)
        .put(`/ingredient/1`)
        .send({ name: "new" })
        .expect(404)
        .expect("No ingredient was found with that id", done);
    });

    test("returns an error if no name provided", async (done) => {
      const d = await ingredient(1, [{ name: "old" }]);
      request(app)
        .put(`/ingredient/${d[0].id}`)
        .expect(400)
        .expect("Please provide a name value", done);
    });

    test("updates the ingredient and returns", async (done) => {
      const d = await ingredient(1, [{ name: "old" }]);
      request(app)
        .put(`/ingredient/${d[0].id}`)
        .send({ name: "new" })
        .expect(200)
        .then((response) => {
          expect(response.body.name).toBe("new");
          done();
        });
    });
  });

  describe("The DELETE /ingredient/{id} route", () => {
    test("returns an error if no ingredient found", async (done) => {
      request(app)
        .delete(`/ingredient/1`)
        .expect(404)
        .expect("No ingredient was found with that id", done);
    });

    test("returns ok if ingredient deleted correctly", async (done) => {
      const d = await ingredient(1);
      request(app)
        .delete(`/ingredient/${d[0].id}`)
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
