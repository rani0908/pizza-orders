import { AppPage } from '../pages/app.po';
import { browser, logging } from 'protractor';
const OrderPage = require('../pages/order.po');
const OrderStatusPage = require('../pages/orderStatus.po');

describe('Pizza Order Fulfillment', () => {
    let page: AppPage;
    let totalItemsInInv, orderCompleted, orderPending;

    beforeAll(() => {
        page = new AppPage();
        page.navigateTo();
    });

    it('Navigate to New order page', () => {
        OrderPage
            .open();
    });

    it('Enter personal information', () => {
        OrderPage
            .enterBasicInformation("John", "john@google.com", "7605 Knox Ave S, Richfield, MN, 55423", "16123456789")
    });

    it('Select pizza size and toppings', () => {
        const toppings1 = ["Bacon", "Mushroom", "Onion"];
        const toppings2 = [...toppings1, "Basil", "Tomatoe"]
        OrderPage
            .selectPizzaSize(1, 'Medium')
            .selectToppings(1, toppings1)
            .addAdditionalPizza()
            .selectPizzaSize(2, 'Large')
            .selectToppings(2, toppings2)
    });

    it('Place the order', () => {
        OrderPage
            .placeOrder();
        expect(OrderPage.isConfirmationMsgDisplayed()).toBe('Order Saved!');
        OrderPage
            .closeOrderConfirmationPopup();
    });

    it('Navigate to status page', () => {
        OrderStatusPage
            .open();
    });

    it('Confirm latest order displayed in the table', () => {
        expect(OrderStatusPage.getOrderedTimeOfLatestOrder()).toBe('a few seconds ago');
    });

    it('Accept the order', () => {
        OrderStatusPage
            .accept();
            expect(OrderStatusPage.getStatusOfLatestOrder()).toEqual('Accepted');
    });

    it('Mark Order as Completed and Order should be Completed', () => {
        OrderStatusPage
            .markComplete();
        expect(OrderStatusPage.getStatusOfLatestOrder()).toEqual('Completed');
    });

    afterEach(async () => {
        // Assert that there are no errors emitted from the browser
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
