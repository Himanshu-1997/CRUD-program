const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');
const bcrypt = require('bcrypt');
const FacebookStrategy = require('passport-facebook').Strategy;
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const configAuth = require('./auth');
module.exports = function(passport){
  // Local Strategy
  /*passport.use(new LocalStrategy(function(username, password, done){
    // Match Username
    let query = {'local.username':username};
    User.findOne(query, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'No user found'});
      }

      // Match Password
      bcrypt.compare(password,user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Wrong password'});
        }
      });
    });
  }));*/
  
  passport.use('local-login', new LocalStrategy({
			username: 'username',
			password: 'password',
			passReqToCallback: true
		},
		function(req, username, password, done){
			process.nextTick(function(){
				User.findOne({'local.username': username}, function(err, user){
					if(err)
						return done(err);
					if(!user)
						return done(null, false, {message: 'No user found'});
					if(!user.validPassword(password)){
						return done(null, false, {message: 'Wrong password'});
					}
					return done(null, user);

				});
			});
		}
	));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
  
  passport.use(new FacebookStrategy({
	    clientID: configAuth.facebookAuth.clientID,
	    clientSecret: configAuth.facebookAuth.clientSecret,
	    callbackURL: configAuth.facebookAuth.callbackURL,
		profileFields: configAuth.facebookAuth.profileFields
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		User.findOne({'facebook.id': profile.id}, function(err, user){
	    			if(err)
	    				return done(err);
	    			if(user)
	    				return done(null, user);
	    			else {
	    				var newUser = new User();
	    				newUser.facebook.id = profile.id;
	    				newUser.facebook.token = accessToken;
	    				newUser.facebook.name = profile.name.givenName + ' ' + profile.name.familyName;
	    				newUser.facebook.email = profile.emails[0].value;

	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
	    				})
	    				console.log(profile);
						return done(null, newUser);
	    			}
	    		});
	    	});
	    }

	));
	
	/*passport.use(new GoogleStrategy({
	    clientID: configAuth.googleAuth.clientID,
	    clientSecret: configAuth.googleAuth.clientSecret,
	    callbackURL: configAuth.googleAuth.callbackURL
	  },
	  function(accessToken, refreshToken, profile, done) {
	    	process.nextTick(function(){
	    		User.findOne({'google.id': profile.id}, function(err, user){
	    			if(err)
	    				return done(err);
	    			if(user)
	    				return done(null, user);
	    			else {
	    				var newUser = new User();
	    				newUser.google.id = profile.id;
	    				newUser.google.token = accessToken;
	    				newUser.google.name = profile.displayName;
	    				newUser.google.email = profile.emails[0].value;

	    				newUser.save(function(err){
	    					if(err)
	    						throw err;
	    					return done(null, newUser);
	    				})
	    				console.log(profile);
						return done(null, newUser);
	    			}
	    		});
	    	});
	    }

	));*/

}
