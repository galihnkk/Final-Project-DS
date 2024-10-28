class CartPage {
    
    constructor(page) {
        this.page = page;
        this.cartLink = '.shopping_cart_link';
        this.cartItem = '.cart_item';
    }

    async navigateToCart() {
        await this.page.click(this.cartLink);
    }

    async validateItemInCart() {
        return await this.page.isVisible(this.cartItem);
    }

    async takeScreenshot() {
        await this.page.screenshot({ path: 'screenshots/cartPage.png' });
    }

    async validateCartPage(expect) { 
        const screenshot = await this.page.screenshot();
        expect(screenshot).toMatchSnapshot('cartPage.png');
    }
}

module.exports = CartPage;