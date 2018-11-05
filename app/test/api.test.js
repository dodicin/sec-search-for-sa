const request = require("supertest");
const app = require("../server");

describe("Testing apis", () => {
  test("articlesNames call: response is defined, is non-empty and records are more then 0", done => {
    return request(app)
      .get("/api/articlesNames")
      .set("Accept", "application/json")
      .expect(200)
      .then(res => {
        expect(res.body).toBeDefined();
        expect(res.body.length).toBeGreaterThan(0);
        expect(res.body.filter(x => !x.id || !x.title).length).toBe(0);
        done();
      });
  });

  test("article call: response is not null and has article attributes", done => {
    return request(app)
      .get("/api/article/1")
      .set("Accept", "application/json")
      .expect(200)
      .then(res => {
        expect(res.body).toBeDefined();
        done();
      });
  });

  test("article call: article attributes", done => {
    return request(app)
      .get("/api/article/test")
      .set("Accept", "application/json")
      .expect(500)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        done();
      });
  });
});
