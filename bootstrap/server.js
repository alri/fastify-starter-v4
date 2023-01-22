var server = require('../fastify')

// Run the server!
const start = async () => {

    const serverPort=process.env.APP_PORT ;
    const serverHost=process.env.APP_HOST ;

    try {
      await server.listen({port:serverPort,host:serverHost})
      console.log("################## SERVER RUN ###############")
      console.log("Fastify is Running in : http://"+serverHost+":"+serverPort);
      console.log("################## SERVER RUN ###############")
    } catch (err) {
      server.log.error(err)
      await server.close()
      process.exit(1)
    }
  }
  start()