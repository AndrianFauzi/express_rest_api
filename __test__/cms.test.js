const request = require("supertest");
const app = require("../index");
const { sequelize, Product } = require("../models");
const { queryInterface } = sequelize;
// Register
const products = require("../data/products.json");
products.forEach((e) => {
  e.createdAt = e.updatedAt = new Date();
});

describe("POST /pub/regster - register", () => {
  describe("POST /pub/register - success test", () => {
    it("sould be return an message create", async () => {
      const payload = {
        username: "jest",
        email: "jest@mail.com",
        password: "12345",
        phoneNumber: "12121",
        address: "jalan baru",
      };
      const res = await request(app).post("/pub/register").send(payload);
      expect(res.status).toBe(201);
      expect({ message: `Customers dengan id ${res.id} successfully created` });
    });
  });

  describe("POST /pub/register - fail test", () => {
    it("sould be return an message create", async () => {
      const payload = {
        username: "jest",
        email: "",
        password: "12345",
        phoneNumber: "12121",
        address: "jalan baru",
      };
      const res = await request(app).post("/pub/register").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", "email is required");
    });
  });

  describe("POST /pub/register - fail test", () => {
    it("sould be return an message create", async () => {
      const payload = {
        username: "jest",
        email: "aadsa",
        password: "12345",
        phoneNumber: "12121",
        address: "jalan baru",
      };
      const res = await request(app).post("/pub/register").send(payload);
      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("message", expect.any(String));
      expect(res.body).toHaveProperty("message", "invalid format email");
    });
  });
});

// Login
describe("POST /pub/login - login", () => {
  describe("POST /pub/login - success login", () => {
    it("sould be return an message access", async () => {
      const payload = {
        email: "jest@mail.com",
        password: "12345",
      };
      const res = await request(app).post("/pub/login").send(payload);
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("access_token", expect.any(String));
      expect(res.body).toHaveProperty("username", expect.any(String));
      expect(res.body).toHaveProperty("role", expect.any(String));
    });
  });

  describe("POST /pub/login - fail login", () => {
    it("sould be return an message access", async () => {
      const payload = {
        email: "jt@mail.com",
        password: "12345",
      };
      const res = await request(app).post("/pub/login").send(payload);
      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect({ message: "user not found" });
    });
  });

  describe("POST /pub/login - fail login", () => {
    it("sould be return an message access", async () => {
      const payload = {
        email: "jest@mail.com",
        password: "123455",
      };
      const res = await request(app).post("/pub/login").send(payload);
      expect(res.status).toBe(401);
      expect(res.body).toBeInstanceOf(Object);
      expect({ message: "error invalid email or password" });
    });
  });
});

// beforeAll(() => {
//   return queryInterface.bulkInsert("Products", products, {});
// });
describe("Product /pub/listProducts", () => {
  describe("Product /pub/listProducts - success", () => {
    it("sould be return an message access", async () => {
      const res = await request(app).get("/pub/listProducts");
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
    });
  });
});

describe("Product /pub/detailsProduct/:id", () => {
  describe("Product /pub/detailsProduct/:id - success", () => {
    it("sould be return an message access", async () => {
      const res = await request(app).get("/pub/detailsProduct/1");
      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty("name", expect.any(String));
      expect(res.body).toHaveProperty("description", expect.any(String));
      expect(res.body).toHaveProperty("price", expect.any(String));
      expect(res.body).toHaveProperty("imgUrl", expect.any(String));
      expect(res.body).toHaveProperty("CategoryId", expect.any(Number));
      expect(res.body).toHaveProperty("AuthorId", expect.any(Number));
      expect(res.body).toHaveProperty("status", expect.any(String));
    });
  });
});

// afterAll(() => {
//   return Product.destroy({
//     where: {},
//     truncate: true,
//     restartIdentity: true,
//     cascade: true,
//   });
// });
