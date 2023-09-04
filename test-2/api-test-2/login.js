const domain = require("supertest")("http://barru.pythonanywhere.com");
const expect = require("chai").expect;

describe("Scenario Login Feature", function () {
  it("1.Verify Success Login with valid email and password", async function () {
    const response = await domain
      .post("/login")
      .send({ email: "jokotampan900@gmail.com", password: "jokotampan900" });

    expect(response.body.status).to.eql('SUCCESS_LOGIN');
    expect(response.body.message).to.eql('Anda Berhasil Login');
    expect(response.body).to.include.keys("data", "message", "status", "credentials");
  });
  it("2.Verify Failed Login with empty email & password", async function () {
    const response = await domain
      .post("/login")
      .send({ email: "", password: "" })
    expect(response.body.status).to.equal('FAILED_LOGIN');
    expect(response.body.message).to.equal('Cek kembali email anda'); cls
    expect(response.body).to.include.keys("data", "message", "status");
  })
  it("3.Verify Failed Login with email registered & empty password", async function () {
    const response = await domain
      .post("/login")
      .send({ email: "admintesting@gmail.com", password: "" })
    expect(response.body.status).to.equal('FAILED_LOGIN');
    expect(response.body.message).to.equal('Email atau Password Anda Salah');
    expect(response.body).to.include.keys("data", "message", "status");
  })
  it("4.Verify Failed Login with email & password are not registered or invalid", async function () {
    const response = await domain
      .post("/login")
      .send({ email: "email", password: "" })
    expect(response.body.status).to.equal('FAILED_LOGIN');
    expect(response.body.message).to.equal('Email atau Password Anda Salah');
    expect(response.body).to.include.keys("data", "message", "status");
  })
  it("5.Verify Login with valid email & password are not registered or invalid", async function () {
    const response = await domain
      .post("/login")
      .send({ email: "admintesting@gmail.com", password: "password" })
    expect(response.body.status).to.equal('FAILED_LOGIN');
    expect(response.body.message).to.equal('Email atau Password Anda Salah');
    expect(response.body).to.include.keys("data", "message", "status");
  })
  it("6.Login with invalid email & password valid", async function () {
    const response = await domain
    .post("/login")
    .send({ email:"admintesting12@gmail.com", password:"admintesting12@gmail.com"})
    expect(response.body.status).to.equal('FAILED_LOGIN');
    expect(response.body.message).to.equal('Email atau Password Anda Salah');
    expect(response.body).to.include.keys("data", "message", "status");
  })
});