module.exports = {

	sessionSecret: process.env.SESSION_SECRET || 'redis-secret',

	github: {
    clientID: process.env.GITHUB_ID || '',
    clientSecret: process.env.GITHUB_SECRET || '',
    callbackURL: '/auth/github/callback',
    passReqToCallback: true
  },


  twitter: {
    consumerKey: process.env.TWITTER_KEY || '',
    consumerSecret: process.env.TWITTER_SECRET  || '',
    callbackURL: '/auth/twitter/callback',
    passReqToCallback: true
  },


   stripe: {
    secretKey: process.env.STRIPE_SKEY || '',
    publishableKey: process.env.STRIPE_PKEY || ''
  },


   twilio: {
    sid: process.env.TWILIO_SID || '',
    token: process.env.TWILIO_TOKEN || ''
  }

};