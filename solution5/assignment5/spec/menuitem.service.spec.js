// testing controller
describe('SignUpController', function () {
    "use strict";

    var $httpBackend, ApiBasePath;
    var MenuService, MyInfoService;
    var SignUpController;
    var favItems = ['B10','F5','N0T'];
    var favResponse = [
        {
            "id":21,
            "short_name":"B10",
            "name":"Szechuan Soft Won Ton (8)",
            "description":"soft won tons filled with chicken, with garlic sauce",
            "price_small":null,
            "price_large":8.55,
            "small_portion_name":null,
            "large_portion_name":null,
            "created_at":"2018-04-10T18:08:53.578Z",
            "updated_at":"2018-04-10T18:08:53.578Z",
            "category_short_name":"B",
            "image_present":true
        },
        {
            "id":59,
            "short_name":"F5",
            "name":"Beef with Garlic Sauce",
            "description":"sliced beef sauteed in garlic sauce",
            "price_small":11.45,"price_large":15.45,
            "small_portion_name":"pint",
            "large_portion_name":"large",
            "created_at":"2018-04-10T18:08:54.414Z",
            "updated_at":"2018-04-10T18:08:54.414Z",
            "category_short_name":"F",
            "image_present":true
        },
        {"status":"500","error":"Internal Server Error"}
    ];

  beforeEach(function () {
    module('public');

    inject(function ($injector) {
      var $controller = $injector.get('$controller');
      MenuService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiBasePath = $injector.get('ApiPath');
      MyInfoService = $injector.get('MyInfoService');

      SignUpController = $controller('SignUpController', {
          MenuService: MenuService,
          MyInfoService: MyInfoService
      });
      $httpBackend.whenGET('src/public/public.html').respond('');
      $httpBackend.whenGET('src/public/home/home.html').respond('');
    });
  });

  it('should return TRUE for existing menu item B10.', function() {
      expect(SignUpController.invalidFavourite).not.toBeDefined();
      SignUpController.infoData = {
          'favouriteDish': favItems[0]
      };
      $httpBackend.whenGET(ApiBasePath + "/menu_items/" + favItems[0] + ".json").respond(favResponse[0]);
      SignUpController.validateFavourite(favItems[0]);
      $httpBackend.flush();
      expect(SignUpController.invalidFavourite).toEqual(false);
    });

    it('should return TRUE for existing menu item F5.', function() {
        expect(SignUpController.invalidFavourite).not.toBeDefined();
        SignUpController.infoData = {
            'favouriteDish': favItems[1]
        };
        $httpBackend.whenGET(ApiBasePath + "/menu_items/" + favItems[1] + ".json").respond(favResponse[1]);
        SignUpController.validateFavourite(favItems[1]);
        $httpBackend.flush();
        expect(SignUpController.invalidFavourite).toEqual(false);
      });

      it('should return FALSE for nonexisting menu item N0T.', function() {
          expect(SignUpController.invalidFavourite).not.toBeDefined();
          SignUpController.infoData = {
              'favouriteDish': favItems[2]
          };
          $httpBackend.whenGET(ApiBasePath + "/menu_items/" + favItems[2] + ".json").respond(favResponse[2]);
          SignUpController.validateFavourite(favItems[2]);
          $httpBackend.flush();
          expect(SignUpController.invalidFavourite).toEqual(false);
        });
 });
