require('dotenv').config();

const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageobjects/LoginPage');
const DashboardPage = require('../pageobjects/DashboardPage');
const CartPage = require('../pageobjects/CartPage');

test.describe('SauceDemo PO Tests', () => {
    let loginPage, dashboardPage, cartPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);
        cartPage = new CartPage(page);

        await page.goto(process.env.BASE_URL);
        await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);
    });

    test('User success login', async ({ page }) => {
        await page.goto(process.env.BASE_URL);
        await loginPage.login(process.env.SAUCE_USERNAME, process.env.SAUCE_PASSWORD);
        
        expect(page.url()).toBe(`${process.env.BASE_URL}inventory.html`);
    });
    
    test('Validate that the user is on the dashboard after logging in', async () => {
        const isOnDashboard = await dashboardPage.validateOnDashboard();
        expect(isOnDashboard).toBeTruthy();
        const isDashboardVisible = await dashboardPage.validateDashboard();
        expect(isDashboardVisible).toBe(true);
    });    

    test('Add item to cart from dashboard', async ({ page }) => {
        await dashboardPage.addItemToCart();
        const removeButtonVisible = await page.isVisible('button[data-test="remove-sauce-labs-backpack"]');
        expect(removeButtonVisible).toBeTruthy();
    });

    test('Validate item in cart', async () => {
        await dashboardPage.addItemToCart();
        await cartPage.navigateToCart();
        const itemInCart = await cartPage.validateItemInCart();
        expect(itemInCart).toBeTruthy();
    });
});
