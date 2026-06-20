import { expect } from "chai";
import Ajv from "ajv";

import { getSingleUserSchema } from "../schema/getSingleUserSchema.js";
import { registerUserSchema } from "../schema/registerUserSchema.js";
import { getProductsSchema } from "../schema/getProductsSchema.js";

const ajv = new Ajv();
const baseURL = "https://reqres.in";

describe("Tugas Reqres API Automation", function () {

  it("GET - Single User Detail", async function () {

    const response = await fetch(`${baseURL}/api/users/2`, {
      headers: {
        "x-api-key": "reqres_385e17aa97a64407922ea1be7e0b007a"
      }
    });

    const body = await response.json();

    console.log("GET STATUS:", response.status);

    expect(response.status).to.equal(200);

    const validate = ajv.compile(getSingleUserSchema);
    expect(validate(body)).to.be.true;
  });


  it("GET - Products", async function () {

    const response = await fetch(`${baseURL}/api/products?page=1`, {
      headers: {
        "x-api-key": "reqres_385e17aa97a64407922ea1be7e0b007a"
      }
    });

    const body = await response.json();

    console.log("GET STATUS:", response.status);

    expect(response.status).to.equal(200);

    const validate = ajv.compile(getProductsSchema);
    expect(validate(body)).to.be.true;
  });


  it("POST - Register User Success", async function () {

    const payload = {
      email: "eve.holt@reqres.in",
      password: "pistol"
    };

    const response = await fetch(`${baseURL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "reqres_385e17aa97a64407922ea1be7e0b007a"
      },
      body: JSON.stringify(payload)
    });

    const body = await response.json();

    console.log("POST STATUS:", response.status);

    expect(response.status).to.equal(200);

    const validate = ajv.compile(registerUserSchema);
    expect(validate(body)).to.be.true;
  });

});