const request = require("supertest");
const server = require("../index");


describe("Operaciones CRUD de cafes", () => {
  describe("GET /cafes", () => {
    test("devuelve un status code 200 y el tipo de dato recibido es un arreglo con por lo menos 1 objeto", async () => {
      const response = await request(server).get("/cafes");

      expect(response.statusCode).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
      expect(typeof response.body[0]).toBe("object");
    });
  });

  describe("DELETE /cafes/:id", () => {
    test("retorna 404 al intentar eliminar un café que no existe", async () => {
      const response = await request(server).delete("/cafes/100");

      expect(response.statusCode).toBe(404);
    });
  });

  describe("POST /cafes", () => {
    test("agrega un nuevo café y devuelve un código 201", async () => {
      const payload = { //
        id: 10,
        nombre: "Negro"
      };

      const response = await request(server)
        .post("/cafes")
        .send(payload);

      expect(response.statusCode).toBe(201);
    });
  });

  describe("PUT /cafes/:id", () => {
    test("actualiza un café y devuelve un status code 400 si se intenta actualizar con un id diferente", async () => {
      const payload = {
        id: 2,
        nombre: "Cortado 2"
      };

      const response = await request(server)
        .put("/cafes/1")
        .send(payload);

      expect(response.statusCode).toBe(400);
    });
  });
});