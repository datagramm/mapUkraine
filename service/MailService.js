const nodemailer = require('nodemailer');
const Session = require('../models/session.js');
const uuid = require('uuid')
class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:'587',
            secure: false,
            auth: {
                user: process.env.SECRET_USER,
                pass: process.env.SECRET_PASS,
            }
        })
    }
   async sendActivationMail(to, link){
        await this.transporter.sendMail({
             from:'lazoryk.oleh@gmail.com',
            to: to,
            subject:'Вхід до нового пристрою ' + ' https://mapukrainewhereisgreen.onrender.com/',
            text: '',
            html: `<div><h1>Для підтвердження входу перейдіть по силці</h1>
                  <a href="${link}">${link}</a>
                 </div>`

        })
    }
    async activate(activationSessionLink) {


          await Session.findOneAndUpdate({sessionActivationLink: activationSessionLink}, {
            isActivated: true,}, {new: true})

        const accessTrue = await Session.findOne({sessionActivationLink: activationSessionLink})

       if (accessTrue.refreshToken?.id !== null && accessTrue.userName !== null)
           return {
               refreshTokenId: accessTrue.refreshToken.id,
               username: accessTrue.userName,
           }


    }





}

module.exports = new MailService();