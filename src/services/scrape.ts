import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

class ScrapeService {
  public static scrape = async ({url}: {url: string}) => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    try {
      const response = await page.goto(url, {timeout: 5_000});
      if (!response) return;

      const html = await response.text();
      const $ = cheerio.load(html);

      let icon = $('link[rel="icon"]').attr('href');
      if (icon) {
        while (icon.startsWith('.') || icon.startsWith('/')) {
          icon = icon.slice(1, icon.length);
        }

        icon = page.url() + icon;
      }
      const title = $('title').html();
      const description = $('meta[name="description"]').attr('content');

      await page.setViewport({width: 1280, height: 720});
      await page.waitForNetworkIdle();

      const screenshot = `data:image/png;base64,${(await page.screenshot()).toString('base64')}`;

      return {
        description,
        icon,
        title,
        screenshot,
      };
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      await page.close();
      await browser.close();
    }
  };
}

export default ScrapeService;
