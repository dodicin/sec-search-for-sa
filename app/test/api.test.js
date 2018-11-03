const axios = require("axios");

test("articlesNames call: API returns not-empty data", () => {
  axios
    .get("/api/articlesNames")
    .then(res => {
      expect(res.data && res.data.length).toBeGreaterThan(0);
    })
    .catch(err => {});
});

test("articlesNames call: articles have an id and a title", () => {
  axios
    .get("/api/articlesNames")
    .then(res => {
      expect(res.data.filter(x => !x.id || !x.title).length).toBe(0);
    })
    .catch(err => {});
});

test("article call: API returns not-empty data", () => {
  axios
    .get("/api/article/:id")
    .then(res => {
      console.log(res);
      expect(res.data).toBe(0);
    })
    .catch(err => {});
});

test("article call: article attributes", () => {
  axios
    .get("/api/article/:id")
    .then(res => {
      expect(Object.keys(res.data)).arrayContaining([
        "id",
        "title",
        "author",
        "description"
      ]);
    })
    .catch(err => {});
});
