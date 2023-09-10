import mongoose from "mongoose";

const Schema = mongoose.Schema

const set = {
    folderlist : []
}

const Files = new Schema({
    email: { type: 'string', required: true},
    filename: { type: 'string', required: true},
    ownerid : { type: 'string', required: true},
    private : { type: 'bool', required:true},
    language : { type: 'string', required:true},
    extension : { type: 'string', required:true},
    filecode : { type: 'string', required:true},
    sharelist : { type : 'array'},
    set: { type: 'object', default: set }

}, { timestamps: true });
export default mongoose.model('Files', Files);