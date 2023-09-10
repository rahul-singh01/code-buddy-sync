import mongoose from "mongoose";

const Schema = mongoose.Schema

const set = {
    folderlist : []
}

const Folder = new Schema({
    email: { type: 'string', required: true},
    folder_name: { type: 'string', required: true , unique: true},
    ownerid : { type: 'string', required: true},
    private : { type: 'bool', required:true},
    files : { type: 'array'},
    set: { type: 'object', default: set }

}, { timestamps: true });
export default mongoose.model('Folder', Folder);