const { model, Schema} = require("mongoose");

let memberSchema = new Schema({
    Guild: String,
    Channel: String,
    Channel1: String,
    Channel2: String
})

module.exports = model("mememberCount", memberSchema)