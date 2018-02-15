(function(){
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

ItemsController.$inject = ['$stateParams', 'items'];
function ItemsController($stateParams, items){
    var ctrlItems = this;
    ctrlItems.category = $stateParams.categoryNameFull;
    ctrlItems.items = items
}

})();
