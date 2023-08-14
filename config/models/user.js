import mongoose from "mongoose";

const Schema = mongoose.Schema

const set = {
    block: false,
    role: "user"

}

const User = new Schema({
    username: { type: 'string', required: true,},
    email: { type: 'string', required: true, unique: true},
    password: { type: 'string', required: true },
    account_verified : { type: 'bool', required:true},
    image : { type: 'string', required:true},
    authenticated_by : { type: 'string', required:true},
    set: { type: 'object', default: set }

}, { timestamps: true });
export default mongoose.model('User', User);