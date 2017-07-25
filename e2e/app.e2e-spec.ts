import { AngularCRUDPage } from './app.po';

describe('angular-crud App', () => {
  let page: AngularCRUDPage;

  beforeEach(() => {
    page = new AngularCRUDPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
