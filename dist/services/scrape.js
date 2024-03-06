"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio = __importStar(require("cheerio"));
const puppeteer_1 = __importDefault(require("puppeteer"));
class ScrapeService {
}
_a = ScrapeService;
ScrapeService.scrape = ({ url }) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch({ headless: true });
    const page = yield browser.newPage();
    try {
        const response = yield page.goto(url, { timeout: 5000 });
        if (!response)
            return;
        const html = yield response.text();
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
        yield page.setViewport({ width: 1280, height: 720 });
        yield page.waitForNetworkIdle();
        const screenshot = `data:image/png;base64,${(yield page.screenshot()).toString('base64')}`;
        return {
            description,
            icon,
            title,
            screenshot,
        };
    }
    catch (error) {
        throw new Error(error.message);
    }
    finally {
        yield page.close();
        yield browser.close();
    }
});
exports.default = ScrapeService;
