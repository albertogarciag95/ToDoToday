import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl) as Promise<unknown>;
  }

  getSidebarText(): Promise<string> {
    return element(by.css('app-root .toolbar span')).getText() as Promise<string>;
  }
}
