/* eslint-disable */
const express = require('express');
const path = require('path');
const dotevn = require('dotenv');
dotevn.config();
const mongoose = require('mongoose');
const db = process.env.SECRET_MONGO_URI;
const Marker = require('./models/post.js');
const User = require('./models/user.js');
const Image = require('./models/images.js');
const cookieParser = require('cookie-parser');
const {createSession, validateSession,validateUser} = require('./public/jwt.js');
const bcrypt = require('bcrypt');
const mailService = require('./service/MailService.js');
const {sign, verify} = require('jsonwebtoken')
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer');


mongoose.set('strictQuery', true);
mongoose.connect(db).then(res => {
    console.log('Connected to DB');


});

const {json} = require('express');
const e = require('express');
const {httpOnly} = require('express-session/session/cookie');
const {getRounds} = require('bcrypt');
const Session = require('./models/session');



const app = express();
const port = process.env.PORT || 3000;
const redirect_uri = process.env.REDIRECT_URI || 'http://localhost:3000/'
const static_path = path.join(__dirname, '/public');
app.use(express.static(static_path));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set('public', path.join(__dirname, 'public'));
app.set('public engine', 'ejs');

const getAvatar = async (req,res, next ) => {

     await Image.findOne({name: req.body.userName}).then(image =>{
         if (image) {
             res.body = {contentType: image.img.contentType, buffer: Buffer.from(image.img.data).toString('base64')}
             next()
         } else {
             res.body = {contentType: null, buffer: null}
             next();
         }
     })

}

app.get('/', validateSession, async (req, res) => {
    res.render(__dirname + '/Index.ejs');


    app.get('/getCurrentImageAvatar', validateUser, getAvatar, async (req, res) => {
        res.send(res.body)
    } )

    app.get('/getUser',  validateUser, async (req, res) => {
        res.send({username: req.body.userName})
    })
});


app.post('/register', (req, res) => {
    const {username, password, mail} = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        new User({
            username: username,
            password: hash,
            mail: mail,
        }).save().then(() => {
            res.send('Реєстрація успішна');
        }).catch(err => {
            if (err) {
                res.status(400).send(err);
            }
        });


    });
});

async function activate(req, res, next) {
    try {
    const activationLink = await req.params.link;
    console.log(activationLink + "its activatelink")
    const  {refreshTokenId, username} = await mailService.activate(activationLink);
    console.log(refreshTokenId);
    const accessTokenId = sign({}, process.env.SECRET_JWT, {expiresIn: '300s'})
    await res.cookie('accessTokenId', accessTokenId,{  httpOnly: true, sameSite: 'lax'},);
    await res.cookie('refreshTokenId', refreshTokenId,{ maxAge: 5184000000, httpOnly: true, sameSite: 'lax'},);
     res.redirect(redirect_uri);
    } catch (e) {
   console.log(e)
    }
}

app.get('/activate/:link', activate);

app.post('/login', async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username: username});
    if (!user) return res.send('Користувача не знайдено');
    const dbPassword = user.password;
    bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
            res.send('Невірний пароль');
        } else {

             createSession(user);
            res.send({status: 'Success', redirect: '/'});
        }

    });

});

app.post('/request', validateUser, validateSession,  async (req, res) => {



        console.log("Welcome to site:" + req.body.userName)
        let mark = {
            coord: req.body.coords,
            timer: req.body.countTime,
            timeInMoment: req.body.timeInMoment,
            status1: req.body.status1,
            status2: req.body.status2,
            status3: 'uncompleted',
            uprate: req.body.uprate,
            downrate: req.body.downrate,
            timeOfMarkerInPanel: req.body.timeOfMarkerInPanel,

        };
        const marker = await new Marker(mark);
        marker.save().then(result => {
            res.send(result);
            console.log(result);
        }).catch(error => {
            console.log(error);
        });





});

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        cb(null, file.fieldname + '.' + extension)
    }
});

let upload = multer({ storage: storage });



app.post('/uploadImage', validateUser, upload.single('image'), validateUser, async (req, res, next) => {
    let extArray = req.file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    console.log(req.body.userName)
    let obj = {
        name: req.body.userName,
        desc: '1',
        img: {
            data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
            contentType: `image/${extension}`,
        }
    }
    await Image.findOneAndRemove({name:req.body.userName});
    await new Image(obj).save().then(image =>{
        res.send({contentType: image.img.contentType, buffer: Buffer.from(image.img.data).toString('base64') })
    })



});



