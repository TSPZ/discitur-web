﻿angular.module("Discitur",
    [
        'ui.router',
        'Common',
        'Lesson'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        // For any unmatched url, redirect to HomePage
        $urlRouterProvider.otherwise('/project/home');

        $stateProvider
            //MasterPages (Abstract States)
            .state('master', {
                url: '',
                abstract: true,
                templateUrl: 'masterpages/master.html'
            })
            // One Column Layout (Abstract States)
            .state('master.1cl', {
                url: '/project',
                abstract: true,
                parent: 'master',
                templateUrl: 'masterpages/1cl.html'
            })
            // Two Columns Layout (Abstract States)
            .state('master.2cl', {
                url: '',
                abstract: true,
                parent: 'master',
                templateUrl: 'masterpages/2cl.html'
            })
            // Web Site (Content States)
            .state('master.1cl.home', {
                url: '/home',
                parent: 'master.1cl',
                templateUrl: 'modules/main/site/HomePage.html'
            })
            .state('master.1cl.mission', {
                url: '/mission',
                parent: 'master.1cl',
                templateUrl: 'modules/main/site/Project.html'
            })

    })
    .constant('DisciturSettings', {
        apiUrl: 'http://localhost:59739/api/'
    })
    .factory('DiscUtil', function () {
        return {
            checkInputObj: function (functionName, validInput, actualInput) {
                // accept or no params or Object (for searching parameters)
                if (!angular.isUndefined(actualInput) && !(actualInput.constructor === Object))
                    throw { code: 20001, message: 'invalid Input Type for ' + functionName + ' :' + actualInput }
                if (angular.isDefined(actualInput)) {
                    for (key in actualInput) {
                        if (!validInput.hasOwnProperty(key))
                            throw { code: 20002, message: 'invalid Input Parameter for ' + functionName + ' :' + actualInput }
                        // If not passed in actualInput and if defined in validInput, set default value
                        //if (angular.isUndefined(actualInput[key]) && validInput[key] != null)
                        //    actualInput[key] = validInput[key];
                    }
                }
                // If not passed in actualInput and if defined in validInput, set default value
                for (key in validInput) {
                    if (angular.isUndefined(actualInput[key]) && validInput[key] != null)
                        actualInput[key] = validInput[key];
                }

            }

        }


    })
