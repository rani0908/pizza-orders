import { browser, by, element } from 'protractor';

class OrderPage {
  open() {
    element.all(by.css('.item')).get(1).click();
    return this;
  }

  addAdditionalPizza() {
    element(by.css('.btn.add-pizza')).click();
    browser.sleep(1000);
    return this;
  }

  enterBasicInformation(name, email, address, phone) {
    element.all(by.css('form input')).get(0).sendKeys(name);
    element.all(by.css('form input')).get(1).sendKeys(email);
    element.all(by.css('form input')).get(2).sendKeys(address);
    element.all(by.css('form input')).get(3).sendKeys(phone);
    return this;
  }

  selectPizzaSize(pizzaNum, size) {
    element.all(by.xpath(`//button[.=" ${size} "]`)).get(pizzaNum - 1).click();
    return this;
  }

  selectToppings(pizzaNum, toppings) {
    toppings.forEach(item => {
      element.all(by.xpath(`//button[.=" ${item} "]`)).get(pizzaNum - 1).click();
    });
    return this;
  }

  placeOrder() {
    element(by.css('.btn.order-btn')).click();
  }

  isConfirmationMsgDisplayed() {
    return browser.switchTo().alert().getText();
  }

  closeOrderConfirmationPopup() {
    browser.driver.switchTo().alert().accept();
  }
}
module.exports = new OrderPage();