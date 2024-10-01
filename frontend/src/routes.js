const apiPath = '/api/v1';

export default {
  chatPagePath: () => '/',
  loginPagePath: () => '/login',
  signUpPagePath: () => '/signup',
  loginApiPath: () => [apiPath, 'login'].join('/'),
  dataApiPath: () => [apiPath, 'data'].join('/'),
  signUpApiPath: () => [apiPath, 'signup'].join('/'),
};
