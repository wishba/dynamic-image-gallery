const Path = require('path');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');

const init = async () => {

  const server = new Hapi.Server({
    port: 3000,
    routes: {
      files: {
        relativeTo: Path.join(__dirname, 'public')
      }
    }
  });

  await server.register(Inert);

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true
      }
    }
  });

  server.route({
    method: 'GET',
    path: '/api/data',
    handler: async (request, h) => {
      return fetch('https://script.googleusercontent.com/macros/echo?user_content_key=0q21vmdOgUpf6oXzuIdcLcK-vQ3_fta_M_mnB-2b1Cbl4LriKfuBGbB0BFO4J0MHqtlCkdaKHooPGApgt2YKxsark6przTtIm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnEd5EOnhfZ7adyvsd4EGQ9PVBK6CBxUdSAUKIZqmOAr6-GWAR9cvy6nVqQozt8CMhd9nPEyv6ImGahQSkmV7nBLMJHFq7GgJuA&lib=MwBGkWdifjhAqX0UzQHI717ZroLrSbNd7')
        .then(response => response.json())
        .then(data => h.response(data).code(200))
        .catch(err => {
          console.error(err);
          return h.response({ error: 'Unable to fetch data' }).code(500);
        });
    }
  });

  await server.start();

  console.log('Server running at:', server.info.uri);
};

init();