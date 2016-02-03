(function () {

    'use strict';

    angular.module('nevil', ['ui.bootstrap', 'ui.router', 'thinhelp']);

    /**
     * [NevilRun description]
     * @param {[type]} $rootScope [description]
     * @param {[type]} $log       [description]
     */
    function NevilRun ($rootScope, $log) {
        $log.log("Nevil");
    }

    NevilRun.$inject = ['$rootScope', '$log'];

    angular.module('nevil').run(NevilRun);

    /**
     * [NevilConfiguration description]
     * @param {[type]} $stateProvider     [description]
     * @param {[type]} $urlRouterProvider [description]
     * @param {[type]} $locationProvider  [description]
     */
    function NevilConfiguration ($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider.state("default", {
            url: "/",
            controller: "DefaultController",
            controllerAs: "dc",
            templateUrl: "default.html"
        });

        // $locationProvider.html5Mode({
        //     enabled: true,
        //     requireBase: false
        // });
    }

    NevilConfiguration.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    angular.module('nevil').config(NevilConfiguration);


    /**
     * [DefaultController description]
     * @param {[type]} $log [description]
     */
    function DefaultController ($log) {
        $log.info("Default");

        this.sampleSet = [
            {"name": "Chart"},
            {"name": "Grid"}
        ];
    }

    DefaultController.$inject = ['$log'];

    angular.module('nevil').controller("DefaultController", DefaultController);


    /**
     * [PanelDirective description]
     */
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

    /**
     * [PanelDirectiveController description]
     * @param {[type]} $log                        [description]
     * @param {[type]} ContextSensitiveHelpService [description]
     */
    function PanelDirectiveController ($log, ContextSensitiveHelpService) {
        $log.info("Panel Directive Controller");
        ContextSensitiveHelpService.setHelpDataByKey(this.item, "Help " + this.item);
    }

    PanelDirectiveController.$inject = ['$log', 'ContextSensitiveHelpService'];

    angular.module('nevil').controller('PanelDirectiveController', PanelDirectiveController);

})();

(function () {

    'use strict';

    angular.module('thinhelp', ['ngResource', 'ngSanitize', 'ngAnimate']);

    function ThinHelpConfiguration ($uibTooltipProvider) {    
        var triggers = {
            'openTrigger': 'closeTrigger'
        };

        $uibTooltipProvider.setTriggers(triggers);
    }    

    ThinHelpConfiguration.$inject = ['$uibTooltipProvider'];

    angular.module('thinhelp').config(ThinHelpConfiguration);

    /**
     * [ContextSensitiveHelp description]
     */
    function ContextSensitiveHelpDirective () {

        var directive = {
            link: link,
            templateUrl: 'contextSensitiveHelp.html',
            restrict: 'EA',
            replace: true,
            controller: "ContextSensitiveHelpController",
            controllerAs: "cshc",
            bindToController: true,
            scope: {
                context: '@'
            }
        };

        return directive;

        function link (scope, element, attrs) {

        }

    }

    ContextSensitiveHelpDirective.$inject = [];

    angular.module('thinhelp').directive('contextSensitiveHelpDirective', ContextSensitiveHelpDirective);

    /**
     * [ContextSensitiveHelpController description]
     * @param {[type]} $log [description]
     */
    function ContextSensitiveHelpController ($log, ContextSensitiveHelpService) {
        $log.info("Context Sensitive Help Controller");

        $log.log(ContextSensitiveHelpService.getHelpDataByKey(this.context));

        this.contextHelpData = ContextSensitiveHelpService.getHelpDataByKey(this.context);

        this.status = {
            isOpen: false
        };

        this.togglePopover = function ($event) {
            this.status.isOpen = !this.status.isOpen;
            $log.log("isOpen " + this.status.isOpen);
        };
    }

    ContextSensitiveHelpController.$inject = ['$log', 'ContextSensitiveHelpService'];

    angular.module('thinhelp').controller('ContextSensitiveHelpController', ContextSensitiveHelpController);

    /**
     * [ContextSensitiveHelpService description]
     * @param {[type]} $log [description]
     */
    function ContextSensitiveHelpService ($log) {
        $log.log("Context Sensitive Help Service");

        var self = this;

        this.helpData = {};

        this.removeHelpDataByKey = function (key) {
            key = angular.lowercase(key);
        };

        this.setHelpDataByKey = function (key, text) {
            key = angular.lowercase(key);
            self.helpData[key] = text;
        };

        this.getHelpDataByKey = function (key) {
            key = angular.lowercase(key);
            return self.helpData[key];
        };

        this.getHelpData = function () {
            return self.helpData;
        };

        this.setHelpData = function (helpData) {
            self.helpData = helpData;
        };
    }

    ContextSensitiveHelpService.$inject = ['$log'];

    angular.module('thinhelp').service('ContextSensitiveHelpService', ContextSensitiveHelpService);


    function PopoverToggleDirective ($log) {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function link (scope, element, attrs) {
            $log.log(attrs);
            $log.log(element.triggerHandler('openTrigger'));
        }
    }

    PopoverToggleDirective.$inject = ['$log'];

    angular.module('thinhelp').directive('popoverToggle', PopoverToggleDirective);

})();
