(function(){
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider){
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise('/');

    // *** Set up UI states ***
    $stateProvider

    // Home page
    .state('home', {
        url: '/',
        templateUrl: 'src/dishes/templates/home.template.html'
    })

    // Categories page
    .state('categories', {
        url: '/categories',
        templateUrl: 'src/dishes/templates/categories.template.html',
        controller: 'CategoriesController as ctrlCategories',
        resolve:{
            categories: ['MenuDataService', function(MenuDataService) {
                return MenuDataService.getAllCategories();
            }]
        }
    })

    // Items page
    .state('items', {
        url: '/categories/:categoryName-:categoryNameFull',
        templateUrl: 'src/dishes/templates/items.template.html',
        controller: 'ItemsController as ctrlItems',
        params: {
            categoryNameFull: null,
            categoryName: null
        },
        resolve:{
            items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
                return MenuDataService.getItemsForCategory($stateParams.categoryName);
            }]
        }
    });
}

})();
