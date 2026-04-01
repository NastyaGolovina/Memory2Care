const prisma = require("../config/prismaClient.js");

//
//
// model SiteContent {
//     content_id   Int       @id @default(autoincrement())
//     element_id   String    @db.VarChar(225)
//     text         String    @db.VarChar(2000)
//     news_author  String    @db.VarChar(225)
//     news_date    DateTime  @db.Date
//     page_type    PageType
//     language     Language
//
// @@map("Site_Content")
// }


const PageType = {
    MAIN_PAGE: "MAIN_PAGE",
    ABOUT_US: "ABOUT_US",
    TEAM_PARTNERS: "TEAM_PARTNERS",
    NEWS: "NEWS",
    CONTACT: "CONTACT",
    ACCOUNT: "ACCOUNT"
};





const createPageArticle = async (data) => {

    const element_id = data.element_id;
    const text = data.text;
    const page_type = data.page_type;
    const language = data.language;


    if (!element_id) throw new Error('element_id is required');
    if (!text || !text.trim()) throw new Error('text is required');
    if (!page_type) throw new Error('page_type is required');
    if (!language) throw new Error('language is required');

    if (!Object.values(PageType).includes(page_type)) throw new Error('Invalid page_type');
    if (text.length > 2000) throw new Error('text is too long');

    const existingContent = await prisma.siteContent.findFirst({
        where: {
            element_id: element_id,
            language: language
        },
    });

    if (existingContent) throw new Error('Content with this element_id and language already exists');


    if(page_type === "NEWS") {
        const news_author = data.news_author;
        const news_date = data.news_date;

        if (!news_author || !news_author.trim()) throw new Error('news_author is required for NEWS');
        if (!news_date) throw new Error('news_date is required for NEWS');
        if (isNaN(new Date(news_date).getTime())) throw new Error('news_date is invalid');


        let content = await prisma.siteContent.create({
            data: {
                element_id: element_id,
                text: text,
                news_author: news_author,
                news_date : news_date,
                page_type : page_type,
                language : language

            }
        });
        return content;
    } else {
        let content = await prisma.siteContent.create({
            data: {
                element_id: element_id,
                text: text,
                news_author: null,
                news_date : null,
                page_type : page_type,
                language : language

            }
        });

        return content;
    }

}


const updatePageArticle = async (data) => {


    const content_id = data.content_id;
    const text = data.text;

    if (!content_id) throw new Error('content_id is required');
    if (!text || !text.trim()) throw new Error('text is required');


    if (text.length > 2000) throw new Error('text is too long');

    const existingContent = await prisma.siteContent.findFirst({
        where: {
            content_id: content_id
        },
    });

    if (!existingContent) throw new Error('Content with this element_id and language doesnt exists');


    if(existingContent.page_type === "NEWS") {
        const news_author = data.news_author;
        const news_date = data.news_date;

        if (!news_author || !news_author.trim()) throw new Error('news_author is required for NEWS');
        if (!news_date) throw new Error('news_date is required for NEWS');
        if (isNaN(new Date(news_date).getTime())) throw new Error('news_date is invalid');


        let content = await prisma.siteContent.update({
            where: { content_id: content_id },
            data: {
                text: text,
                news_author: news_author,
                news_date : news_date
            }
        });
        return content;
    } else {
        let content = await prisma.siteContent.update({
            where: { content_id: content_id },
            data: {

                text: text,


            }
        });

        return content;
    }

}


const getPageArticle = async (data) => {


    const content_id =  parseInt(data.content_id);
    const language = data.language;





    if (!content_id) throw new Error('content_id is required');
    if (!language) throw new Error('language is required');

    const existingContent = await prisma.siteContent.findFirst({
        where: {
            content_id: content_id,
            language: language
        },
    });

    if (!existingContent) throw new Error('Content with this element_id and language doesnt exists');

    return existingContent;

}

module.exports = { createPageArticle,updatePageArticle,getPageArticle };