class DashboardPage {
    constructor(page) {
        this.page = page;
        this.pageTitle = '.title';
        this.addToCartButton = 'button[data-test="add-to-cart-sauce-labs-backpack"]';
    }

    async validateOnDashboard() {
        return await this.page.isVisible(this.pageTitle);
    }

    async validateDashboard() {
        await this.page.screenshot({ path: 'screenshots/dashboard.png' });
        const isVisible = await this.page.isVisible(this.pageTitle);
        return isVisible;
    }

    async addItemToCart() {
        await this.page.click(this.addToCartButton);
    }
}

module.exports = DashboardPage;