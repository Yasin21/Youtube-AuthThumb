const handelbars = require("handlebars");
const fs = require("fs")
const puppeteer = require("puppeteer")
const IMAGE_PATH = __dirname+"/screenshot.png";

async function generateThumb(file,data = {}){
    console.log(file,data);
    let html = handelbars.compile(fs.readFileSync(file).toString());
    let browser  = await puppeteer.launch({
        headless:true,
        defaultViewport:{
            height:720,
            width:1280
        }
    });

    let page = await browser.newPage();
    await page.setContent(html(data));
    await page.screenshot({
        path:IMAGE_PATH,
        fullPage:true,
    });

    await browser.close();
    return IMAGE_PATH;
}

(async function(){
    await generateThumb("thumbnail.html",{views:100,like:10,dislike:1000,topComment:"This is top comment in the video"})
    console.log("Done ")
})();

// module.exports = {
//
// }