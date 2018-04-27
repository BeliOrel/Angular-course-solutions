(function(){
    "use strict";

    angular.module('public')
    .controller('SignUpController', SignUpController);

    SignUpController.$inject = ['MenuService', 'MyInfoService'];
    function SignUpController(MenuService, MyInfoService){
        var $ctrl = this;
        $ctrl.submitted = false;
        $ctrl.infoData = {};

        $ctrl.submit = function(){
            MenuService.getMenuItem($ctrl.infoData.favouriteDish)
            .then(function(response){
                $ctrl.submitted = true;
                $ctrl.invalidFavourite = false;
                // save data
                MyInfoService.setInfo($ctrl.infoData);
            })
            .catch(function(){
                $ctrl.invalidFavourite = true;
            });
        }

        $ctrl.validateFavourite = function(){
            MenuService.getMenuItem($ctrl.infoData.favouriteDish)
            .then(function(){
                $ctrl.invalidFavourite = false;
            })
            .catch(function(){
                $ctrl.invalidFavourite = true;
            });
        }
    }
})();
