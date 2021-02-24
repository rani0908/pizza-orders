import { browser, by, element } from 'protractor';

class OrderStatusPage {

  open() {
    element.all(by.css('.item')).get(2).click();
    return this;
  }

  accept() {
    element.all(by.css('.table-body.table-grid')).last().all(by.css('span')).get(0).click();
    return this;
  }

  markComplete() {
    element.all(by.css('.table-body.table-grid')).last().element(by.css('.mark-completed')).click();
    return this;
  }

  getStatusOfLatestOrder() {
    return element.all(by.css('.table-body.table-grid')).last().element(by.css('.table-col:nth-child(4)')).getText();
  }

  getOrderedTimeOfLatestOrder() {
    return element.all(by.css('.table-body.table-grid')).last().element(by.css('.table-col:nth-child(3)')).getText();
  }

}
module.exports = new OrderStatusPage();