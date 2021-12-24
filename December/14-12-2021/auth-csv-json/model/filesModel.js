let mongoose = require('mongoose');

let fileSchema = mongoose.Schema({

    name: {
        type: String,
    },
    mappingbj: {
        type: mongoose.Schema.Types.Mixed,
        default: null
    },
    totalRecord: {
        type: String,
        default: 0
    },
    duplicate: {
        type: String,
        default: 0
    },
    invalid: {
        type: String,
        default: 0
    },
    totalUpload: {
        type: String,
        default: 0
    },
    isHeader: {
        type: Boolean,
        default: false
    },
    csvDuplicateUsers: {
        type: String,
        default: 0
    },
    uploadBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    filePath: {
        type: String,
    },
    status: {
        type: String,
        enum: ["Pending", "Success"]
    },

}, { timestamp: true });

module.exports = mongoose.model('files', fileSchema, "files");