const SquareStrategy = require('../lib');
const should = require('should');

describe('square strategy', function () {
    beforeEach(function () {
        this.strategy = new SquareStrategy({
                clientID:     'testid',
                clientSecret: 'testsecret',
                callbackURL:  '/callback'
            },
            function(accessToken, idToken, profile, done) {}
        );
    });

    it('state should not be null by default', function() {
        this.strategy.options.stateFunc.should.not.be.null();
    });

    it('should copy options object without mutating', function () {
        const options = {
            clientID:     'testid',
            clientSecret: 'testsecret',
            callbackURL:  '/callback'
        };
        const strategy = new SquareStrategy(
            options,
            function(accessToken, idToken, profile, done) {}
        );

        strategy.options.should.be.not.equal(options);
        options.should.not.have.property('authorizationURL');
    });

    describe('authenticate', function () {
        it('when there is an error querystring propagate', function (done) {

            this.strategy.fail = function (challenge, status) {
                challenge.message.should.eql('access_denied');
                done();
            };

            this.strategy.authenticate({
                query: {
                    error: 'access_denied',
                    error_description: 'access_denied'
                }
            });
        });
    });
});

