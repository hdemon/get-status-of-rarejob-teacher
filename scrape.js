const puppeteer = require('puppeteer');
const HtmlTableToJson = require('html-table-to-json');

(async () => {
  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.rarejob.com/account/login/');
  await page.type("#RJ_LoginForm_email", "");
  await page.type("#RJ_LoginForm_password", "");
  page.click('.btn_rj');
  await page.waitForNavigation({timeout: 60000, waitUntil: "domcontentloaded"});
  // await page.goto('https://www.rarejob.com/reservation/bookmark/#page=1');
  // await page.waitForNavigation({timeout: 60000, waitUntil: "domcontentloaded"});
  const teacherIDs = [11327];
  // teacherIDs.forEach(async (id) => {
    await page.goto(`https://www.rarejob.com/teacher_detail/${11327}/`);
    // await page.waitForNavigation({timeout: 60000, waitUntil: "domcontentloaded"});
    const table = await page.evaluate(() => document.querySelector('.reserveTimeTable').innerHTML);
    console.log(table);
    const jsonTables = new HtmlTableToJson(table);
    console.log(jsonTables.results);
  // });

  await browser.close();
})();
