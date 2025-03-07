'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
    routes: {
      cors: true
    }
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

      return 'Hello World!';
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
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();