/* eslint-disable */
const mailService = require('../service/MailService.js');
const uuid = require('uuid')
const User = require('../models/user');
const Session = require('../models/session');
const {sign, verify} = require('jsonwebtoken')
const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000/'

const  createSession = async (user) => {
    const  activationLink = await uuid.v4();
    const accessId = await uuid.v4();
    const refreshId = await  uuid.v4();

    const currentTimeInSeconds = Math.round(new Date().getTime() / 1000);

    const session = await new Session({
        userName: user.username,
        sessionActivationLink: activationLink,
        isActivated: false,
        accessToken: {
           id: accessId,
            timeExp: currentTimeInSeconds,
        },
        refreshToken: {
            id: refreshId,
            timeExp: currentTimeInSeconds,
        }
    }).save();

    await mailService.sendActivationMail(user.mail,`${redirect_uri}activate/${activationLink}`)

}

const   validateSession = async (req, res, next) => {
    const accessTokenId = await req.cookies["accessTokenId"];
    const refreshTokenId = await req.cookies["refreshTokenId"]

        try {
            const access = verify(accessTokenId, process.env.SECRET_JWT)
            if(access)
                next();
        }
         catch (err){
            if (err){
                    const session = await Session.findOne({"refreshToken.id": refreshTokenId})
                    console.log(session)
                    const currentTimeInSeconds = Math.round(new Date().getTime() / 1000);
                    if (!session) {
                        res.render(__dirname + "/registration.ejs");

                    } else {
                        console.log('its working mazafaka')

                        const newRefreshTokenId = await uuid.v4();
                        await Session.findOneAndUpdate({"refreshToken.id": refreshTokenId},
                            {
                                refreshToken: {id: newRefreshTokenId, timeExp: currentTimeInSeconds},
                            }, {new: true}).then(async () =>{

                            const newAccessTokenId = sign({},process.env.SECRET_JWT, {expiresIn: '20s'} )
                            await res.cookie('accessTokenId', newAccessTokenId, { httpOnly: true, sameSite: 'lax'},);
                            await res.cookie('refreshTokenId', newRefreshTokenId, {maxAge: 5184000000, httpOnly: true, sameSite: 'lax'},);
                            next()
                        })


                    }
                }
            }
}

    const validateUser = async (req,res, next) => {
     const refreshTokenId = await req.cookies["refreshTokenId"];
     const session = await Session.findOne({"refreshToken.id": refreshTokenId})
     if (session){
             req.body.userName = session.userName;
             next()
     } else res.redirect(redirect_uri)

    }



module.exports = {createSession, validateSession, validateUser}