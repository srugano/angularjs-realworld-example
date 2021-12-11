export default class User {
  constructor(JWT, AppConstants, $http, $state) {
    'ngInject';

    this._AppContstants = AppConstants;
    this._$http = $http;
    this._JWT = JWT;
    this._$state = $state;

    // Object to store our user properties
    this.current = null;

  }
  // Try to authenticate by registering or logging in 
  attemptAuth(type, credentials){
    let route = (type === 'login') ? '/login' : '';

    return this._$http({
      url: this._AppContstants.api + '/users' + route,
      method: 'POST',
      data: {
        user: credentials
      }
    }).then(
      // On success
      (res) => {
        // Set the JWT token
        this._JWT.save(res.data.user.token);

        // Store the user's info for easy lookup
        this.current = res.data.user;

        return res;
      }
    )
  }

  logout() {
    this.current = null;
    this._JWT.destroy();

    //Do a hard reload ot current state to ensure all data is flushed
    this._$state.go(this._$state.$current, null, { reload: true});
  }

}