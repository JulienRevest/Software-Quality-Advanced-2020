import { AppPage } from './app.po';
import { browser, logging, element, by, ElementFinder, ElementArrayFinder, protractor } from 'protractor';

const testRightLogin = 'Blopinou47';
const testWrongLogin = 'Blop';
const testRightPassword = 'ImAStrongPassword';
const testWrongPassword = 'pass';


describe('workspace-project App', () => {
  
  beforeAll(() => browser.get(''));


  // On récupère les éléments pour y avoir accès plus facilement lors des tests
  function getPageElts() {
    const navElts = element.all(by.css('app-root div div a'));
    return {
      navElts,
      appHomeHref: navElts.get(0),
      appHome: element(by.css('app-root app-accueil')),
      appSignInHref: navElts.get(1),
      appSignIn: element(by.css('app-root app-signin')),
      appSignUpHref: navElts.get(2),
      appSignUp: element(by.css('app-root app-signup')),
      searchBox: element(by.css('#searchBox'))
    }
  }

  // L'app a été changée, ce test n'est plus valide :
  // it('should display welcome message', () => {
  //   expect(browser.getTitleText()).toEqual('App-SQA app is running!');
  // });

  describe('Initial page', () => {

    it(`has title '${expectedTitle}'`, () => {
      expect(browser.getTitle()).toEqual(expectedTitle);
    });

    it('has accueil as the active view', () => {
      const page = getPageElts();
      expect(page.appHome.isPresent()).toBeTruthy();
    });

    it('displays correctly styled menu', async () => {
      element.all(by.css('app-root div a')).then(navElts => {
        for (const NavElts of navElts) {
          expect(NavElts.getCssValue('display')).toBe('inline-block');
          expect(NavElts.getCssValue('color')).toBe('rgba(255, 255, 255, 1)');
          expect(NavElts.getCssValue('text-align')).toBe('center');
          expect(NavElts.getCssValue('padding')).toBe('14px');
          expect(NavElts.getCssValue('text-decoration')).toContain('none');
        }
      })
    });
  })

  describe('Home test', () => {

    it('should display message', () => {
      const page = getPageElts();
      expect(page.appHome.isPresent()).toBeTruthy();
      expect(page.appHomeForm.getText()).toEqual('This is home page')
    });

  });  

  describe('SignIn test', () => {

    beforeAll(() => browser.get(''));

    // On arrive bien sur la page de login depuis l'accueil
    it('can switch to signIn view', () => {
      getPageElts().appSignInHref.click();
      browser.waitForAngular();
      const page = getPageElts();
      expect(page.appSignIn.isPresent()).toBeTruthy();
    });

    // On ne peut pas se connecter sans rentrer de login / nom d'utilisateur
    it('does not connect without login', () => {
      const passInput = element(by.css('#password'));
      const submitButton = element(by.buttonText('Se connecter'));
      // On clear le / les inputs au cas où
      passInput.clear();
      passInput.sendKeys(testRightPassword);
      submitButton.click();
      expect(element(by.cssContainingText("*", "Le nom d'utilisateur / login est requis")).isPresent()).toBeTruthy();
    });

    // On ne peut pas se connecter sans rentrer de mot de passe
    it('does not connect without password', () => {
      const passInput = element(by.css('#password'));
      const loginInput = element(by.css('#username'));
      const submitButton = element(by.buttonText('Se connecter'));
      browser.sleep(2000);
      // On clear le / les inputs au cas où

      passInput.clear().then(()=>{
        browser.sleep(2000);
        passInput.sendKeys(" ");
        passInput.sendKeys(protractor.Key.BACK_SPACE);
        browser.sleep(2000);
        loginInput.sendKeys(testRightLogin);
        browser.sleep(2000);
        submitButton.click();
        browser.sleep(10000);
        expect(element(by.cssContainingText("*", "Le mot de passe est obligatoire")).isPresent()).toBeTruthy();
      })
    });

    // On ne peut pas se connecter sans avoir un login valide
    it('does not connect with invalid login', () => {
      const passInput = element(by.css('#password'));
      const loginInput = element(by.css('#username'));
      const submitButton = element(by.buttonText('Se connecter'));
      // On clear le / les inputs au cas où
      loginInput.clear();
      passInput.clear();
      loginInput.sendKeys(testWrongLogin);
      passInput.sendKeys(testRightPassword);
      submitButton.click();
      expect(element(by.cssContainingText("*", "Le nom d'utilisateur / login doit contenir au moins 5 caractères")).isPresent()).toBeTruthy();
    });

    // On ne peut pas se connecter sans avoir un mot de passe valide
    it('does not connect with invalid password', () => {
      const passInput = element(by.css('#password'));
      const loginInput = element(by.css('#username'));
      const submitButton = element(by.buttonText('Se connecter'));
      // On clear le / les inputs au cas où
      loginInput.clear();
      passInput.clear();
      loginInput.sendKeys(testRightLogin);
      passInput.sendKeys(testWrongPassword);
      submitButton.click();
      expect(element(by.cssContainingText("*", "Le mot de passe doit contenir au moins 5 caractères")).isPresent()).toBeTruthy();
    });

  });

  describe('SignUp test', () => {

    it('can switch to SignUp view', () => {
      getPageElts().appSignUpHref.click();
      const page = getPageElts();
      expect(page.appSignUp.isPresent()).toBeTruthy();
      expect(page.appSignUpForm.getText()).toEqual('This is a register page')
    });

  });
  
  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});