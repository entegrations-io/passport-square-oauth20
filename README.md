# passport-square-oauth20

[Passport](http://passportjs.org/) strategy for authenticating with [Square](http://www.squareup.com/) using the OAuth 2.0 API.

This module lets you authenticate using Square in your Node.js applications.
By plugging into Passport, Square authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](https://github.com/senchalabs/connect#readme) -style middleware, including
[Express](http://expressjs.com/).


Status:
[![Build]()]()
[![Coverage]()]()
[![Quality]()]()
[![Dependencies]()]()


## Install

```bash
$ npm install passport-square-oauth20
```

## Usage

#### Create an Application

Before using `passport-square-oauth20`, you must register an application with
Square.  If you have not already done so, a new application can be created in the
[Square Developers Portal](https://developer.squareup.com/apps).
Your application will be issued a client ID and client secret, which need to be
provided to the strategy.  You will also need to configure a redirect URI which
matches the route in your application.

#### Configure Strategy

The Square authentication strategy authenticates users using a Square account
and OAuth 2.0 tokens.  The client ID and secret obtained when creating an
application are supplied as options when creating the strategy.  The strategy
also requires a `verify` callback, which receives the access token and optional
refresh token, as well as `profile` which contains the authenticated user's
Square profile.  The `verify` callback must call `cb` providing a user to
complete authentication.

```javascript
const SquareStrategy = require('passport-square-oauth20').Strategy;

passport.use(new SquareStrategy({
    clientID: SQUARE_CLIENT_ID,
    clientSecret: SQUARE_CLIENT_SECRET,
    callbackURL: "http://www.example.com/auth/square/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ squareId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));
```

Options to SquareStrategy
```
 `clientId`       Mandatory. Your Square application's client id
 `clientSecret`   Mandatory. Your Square application's client secret
 `callbackURL`    Mandatory. URL to which Square will redirect the user after granting authorization
 `grantType`	  Optional. Must be authorization_code.
 `isLive`         Optional. Whether to use Square's live environment or not. Default is false.
 `scope`          Optional. Scope. Default is MERCHANT_PROFILE_READ.
 `stateFunc`      Optional. Pass a function that can generate state param. Defaults to a value generated by uuidv4
```


#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'square'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

```javascript
app.get('/auth/square',
  passport.authenticate('square'));

app.get('/auth/square/callback', 
  passport.authenticate('square', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
  ```

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2021 [entegrations.io](https://www.entegrations.io/)
