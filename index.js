import puppeteer from "puppeteer";
import { dirname, resolve } from 'path';

const browser = await puppeteer.launch({
    headless: false
});
const page = await browser.newPage();

async function translateImg() {
    let filepath = resolve('./img/img1.jpeg')
    console.log(filepath)
    // Navigate the page to a URL.
    await page.goto('https://translate.google.com/?sl=en&tl=id&op=images');
    // await page.goto('https://facebook.com');

    // Set screen size.
    await page.setViewport({ width: 1080, height: 1024 });

    // set image file input selector
    let selector = '#ucj-39'
    let subs2 = await page.$eval(selector, el => el.getAttribute("id"));
    console.log(subs2)

    // wait for img input selector
    await page.waitForSelector(selector).catch((err) => console.log("waitforselector err: ", err));
    // grab img input selector
    const fileElement = await page.$(selector).catch((err) => console.log(err));
    // upload img to input
    await fileElement.uploadFile(filepath).catch(e => console.log(e));

    // set download btn selector
    const dlbtnselector = 'button[jsname="hRZeKc"]'
    await page.waitForSelector(dlbtnselector).catch((err) => console.log("waitforselector err: ", err));
    let dlbtnEval = await page
        .$eval(dlbtnselector, el => el.getAttribute("aria-label"))
        .catch((err) => console.log("waitforselector err: ", err));

    console.log(dlbtnEval)
    const downloadBtn = await page.waitForSelector(dlbtnselector).catch((err) => console.log(err));
    
    // using native js event handler instead of ElementHandle.click()
    // source: https://stackoverflow.com/questions/51857070/puppeteer-in-nodejs-reports-error-node-is-either-not-visible-or-not-an-htmlele
    await downloadBtn.evaluate(b => b.click()).catch((err) => console.log(err));

}

translateImg()
