const domain = require("supertest")("http://barru.pythonanywhere.com");
const expect = require("chai").expect;

describe("Scenario Register Feature", function () {
  it("1.Verify Success Register", async function () {
    const response = await domain
      .post("/register")
      .send({ "email": "fadlitesting@gmail.com", "password": "qwerty", "name": "FadliJagoQA" })
    expect(response.body.status).to.eql('SUCCESS_REGISTER');
    expect(response.body.message).to.eql('created user!');
    expect(response.body).to.include.keys("data", "message", "status");
  });
  it("2.Verify Failed Register with empty name", async () => {
    const response = await domain
      .post("/register")
      .send({ "email": "fadlitesting@gmail.com", "password": "qwerty", "name": "" })
    expect(response.body.status).to.eql('FAILED_REGISTER');
    expect(response.body.message).to.eql('Gagal Registrasi');
    expect(response.body).to.include.keys("data", "message", "status");
  })
  it("3.Verify Failed Register with all request body is empty", async () => {
    const response = await domain
      .post("/register")
      .send({ "email": "", "password": "", "name": "" })
    expect(response.body.status).to.eql('FAILED_REGISTER');
    expect(response.body.message).to.eql('Gagal Registrasi');
    expect(response.body).to.include.keys("data", "message", "status");
  })
  it("4.Verify Failed Register if email using invalid format", async () => {
    const response = await domain
      .post("/register")
      .send({ "email": "user@example.c", "password": "qwerty", "name": "FadliJagoQA1" })
    expect(response.body.status).to.eql('FAILED_REGISTER');
    expect(response.body.message).to.eql('Cek kembali email anda');
    expect(response.body).to.include.keys("data", "message", "status");
  })
  it("5.Verify Failed Register if name contains number", async () => {
    const response = await domain
      .post("/register")
      .send({ "email": "fadliamintesting12@gmail.com", "password": "qwerty", "name": "FadliJagoQA1" })
    expect(response.body.status).to.eql('FAILED_REGISTER');
    expect(response.body.message).to.eql('Tidak boleh mengandung symbol');
    expect(response.body).to.include.keys("data", "message", "status");
  })
}); 