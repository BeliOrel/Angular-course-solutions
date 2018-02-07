(function(){
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
.constant('NoResult', "Nothing found!")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective(){
    var ddo = {
        restrict: 'E',
        templateUrl: "foundItem.html",
        scope: {
            found: '<',
            onRemove: '&',
            empty: '<'
        }
    };
    return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService', 'NoResult'];
function NarrowItDownController(MenuSearchService, NoResult){
    var ctrl = this;

    ctrl.empty = "";

    ctrl.getItems = function(){
        if (!ctrl.searchTerm || ctrl.searchTerm.length === 0){
            ctrl.empty = NoResult;
            ctrl.found = [];
        }
        else{
            var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
            promise.then(function(response){
                if (response.length === 0){
                    ctrl.empty = NoResult;
                    ctrl.found = [];
                }
                else{
                    if (ctrl.empty === NoResult){
                        ctrl.empty = "";
                    }
                    ctrl.found = response;
                }
            })
            .catch(function(error){
                console.log("Something went terribly wrong. -> " + error);
            });
        }
    };

    ctrl.removeItem = function(index){
        MenuSearchService.removeItem(index);
    }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath){
    var service = this;
    var foundItems = [];

    service.getMatchedMenuItems = function(searchTerm){
        var response = $http({
            method: "GET",
            url: (ApiBasePath + "/menu_items.json")
        })
        .then(function(response){
            var fullList = response.data.menu_items;
            var n = fullList.length;
            foundItems = [];

            for (var i = 0; i < n; i++){
                if (-1 < fullList[i].description.search(searchTerm)){
                    foundItems.push(fullList[i]);
                }
            }

            return foundItems;
        })
        .catch(function(error){
            console.log("Error-promise: " + error);
        });

        return response;
    };

    service.removeItem = function(index){
        foundItems.splice(index,1);
        return foundItems;
    }
}

})();
