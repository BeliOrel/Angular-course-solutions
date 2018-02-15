(function(){
'use strict';

angular.module('MenuApp')
.component('items', {
    templateUrl: 'src/dishes/templates/items-details.template.html',
    bindings: {
        items: '<'
    }
});

})();
