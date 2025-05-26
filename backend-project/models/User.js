import mongoose from "mongoose";
const Schema = mongoose.Schema

const userSchema = new Schema ({
    username: {
        type: String,
        required: true
    },
    email : {
        type: String,
        unique : true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const Users = mongoose.model('users', userSchema)
export default Users