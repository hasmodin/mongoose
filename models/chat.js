const mongoose = require("mongoose");

const viberSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true,
       
    },
    to: {
        type: String,
        required: true,
        
    },

    message: {
        type: String,
        maxLength: 50
    },
    created_at: Date,
    
    
});

const Chat = mongoose.model("chat", viberSchema);

module.exports = Chat;