app.post('/changeRate', validateUser,async (req, res) => {
    if (JSON.parse(req.body.up)) {
      await  Marker.findOneAndUpdate({
            coord: req.body.coord,
            uprate: {$gt: 2},
            status3: 'uncompleted'
        }, {$set: {status1: 'ok', status2: 'done', status3: 'completed'}}, {new: true}).then(marker => {
            console.log(marker);
        });
      await  Marker.findOneAndUpdate({coord: req.body.coord, likedBy:{ "$ne": req.body.userName }}, {$inc: {uprate: 1}, $push:{likedBy: req.body.userName}}, {new: true}).then(marker => {
            if (marker) res.send(marker)
        });
    } else {
      await  Marker.findOneAndUpdate({
            coord: req.body.coord,
            downrate: {$gt: 2},
            status3: 'uncompleted'
        }, {$set: {status1: 'not-approved', status2: 'reject', status3: 'completed'}}, {new: true}).then(marker => {
            console.log(marker);
        });
      await  Marker.findOneAndUpdate({coord: req.body.coord,  likedBy:{ "$ne": req.body.userName }}, {$inc: {downrate: 1}, $push:{likedBy: req.body.userName}}, {new: true}).then(marker => {
          if (marker)  res.send(marker)
        });
    }

});
app.post('/sentComment', validateUser, validateSession,  (req, res) => {
    let comment =
        {
            userName: req.body.userName,
            textOfComment: req.body.textOfComment,
        };

    Marker.findOneAndUpdate({coord: req.body.coords}, {$push: {comments: comment}}, {new: true}).then(marker => {
        res.send(comment);

    });
});
app.post('/getAllComments', validateUser,  (req, res) => {
    Marker.findOne({coord: req.body.coord}).then(marker => {
        res.send(marker);
    });
});
 app.get('/getChartStatus', validateUser,   (req, res) => {
    Marker.find({status3: 'completed'}).then(markers => {
        res.send(markers);
    });

});
app.get('/logout', validateUser,  async (req,res) => {
    const refreshTokenId = await req.cookies["refreshTokenId"];
    await Session.findOneAndDelete({"refreshToken.id": refreshTokenId});
    res.clearCookie('refreshTokenId');
    res.clearCookie('accessTokenId');
    await res.send({link: redirect_uri})


});
 app.get('/getHomePageInfo', validateUser, async (req, res) => {
     const user = await User.findOne({username: req.body.userName});
     res.send({mail: user.mail, userName: user.username});
 })

app.get('/getAllCoords', validateUser, getAvatar,  async (req, res) => {
    let currentTime = Math.round(new Date().getTime() / 1000);
    await Marker.find().then(markers => {
        markers.forEach(marker => {
            if ((currentTime - marker.timeInMoment) >= 1800) {
                Marker.deleteOne({timeInMoment: `${marker.timeInMoment}`}, (err, data) => {
                    if (!err) {
                        console.log(data);
                    } else console.log(err);
                });
            }

        });
    });
    Marker.find().then(markers => res.send({markers: markers,image: res.body}));

});


app.post('/changingPassword', validateUser, async  (req,res) => {
    const user = await User.findOne({username: req.body.userName});
    const dbPassword = user.password;
     bcrypt.compare(req.body.oldPass, dbPassword ).then( async (match) => {
         if (match){
                if(req.body.newPass === req.body.approvePass){
                    bcrypt.hash(req.body.newPass, 10).then( async (hash) => {
                        await User.findOneAndUpdate({username: req.body.userName}, {password: hash}, {new: true});
                        res.send('Пароль успішно змінено');
                    })

                } else {
                    res.send('паролі не збігаються');
                }
         }
         else {

                res.send('Невірний старий пароль');
            }

    })

})

app.post('/checkLogin', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (user) {
        res.send({typeOfTooltip: 'cancel-tooltip'});

    } else  res.send({typeOfTooltip: 'approved-tooltip'});
})


app.listen(port, () => {
    console.log(`server is running at ${port}`);
});