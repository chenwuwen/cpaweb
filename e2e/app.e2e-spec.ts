import { CpawebPage } from './app.po';

describe('cpaweb App', () => {
  let page: CpawebPage;

  beforeEach(() => {
    page = new CpawebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
