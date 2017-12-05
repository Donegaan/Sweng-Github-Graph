import { Stream } from 'stream';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema and model for testing database and to get visualisation of graph working

const userTestSchema = new Schema({
    name : String,
    ID: Number,
    URL : String,
    Repos: Number
});

const githubTestUser = mongoose.model('githubUserTest', userTestSchema);

module.exports = githubTestUser;