import ScraperError from '@/exceptions/scrape';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

class ScrapeService {
  private static getIcons = ({base_url, $}: {base_url: string; $: cheerio.CheerioAPI}) => {
    const icons: string[] = [];
    const iconTags = $('link[rel*="icon"]');
    iconTags.each((index, element) => {
      const icon = $(element).attr();
      if (icon) {
        let icon_url = icon.href;
        while (icon_url.startsWith('.') || icon_url.startsWith('/')) {
          icon_url = icon_url.slice(1, icon_url.length);
        }
        if (!icon_url.startsWith('https://') && !icon_url.startsWith('http://'))
          icon_url = base_url + icon_url;

        icons.push(icon_url);
      }
    });

    return icons;
  };

  private static getMetaTags = ($: cheerio.CheerioAPI) => {
    const meta: {[key: string]: string} = {};

    const metaTags = $('meta');

    metaTags.each((index, element) => {
      const m = $(element).attr();
      if (m) {
        if (m.name) meta[m.name] = m.content;
      }
    });

    return meta;
  };
  public static scrape = async ({url}: {url: string}) => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    try {
      const response = await page.goto(url, {timeout: 5_000});
      if (!response) throw new Error();

      const html = await response.text();
      const $ = cheerio.load(html);

      const icons = this.getIcons({base_url: page.url(), $});

      const title = $('title').html();
      const meta: {[key: string]: string} = this.getMetaTags($);

      await page.setViewport({width: 1280, height: 720});
      await page.waitForNetworkIdle();

      const screenshot = `data:image/png;base64,${(await page.screenshot()).toString('base64')}`;

      return {
        meta,
        icons,
        title,
        screenshot,
      };
    } catch (error: any) {
      throw new ScraperError(error.message.split(':')[1], 503);
    } finally {
      await page.close();
      await browser.close();
    }
  };
}

export default ScrapeService;
