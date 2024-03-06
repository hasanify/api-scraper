class ScraperError extends Error {
  public status: number;
  public name: string;

  constructor(message: string, status: number) {
    super(message);

    this.name = 'ScraperError';
    this.status = 503;
  }
}

export default ScraperError;
