const  { createPageArticle,updatePageArticle,getPageArticle, getNewsList, getNewsItem  }  = require("../services/pageService.js");
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


async function newsList(req, res) {
    try {
        const { language } = req.query;

        const news = await getNewsList(language);

        res.status(200).json(successResponse(news));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'GET_NEWS_LIST_ERROR'));
    }
}

async function newsItem(req, res) {
    try {
        const { news_id, language } = req.query;

        const news = await getNewsItem(news_id, language);

        res.status(200).json(successResponse(news));
    } catch (err) {
        res.status(400).json(errorResponse(err.message, 'GET_NEWS_ITEM_ERROR'));
    }
}

module.exports = {createPageContent,updatePageContent,getPageContent,newsList,newsItem  };

