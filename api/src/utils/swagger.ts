import swaggerJSDoc from "swagger-jsdoc";

export default swaggerJSDoc({
  definition: {
    info: {
      title: "Menu Builder",
      version: "1.0.0",
      description: "The API that powers the Menu Builder app",
    },
  },
  apis: ["src/routes/*.ts", "src/entities/*.ts"],
});
