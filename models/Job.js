const { defaults, required } = require('joi')
const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({

    company : {
        type : String,
        required : [true , 'please provide the company name'],
        maxlength : 20
    },

    position : {
        type : String,
        required : [true , 'please provide the position'],
        maxlength : 20
    },

    status : {
        type : String,
        enum : ['interview', 'declined', 'pending'],
        default : 'pending'
    }, 
    createdBy : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : [true, 'please provide the user']
    }

},{timestamps: true})



module.exports = mongoose.model('Job' , jobSchema) 