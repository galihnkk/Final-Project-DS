class DashboardPage {
    
    constructor(page) {
        this.page = page;
        this.pageTitle = '.title';
        this.addToCartButton = 'button[data-test="add-to-cart-sauce-labs-backpack"]';
        this.removeButton = 'button[data-test="remove-sauce-labs-backpack"]';
        this.backpackImage = 'img[alt="Sauce Labs Backpack"]'; 
    }

    async validateOnDashboard() {
        return await this.page.isVisible(this.pageTitle);
    }

    async addItemToCart() {
        await this.page.click(this.addToCartButton);
    }

    async validateItemAdded() {
        return await this.page.isVisible(this.removeButton);
    }

    async takeScreenshotOnDashboard() {
        await this.page.screenshot({ path: 'screenshots/dashboardPage.png' });
    }

    async takeScreenshotAfterAddingItem() {
        await this.page.screenshot({ path: 'screenshots/dashboardItem.png' });
    }

    async validateDashboardPage(expect) {
        const screenshot = await this.page.screenshot();
        expect(screenshot).toMatchSnapshot('dashboardPage.png');
    }

    async validateAfterAddingItem(expect) {
        const screenshot = await this.page.screenshot();
        expect(screenshot).toMatchSnapshot('dashboardItem.png');
    }
}

module.exports = DashboardPage;