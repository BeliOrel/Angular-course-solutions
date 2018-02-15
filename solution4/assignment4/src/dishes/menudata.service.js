(function() {
'use strict';

angular.module('MenuApp')
.service('MenuDataService', MenuDataService)
.constant('BasePath', "https://davids-restaurant.herokuapp.com");


MenuDataService.$inject = ['$http', 'BasePath'];
function MenuDataService($http, BasePath){
    var service = this;

    // list of Categories
    var categories = [];

    //list of Items for a particular category
    var items = [];

    service.getAllCategories = function(){
        var response = $http({
            method: "GET",
            url: (BasePath + "/categories.json")
        })
        .then(function(response){
            categories = response.data;

            return categories;
        })
        .catch(function(error){
            console.log("Error-promise (service - categories): ", error);
        });

        return response;
    }

    service.getItemsForCategory = function(categoryShortName){
        var response = $http({
            method: "GET",
            url: (BasePath + "//menu_items.json?category=" + categoryShortName)
        })
        .then(function(response){
            items = response.data.menu_items;

            return items;
        })
        .catch(function(error){
            console.log("Error-promise (service - items): ", error);
        });

        return response;
    }
}

})();
