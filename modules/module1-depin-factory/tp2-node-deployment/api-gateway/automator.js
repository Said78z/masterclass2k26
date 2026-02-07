const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());

async function automateConfirmation(link) {
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    // Set a common user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');

    console.log(`Navigating to: ${link}`);
    await page.goto(link, { waitUntil: 'networkidle2' });

    // Handle potential captchas (Placeholder for CapSolver integration)
    // const hasCaptcha = await page.$('.cf-turnstile');
    // if (hasCaptcha) { ... }

    await page.screenshot({ path: `confirm-${Date.now()}.png` });
    console.log('Confirmation page visited and screenshotted.');

    await browser.close();
}

module.exports = { automateConfirmation };
