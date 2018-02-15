(function(){
'use strict';

angular.module('MenuApp')
.component('categories', {
    templateUrl: 'src/dishes/templates/categories-details.template.html',
    bindings: {
        categories: '<'
    }
});

})();
