describe("greet Module", function(){
    beforeEach(module("myApp.greet"));
    describe("greet controller", function(){
        it("Should initialize name with empty string", inject(function($controller){
            var dummyScope = {};
            $controller("greetCtrl", {$scope : dummyScope});
            expect(dummyScope.name).toBe('');
        }));

        it("Should populate the greetMsg when greeted", inject(function($controller){
            var dummyScope = {};
            var dummyService = {
                greet : function(){}
            };
            spyOn(dummyService, "greet").and.returnValue('dummy greet msg');
            $controller("greetCtrl", {$scope : dummyScope, greetService : dummyService});
            dummyScope.name = 'Magesh';
            dummyScope.greet();
            expect(dummyService.greet).toHaveBeenCalledWith('Magesh');
            expect(dummyScope.greetMsg).toBe('dummy greet msg');

        }));
    });
    describe("greet service", function(){
        it("should return the message when greeted", inject(function(greetService){
            var msg = greetService.greet('Magesh');
            expect(msg).toBe('Hi Magesh, Have a nice day!');
        }));
    });
    describe("trimText filter", function(){
        it("should return the original when the length is short", inject(function($filter){
            var shortString = 'a very short string';
            var filter = $filter('trimText');
            var output = filter(shortString, 30);
            expect(output).toBe(shortString);
        }));
    });
    describe("trimText filter", function(){
        it("should return the trimed value when the length is long", inject(function($filter){
            var shortString = 'a very long string';
            var expectedResult = shortString.substr(0,10) + '...';
            var filter = $filter('trimText');
            var output = filter(shortString, 10);
            expect(output).toBe(expectedResult);
        }));
    });
});
