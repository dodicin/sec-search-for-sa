const axios = require("axios");

test("articlesNames call: API returns not-empty data", () => {
  expect.assertions(1);
  return axios
    .get("/api/articlesNames")
    .then(res => {
      expect(res.data && res.data.length).toBeGreaterThan(0);
    })
    .catch(err => {
      expect(err).toBe(null);
    });
});

test("articlesNames call: articles have an id and a title", () => {
  expect.assertions(1);
  return axios
    .get("/api/articlesNames")
    .then(res => {
      expect(res.data.filter(x => !x.id || !x.title).length).toBe(0);
    })
    .catch(err => {
      expect(err).toBe(null);
    });
});

test("article call: API returns not-empty data", () => {
  expect.assertions(1);
  return axios
    .get("/api/article/1")
    .then(res => {
      expect(res.data).not.toBe(null);
    })
    .catch(err => {
      expect(err).toBe(null);
    });
});

test("article call: article attributes", () => {
  expect.assertions(1);
  return axios
    .get("/api/article/1")
    .then(res => {
      expect(Object.keys(res.data)).arrayContaining([
        "id",
        "title",
        "author",
        "description"
      ]);
    })
    .catch(err => {
      expect(err).toBe(null);
    });
});
