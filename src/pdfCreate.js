import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const makeDir = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
};


const browser = await puppeteer.launch();
const page = await browser.newPage();

const htmlPath = path.join(path.dirname(fileURLToPath(import.meta.url)), './document.html');
await page.goto(htmlPath, { waitUntil: 'networkidle0' });

makeDir("./out");
const pdfOptions = {
  path: './out/cv.pdf',
  format: 'A4', 
  printBackground: true,
  margin: {
    top: '0',
    bottom: '0',
    left: '0',
    right: '0'
  }
};

await page.pdf(pdfOptions);

await browser.close();
