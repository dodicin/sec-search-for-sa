const request = require("supertest");
const app = require("../server");

describe("Testing apis", () => {
  test("articlesNames call: API returns not-empty data", done => {
    expect.assertions(1);
    return request(app)
      .get("/api/articlesNames")
      .then(res => {
        expect(res.data && res.data.length).toBeGreaterThan(0);
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });

  test("articlesNames call: articles have an id and a title", done => {
    expect.assertions(1);
    return request(app)
      .get("/api/articlesNames")
      .then(res => {
        expect(res.data.filter(x => !x.id || !x.title).length).toBe(0);
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });

  test("article call: API returns not-empty data", done => {
    expect.assertions(1);
    return request(app)
      .get("/api/article/1")
      .then(res => {
        expect(res.data).not.toBe(null);
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });

  test("article call: article attributes", done => {
    expect.assertions(1);
    return request(app)
      .get("/api/article/1")
      .then(res => {
        expect(Object.keys(res.data)).arrayContaining([
          "id",
          "title",
          "author",
          "description"
        ]);
        done();
      })
      .catch(err => {
        expect(err).toBe(null);
        done();
      });
  });
});
