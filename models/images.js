const mongoose = require('mongoose');
let Schema = mongoose.Schema;
const imageSchema = new Schema({
    name: String,
    desc: String,
    img:
        {
            data: Buffer,
            contentType: String
        }
})

const Image = mongoose.model('Image', imageSchema);
module.exports = Image;