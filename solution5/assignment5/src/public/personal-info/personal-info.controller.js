(function(){
    "use strict";

    angular.module('public')
    .controller('PersonalInfoController', PersonalInfoController);

    PersonalInfoController.$inject = ['MenuService', 'infoData'];
    function PersonalInfoController(MenuService, infoData){
        var $ctrl = this;

        if (infoData){
            $ctrl.infoData = infoData;
            MenuService.getMenuItem(infoData.favouriteDish)
            .then(function(response){
                $ctrl.menuItem = response;
            })
            .catch(function(response){
                console.log(response);
            });
        }
    }
})();
