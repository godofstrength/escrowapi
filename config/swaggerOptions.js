const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Escrow API with Swagger",
        version: "0.1.0",
        description:
          "this is a .............",
        license: {
          name: "Escrow app",
          url: "http://localhost:3000",
        },
        contact: {
          name: "escrow app",
          url: "escrow.com",
          email: "info@escrow.com",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: [`${__dirname}/routes/*.js`],
  };

  module.exports=swaggerOptions