const  { createPageArticle,updatePageArticle,getPageArticle }  = require("../services/pageService.js");
const { successResponse, errorResponse } = require('../models/response');



async function createPageContent(req, res) {
    try {

        const cp = await createPageArticle(req.body)
        res.status(200).json(successResponse(cp));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'CREATE_ERROR'));
    }

}

async function updatePageContent(req, res) {
    try {

        const cp = await updatePageArticle(req.body)
        res.status(200).json(successResponse(cp));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'UPDATE_ERROR'));
    }

}

async function getPageContent(req, res) {
    try {

        const cp = await getPageArticle(req.query)
        res.status(200).json(successResponse(cp));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'GET_ERROR'));
    }

}

module.exports = {createPageContent,updatePageContent,getPageContent };

