import request from 'supertest';
import app from '../app';
import chai from 'chai';
import { Product } from "../models/Product";
const basicUrl = "/v1/products";
const expect = chai.expect;


  let id: string;
  const product = {
    name: "Prodotto test",
    category: "Elettronica",
    subcategory: "Telefono",
    price: 1000,
    rank: 5,
    reviews: "Bello"
  }
    describe("create product", () => {
      before(async () => {
        const prodCreate = await Product.create(product);
        id = prodCreate._id.toString();
      });
      after(async () => {
          await Product.findByIdAndDelete(id);
        });
    it("failed test 401", async () => {
      const { status } = await request(app).post(basicUrl).send(product);
      status.should.be.equal(400);
    });
    it("success test 201", async () => {
      const { status, body } = await request(app)
        .post(basicUrl)
        .send(product)
      status.should.be.equal(201);
      body.should.have.property("_id");
      body.should.have.property("name").equal(product.name);
      body.should.have.property("category").equal(product.category);
      body.should.have.property("subcategory").equal(product.subcategory);
      body.should.have.property("price").equal(product.price);
      body.should.have.property("rank").equal(product.rank);
      body.should.have.property("reviews").equal(product.reviews);
      id = body._id;
    });
  });

   describe("get product", () => {
   it('Dovrebbe ritornare tutti i prodotti', async () => {
     const res = await request(app).get(basicUrl);
     expect(res.status).to.equal(200);
     expect(res.body.length).to.be.greaterThan(0);
   });
 });

   describe("get product by id", () => {
   it('Dovrebbe ritornare un prodotto in base all\'id', async () => {
     const res = await request(app).get(`${basicUrl}/${id}`);
     expect(res.status).to.equal(200);
     expect(res.body.nome).to.equal('Prodotto test');
   });
 });


 describe("get products category", () => {  
 it('Dovrebbe ritornare tutti i prodotti di una determinata categoria', async () => {
     const res = await request(app).get(basicUrl);
     expect(res.status).to.equal(200);
     expect(res.body).to.be.an('array');
   });
 });



