module.exports = {
  mongo: {
    uri:
      process.env.MONGODB ||
      `mongodb://${process.env.MONGODB_PORT_27017_TCP_ADDR}:${process.env
        .MONGODB_PORT_27017_TCP_PORT}/site`
  }
}
