const cheerio = require('cheerio');
const request = require('request-promise');

const connectDB = require('./db/db');
const Article = require('./db/article.model');
const Category = require('./db/category.model');

async function scrape_list_articles(category) {
  try {
    // 905
    for (let page = 805; page >= 755; page--) {
      let url = `https://vnexpress.net/${category}/p${page}`;
      const html = await request.get(url);
      const $ = await cheerio.load(html);
      $("section.container > section.sidebar_1 > article.list_news").each(async (_, element) => {
        let article_url = $(element).find("h4.title_news > a").attr("href");
        let article_thumb_art = $(element).find("div.thumb_art > a > img").attr("data-original");
        if (article_url !== undefined) {
          scrape_article(article_url, article_thumb_art, category);
        }
      });
    }
  } catch (err) {
    console.error(err);
  }
}

async function scrape_article(url, thumb_art, category) {
  try {
    const html = await request.get(url);
    const $ = await cheerio.load(html);

    if ($("section.container.detail_photo").length > 0) {
      if ($("section.container.infographics").length === 0) {
        let existed_url = await Article.findOne({ article_url: url });
        if (!existed_url) {
          let articleData = {};
          let articleContent = [];

          const section = $("section.sidebar_1");
          articleData.article_url = url;
          articleData.article_thumb_art = (thumb_art !== undefined) ? thumb_art : "";
          articleData.article_date = section.find("span.time.left").text();
          articleData.article_title = section.find("h1.title_news_detail.mb10").text();
          articleData.article_desc = section.find("p.description").text().replace(/\n|\r|\t/g, "");

          $("div#article_content > div.item_slide_show.clearfix").each(async (i, element) => {
            let contentJson = {};
            let img_src = [];
            let img_content = {};

            contentJson.seq = i + 1;

            img_content.seq = 1;
            img_content.src = $(element).find("div.block_thumb_slide_show > img").attr("data-original");
            img_src.push(img_content);
            contentJson.img_gallery = img_src;

            const img_strong = $(element).find("div.desc_cation > p > strong").length;
            const img_b = $(element).find("div.desc_cation > p > b").length;
            if (img_strong > 0) {
              contentJson.img_title = $(element).find("div.desc_cation > p > strong").text().replace(/\n|\r|\t/g, "");
              $(element).find("div.desc_cation > p > strong").remove();
            } else if (img_b > 0) {
              contentJson.img_title = $(element).find("div.desc_cation > p > b").text().replace(/\n|\r|\t/g, "");
              $(element).find("div.desc_cation > p > b").remove();
            }

            contentJson.img_desc = $(element).find("div.desc_cation > p").text();
            
            articleContent.push(contentJson);
          });
          articleData.article_content = articleContent;
          
          let article_tags = "";
          let tag_block = $("div.block_tag.width_common > h3");
          const tags_length = tag_block.length;
          tag_block.each(async (i, element) => {
            if (i < tags_length - 1)
              article_tags += $(element).find("a").text() + ','; 
            else 
              article_tags += $(element).find("a").text();
          });
          articleData.article_tags = article_tags.split(',').map(tag => tag.trim());

          articleData.article_source = "vnexpress.net";

          let existed_category = await Category.findOne({ cate_code: category });
          if (existed_category) {
            articleData.category = existed_category._id;
          }

          const article = new Article(articleData);
          await article.save();
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  try {
    console.log(Date(Date.now()));

    connectDB();
    await scrape_list_articles("du-lich");

    console.log(Date(Date.now()));
  } catch (err) {
    console.error(err);
  }
}

main();