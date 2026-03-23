describe('Login scene', () => {
  beforeEach(() => cy.visit('/'));

  it('should render login form', () => {
    cy.contains('Login').should('be.visible');
    cy.get('input[name="user"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.contains('button', 'Login').should('be.visible');
  });

  it('should navigate to submodule list when credentials are valid', () => {
    cy.clock();

    cy.get('input[name="user"]').type('admin');
    cy.get('input[name="password"]').type('test');
    cy.contains('button', 'Login').click();

    cy.tick(1000);

    cy.location('hash').should('eq', '#/submodule-list');
  });

  it('should stay on login when credentials are invalid', () => {
    cy.clock();

    cy.get('input[name="user"]').type('wrong-user');
    cy.get('input[name="password"]').type('wrong-password');
    cy.contains('button', 'Login').click();

    cy.tick(1000);

    cy.location('hash').should('eq', '#/');
  });

  it('should show error alert when credentials are invalid', () => {
    cy.clock();

    cy.get('input[name="user"]').type('wrong-user');
    cy.get('input[name="password"]').type('wrong-password');
    cy.contains('button', 'Login').click();

    cy.tick(1000);

    cy.get('div[role="alert"]').should('be.visible').and('contain', 'Usuario y/o password no válidos');
  });

  it('should show validation errors when submitting empty form', () => {
    cy.contains('button', 'Login').click();

    cy.contains('Debe informar el campo').should('be.visible');
    cy.get('p.MuiFormHelperText-root').should('have.length', 2);
  });

  it('should focus user input when clicked', () => {
    cy.get('input[name="user"]').click().should('be.focused');
  });

  it('should focus password input when clicked', () => {
    cy.get('input[name="password"]').click().should('be.focused');
  });

  it('should submit form when pressing Enter', () => {
    cy.clock();

    cy.get('input[name="user"]').type('admin');
    cy.get('input[name="password"]').type('test{enter}');

    cy.tick(1000);

    cy.location('hash').should('eq', '#/submodule-list');
  });

  it('should render password input as password type', () => {
    cy.get('input[name="password"]').should('have.attr', 'type', 'password');
  });

  it('should render user and password labels', () => {
    cy.contains('label', 'Usuario *').should('be.visible');
    cy.contains('label', 'Contraseña *').should('be.visible');
  });

  it('should render empty form initially', () => {
    cy.get('input[name="user"]').should('have.value', '');
    cy.get('input[name="password"]').should('have.value', '');
  });

  it('should not show validation errors on initial render', () => {
    cy.contains('Debe informar el campo').should('not.exist');
  });

  it('should clear validation errors when user fills the fields', () => {
    cy.contains('button', 'Login').click();

    cy.get('p.MuiFormHelperText-root').should('have.length', 2);

    cy.get('input[name="user"]').type('admin');
    cy.get('input[name="password"]').type('test');

    cy.get('p.MuiFormHelperText-root').should('have.length', 0);
  });

  it('should show only password validation error when user is filled', () => {
    cy.get('input[name="user"]').type('admin');
    cy.contains('button', 'Login').click();

    cy.get('input[name="user"]').should('have.attr', 'aria-invalid', 'false');
    cy.get('input[name="password"]').should('have.attr', 'aria-invalid', 'true');
    cy.get('p.MuiFormHelperText-root').should('have.length', 1);
  });

  it('should show only user validation error when password is filled', () => {
    cy.get('input[name="password"]').type('test');
    cy.contains('button', 'Login').click();

    cy.get('input[name="user"]').should('have.attr', 'aria-invalid', 'true');
    cy.get('input[name="password"]').should('have.attr', 'aria-invalid', 'false');
    cy.get('p.MuiFormHelperText-root').should('have.length', 1);
  });
});