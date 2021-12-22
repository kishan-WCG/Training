const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
let signUp = require('./model/signUp');

module.exports = function (passport){

    passport.use(
        new JwtStrategy({
            secretOrKey:"aihdkloihgjeosjfyrnbvsjeirnfbdks",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        },
            function(jwt_payload, next){
                console.log(jwt_payload)
                signUp.findOne({email:jwt_payload.email}, function(err, users){
                    if(err){
                        return next(err, false);
                    }
                    if(users){
                        next(null, users);
                    }else{
                        next(null, false);
                    }

                });
            }
        
        )
    )
};

