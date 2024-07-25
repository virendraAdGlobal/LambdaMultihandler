function getModel(connection, modelName, schema) {
    //console.log("connection.models",connection.models)
    if (connection.models[modelName]) {
      return connection.models[modelName];
    }
  
    return connection.model(modelName, schema);
  }

  module.exports = {
    getModel,
};