// models/artwork.js
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const ArtSchema = new Schema ({
    owner: {
        type: Schema.Types.ObjectId,
        required: [true, "Must be an owner to add a artwork"]
    },
    
    name: String,
    size: String,
    technique: String,
})

const Art = mongoose.model("Art", ArtSchema);

module.exports = Art;