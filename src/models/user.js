const mongoose = require('mongoose');
let modelName="users";
const connecthChatSchema = new mongoose.Schema({
  username: { type: String, default: '1' },
  email: { type: String, default: 0 },
  password: { type: String, default: 0 },
  status: { type: String, default: '0' },
  timestamp: { type: Date, default: Date.now },
});
const User = mongoose.model('users', connecthChatSchema);
// const schema = new mongoose.Schema(schemaDefinition);
//   return connection.model(modelName);

module.exports = {modelName,connecthChatSchema};