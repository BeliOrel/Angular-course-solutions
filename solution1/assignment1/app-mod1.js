(function(){
    'use strict';

    angular.module('LunchCheck', [])
    .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];
    function LunchCheckController($scope) {
        $scope.items = "";
        var numberItems = -1;
        $scope.styleText = "green";
        $scope.styleBorder = "";

        $scope.itemsMsg = function(){
            if (numberItems == -1){
                return "";
            }
            else if (numberItems == 0){
                $scope.styleBorder = "border:1px solid red";
                $scope.styleText = "red";
                return "Please enter data first!";
            }
            else if (numberItems > 3){
                $scope.styleBorder = "border:1px solid green";
                $scope.styleText = "green";
                return "Too much!";
            }
            else if (numberItems <= 3){
                $scope.styleBorder = "border:1px solid green";
                $scope.styleText = "green";
                return "Enjoy!";
            }
        };

        $scope.countItems = function(){
            var itemsArray = $scope.items.split(',');
            var itemsNewArray = [];
            for (var i=0; i<itemsArray.length; i++){
                if(itemsArray[i].trim().length > 0){
                    itemsNewArray.push(itemsArray[i]);
                }
            }
            numberItems = itemsNewArray.length;
            console.log('number of items: ' + numberItems);
        };
    }

})();
