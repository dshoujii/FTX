import puppeteer from 'puppeteer';
import readline from "readline";
import xlsx from "node-xlsx";
import fs from 'fs';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function getWeek() {
    return new Promise((resolve, reject) => {
        rl.question('WeekNumber: ', (input) => {
            resolve(input);
        });
    });
}

const allGames = xlsx.parse('./game.xlsx')[0].data;

const gameUrls = [];

(async () => {
    try {
        const week = Number(await getWeek());
        let gameIndex = (week - 1) * 9;

        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized']
        });
        const page = await browser.newPage();

        for (let index = 0; index < 8; index++) {
            let game = allGames[gameIndex + index];
            await page.goto('https://www.whatifsports.com/nba/default.asp');

            await page.waitForSelector('#awayteam > .tabBox > .tabBar .tab a');
            (await page.$$('#awayteam > .tabBox > .tabBar .tab a'))[1].click();

            await page.waitForSelector('#visitor_search_tt');
            await page.select('#visitor_search_tt', '2');

            await page.waitForSelector('#visitor_search_tn');
            await page.$eval('#visitor_search_tn', (input, value) => {
                input.value = value;
            }, game[0]);

            await page.waitForSelector('#visitorsearch');
            (await page.$('#visitorsearch')).click();

            await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
            await page.waitForSelector('#searchresults tbody > .odd > .left > a');
            (await page.$('#searchresults > tbody > .odd  > .left > a')).click();


            await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
            await page.waitForSelector('#hometeam > .tabBox > .tabBar .tab a');
            (await page.$$('#hometeam > .tabBox > .tabBar .tab a'))[1].click();

            await page.waitForSelector('#home_search_tt');
            await page.select('#home_search_tt', '2');

            await page.waitForSelector('#home_search_tn');
            await page.$eval('#home_search_tn', (input, value) => {
                input.value = value;
            }, game[1]);

            await page.waitForSelector('#homesearch');
            (await page.$('#homesearch')).click();

            await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
            await page.waitForSelector('#searchresults tbody > .odd > .left > a');
            (await page.$('#searchresults > tbody > .odd  > .left > a')).click();

            await page.waitForSelector('.PBP');
            (await page.$('.PBP')).click();

            await page.waitForSelector('#playBtn');
            (await page.$('#playBtn')).click();

            await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
            await page.waitForSelector('#fancybox-frame');
            let url = await page.$eval('#fancybox-frame', element => element.src);
            console.log(url);
            gameUrls.push([game[0], game[1], url])
        }
        await browser.close();
        let buffer = xlsx.build([{ name: 'games', data: gameUrls }]);
        fs.writeFileSync('week.xlsx', buffer, { 'flag': 'w' });
    } catch (error) {
        console.log(error);
    }
})()

