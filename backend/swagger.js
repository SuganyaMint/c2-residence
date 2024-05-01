const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./server.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "API Docs Member",
    description: "API KEY = f7d1e7d8a794d925d2bfe5a13b25a6a4",
    contact: {
      name: "Developer API By Sabtawee S.",
      email: "sabtawee_s@veninecable.com",
    },
  },
  host: "localhost:40004",
  basePath: "/",
  tags: [
    {
      name: "Other",
      description: "API for user in the system",
    },
  ],
};

swaggerAutogen(outputFile, endpointsFiles, doc);