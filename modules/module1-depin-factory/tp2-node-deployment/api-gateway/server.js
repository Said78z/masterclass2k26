const express = require('express');
const bodyParser = require('body-parser');
const cheerio = require('cheerio');
const { automateConfirmation } = require('./automator');

const app = express();
app.use(bodyParser.json());

app.post('/webhook/email', async (req, res) => {
    console.log('Received email webhook:', req.body.subject);

    const htmlBody = req.body.html || req.body.text;
    if (!htmlBody) return res.status(400).send('No body content');

    const $ = cheerio.load(htmlBody);
    // Search for verification links
    const verifyLink = $('a[href*="verify"], a:contains("Confirm"), a:contains("Verify")').attr('href');

    if (verifyLink) {
        console.log('Found verification link:', verifyLink);
        // Trigger Puppeteer automation
        automateConfirmation(verifyLink).catch(err => console.error('Automation failed:', err));
        res.status(200).send('Verification triggered');
    } else {
        res.status(200).send('No link found');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
