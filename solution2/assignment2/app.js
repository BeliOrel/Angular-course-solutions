(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

// to buy list
ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService){
    var toBuyCtrl = this;

    toBuyCtrl.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

    toBuyCtrl.moveItem = function(itemIndex){
        ShoppingListCheckOffService.moveItem(itemIndex);
    }

    toBuyCtrl.errorMessage = function(){
        if(toBuyCtrl.itemsToBuy.length > 0){
            return false;
        }
        return true;
    }
};

// already bought list
AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
    var boughtCtrl = this;

    boughtCtrl.boughtItems = ShoppingListCheckOffService.getBoughtItems();
    boughtCtrl.errorMessage = function(){
        if(boughtCtrl.boughtItems.length > 0){
            return false;
        }
        return true;
    }
}

function ShoppingListCheckOffService(){
    var service = this;

    // list of items to buy
    var itemsToBuy = [
        {name: "Pineapples", quantity: 3},
        {name: "Yougurts", quantity: 10},
        {name: "Chocolates", quantity: 5},
        {name: "Whiskey", quantity: 1},
        {name: "Caffe", quantity: 3},
        {name: "Bio Milk", quantity: 2}
    ];

    // list of already bought items
    var boughtItems = [];

    service.getItemsToBuy = function(){
        return itemsToBuy;
    };

    service.getBoughtItems = function(){
        return boughtItems;
    };

    service.moveItem = function(itemIndex){
        var item = itemsToBuy[itemIndex];
        boughtItems.push(item);
        itemsToBuy.splice(itemIndex, 1);
    };
}

})();
