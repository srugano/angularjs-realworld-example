import angular from 'angular';

// Create the module where our functionality can attach to
let servicesModule = angular.module('app.services', []);


// Services
import UserService from './user.service';
servicesModule.service('User', UserService);

import JwtService from './jwt.service';
servicesModule.service('JWT', JwtService);

export default servicesModule;
