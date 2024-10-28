class LoginPage {
    
    constructor(page) {
        this.page = page;
        this.usernameInput = 'input[data-test="username"]';
        this.passwordInput = 'input[data-test="password"]';
        this.loginButton = 'input[data-test="login-button"]';
    }

    async login() {
        await this.page.screenshot({ path: 'screenshots/loginPage.png' });
        
        await this.page.fill(this.usernameInput, process.env.SAUCE_USERNAME);
        await this.page.fill(this.passwordInput, process.env.SAUCE_PASSWORD);
        await this.page.click(this.loginButton);
    }

    async takeScreenshotAfterLogin() {
        await this.page.screenshot({ path: 'screenshots/loginPageAfter.png' });
    }

    async validateLoginPage(expect) { 
        const screenshot = await this.page.screenshot();
        expect(screenshot).toMatchSnapshot('loginPage.png');
    }

    async validateLoginPageAfter(expect) {
        const screenshot = await this.page.screenshot();
        expect(screenshot).toMatchSnapshot('loginPageAfter.png');
    }
}

module.exports = LoginPage;