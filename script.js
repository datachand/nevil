(function () {

    angular.module('nevil', ['ngResource', 'ngSanitize', 'ngAnimate', 'ui.bootstrap', 'ui.router']);

    /** [NevilRun description] */
    function NevilRun ($rootScope, $log) {
        $log.log("Nevil");
    }

    NevilRun.$inject = ['$rootScope', '$log'];

    angular.module('nevil').run(NevilRun);

    /** [NevilConfiguration description] */
    function NevilConfiguration ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider.state("default", {
            url: "/",
            controller: "DefaultController",
            controllerAs: "dc",
            templateUrl: "default.html"
        });

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });
    }

    NevilConfiguration.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    angular.module('nevil').config(NevilConfiguration);


    /** [DefaultController description] */
    function DefaultController ($log) {
        $log.info("Default");

        this.sampleSet = [
            {"name": "Chart"},
            {"name": "Grid"}
        ];
    }

    DefaultController.$inject = ['$log'];

    angular.module('nevil').controller("DefaultController", DefaultController);


    /** [PanelDirective description] */
    function PanelDirective () {
        var directive = {
            link: link,
            templateUrl: 'panelDirective.html',
            restrict: 'EA',
            replace: true,
            controller: 'PanelDirectiveController',
            controllerAs: 'pdc',
            scope: {
                item: '@'
            },
            bindToController: true
        };

        return directive;

        function link (scope, element, attrs) {

        }
    }

    PanelDirective.$inject = [];

    angular.module('nevil').directive('panelDirective', PanelDirective);

    /** [PanelDirectiveController description] */
    function PanelDirectiveController ($log) {

        $log.info("Panel Directive Controller");

    }

    PanelDirectiveController.$inject = ['$log'];

    angular.module('nevil').controller('PanelDirectiveController', PanelDirectiveController);


})();