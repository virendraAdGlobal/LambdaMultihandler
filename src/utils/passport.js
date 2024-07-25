const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const {modelName,userSchema} = require('../models/user');
const {connectToDatabase} =require('../utils/db');
const {getModel} =require('../utils/getmodel');


  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: process.env.JWT_SECRET_KEY,
  };

  try {
          passport.use('jwt', new JwtStrategy(opts, (jwt_payload, done) =>{
          const dbName1 = process.env.dbName1; // The database name can be passed in the event
          const dbUri1 =process.env.MONGOURI1;
          const dbName =process.env.dbName // The database name can be passed in the event
          const dbUri = process.env.MONGOURI; // URI from environment variable

          const connection =  connectToDatabase(dbUri1, dbName1);

          // Get or create the model for the connection
          const User = getModel(connection, modelName, userSchema);
        
          let username = jwt_payload.username
          
                  const user =  User.findOne({username})
                  if(!user){
                    return done(null, false);
                  }else{

                    return done(null, user);
                  }
                    
        }));
  } catch (error) {
    return done(error, false);
  }
 

  module.exports = {
    passport,
};
  