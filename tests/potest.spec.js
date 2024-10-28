require('dotenv').config();

const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageobjects/LoginPage');
const DashboardPage = require('../pageobjects/DashboardPage');
const CartPage = require('../pageobjects/CartPage');

test.describe('SauceDemo PO Tests with Visual Assertion', () => {
    let loginPage, dashboardPage, cartPage;

    test.beforeEach(async ({ page }) => {
        
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        cartPage = new CartPage(page);

        await page.goto(process.env.BASE_URL);
    });

    test('User success login', async ({ page }) => {

        await loginPage.validateLoginPage(expect);

        await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);
    
        expect(page.url()).toBe(`${process.env.BASE_URL}inventory.html`);
    
        await loginPage.validateLoginPageAfter(expect); 
    });    

    test('Validate that the user is on the dashboard after logging in', async ({ page }) => {
        
        await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);
        const isOnDashboard = await dashboardPage.validateOnDashboard();
        expect(isOnDashboard).toBeTruthy();

        await loginPage.validateLoginPageAfter(expect);
    });

    test('Add item to cart from dashboard', async ({ page }) => {
        
        await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);
        await dashboardPage.addItemToCart();

        const removeButtonVisible = await page.isVisible('button[data-test="remove-sauce-labs-backpack"]');
        expect(removeButtonVisible).toBeTruthy();

        await dashboardPage.validateAfterAddingItem(expect);
    });

    test('Validate item in cart', async ({ page }) => {

        await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);
        await dashboardPage.addItemToCart();
        await cartPage.navigateToCart();
    
        const itemInCart = await cartPage.validateItemInCart();
        expect(itemInCart).toBeTruthy();
    
        await cartPage.validateCartPage(expect);
    });
});