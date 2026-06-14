
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const specRoutes = require("./routes/specRoutes");

const app = express();
const PORT = 3001;

app.use(cors());               
app.use(express.json());      

const swaggerDocument = {
  openapi: "3.0.0",
  info: { title: "Schedulr API", version: "1.0.0" },
  paths: {
    "/api/specs": {
      get: { summary: "Get paginated specs", responses: { 200: { description: "OK" } } },
      post: { summary: "Create a spec", responses: { 201: { description: "Created" } } },
    },
    "/api/specs/library": {
      get: { summary: "Get all library specs", responses: { 200: { description: "OK" } } },
    },
    "/api/specs/{id}": {
      get: { summary: "Get one spec", responses: { 200: { description: "OK" }, 404: { description: "Not found" } } },
      put: { summary: "Update a spec", responses: { 200: { description: "OK" } } },
      delete: { summary: "Delete a spec", responses: { 204: { description: "Deleted" } } },
    },
  },
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use("/api/specs", specRoutes);

app.listen(PORT, () => {
  console.log(`Schedulr API running on http://localhost:${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});