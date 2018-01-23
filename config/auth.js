module.exports = {

    'facebookAuth' : {
        'clientID': '1666076026764208',
		'clientSecret': 'a710f260512c0de288cfb676120abc67',
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
		//'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        //'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
		'profileFields'   : ['email']
	},

    /*'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }*/

};