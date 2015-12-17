/**
 * @author LiPeng
 */
var myApp = angular.module("myApp", ["ionic","ngCordova","chart.js","ui.bootstrap","App.ctrl","App.service"]);
myApp.constant("loginUser");
var user;
myApp.config(function($ionicConfigProvider,$stateProvider,$urlRouterProvider){
	$ionicConfigProvider.platform.ios.tabs.style('standard');
    $ionicConfigProvider.platform.ios.tabs.position('bottom');
    $ionicConfigProvider.platform.android.tabs.style('standard');
    $ionicConfigProvider.platform.android.tabs.position('standard');
    
    $ionicConfigProvider.platform.ios.navBar.alignTitle('center');
    $ionicConfigProvider.platform.android.navBar.alignTitle('left');
    
    $ionicConfigProvider.platform.ios.backButton.previousTitleText('').icon('ion-ios-arrow-thin-left');
    $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
    
    $ionicConfigProvider.platform.ios.views.transition('ios');
    $ionicConfigProvider.platform.android.views.transition('android');
    $stateProvider.state("app", {
        url: "/app",
        abstract: true,
        templateUrl: "pages/template/tabs.html",
		controller:"commonCtrl"
    });
    $stateProvider.state('app.home', {
        url: "/home",
        views: {
            "homeContent": {
                templateUrl: "pages/template/home.html",
                controller: "homeCtrl"
            }
        },
		onEnter:function($ionicSlideBoxDelegate){
			$ionicSlideBoxDelegate.$getByHandle("homeCarouse").start();
		}
    });
	$stateProvider.state('app.work', {
        url: "/work",
        views: {
            "workContent": {
                templateUrl: "pages/template/work.html",
                controller: "workCtrl"
            }
        }
    });
	$stateProvider.state('app.mail',{
		url:"/mail",
		views:{
			"mailContent":{
				templateUrl:"pages/template/mail.html",
				controller:"mailCtrl"
			}
		}
	});
	$stateProvider.state('person', {
        url: "/person",
        templateUrl: "pages/template/person.html",
        controller: "personCtrl",
		onEnter:function($state,loginUser){
//			event.preventDefault();
//			if(typeof(loginUser) == "undefined"){
//				$state.go("login");
//			}
		}
    });
	$stateProvider.state('login',{
		url:"/login",
		templateUrl:"pages/template/login.html",
		controller:"loginCtrl",
		onEnter:function(){
			//alert("qqqqqqqqqqqqq");
		},
		onExit:function(){
			//alert("ffffffffffff");
		}
	});
	$stateProvider.state('product',{
		url:"/common/product/:id/name/:name",
		templateUrl:"pages/common/product.html",
		controller:"productCtrl"
	});
	$stateProvider.state('search',{
		url:"/search",
		templateUrl:"pages/template/search.html",
		controller:"searchCtrl"
	});
	$stateProvider.state('info_detail',{
		url:"/common/info_detail/:title/id/:id",
		templateUrl:"pages/common/info_detail.html",
		controller:"infoCtrl"
	});
	$urlRouterProvider.otherwise('/app/home');
	
});
myApp.run(function($rootScope,$ionicNavBarDelegate,$state,$ionicPlatform,$timeout,$cordovaSplashscreen){
	$ionicPlatform.ready(function() {
  		$timeout(function(){
			$cordovaSplashscreen.hide();
		},1000);
 	});
	/**
	 * 全局返回方法
	 */
	$rootScope.goBack=function(){
		$ionicNavBarDelegate.back();
	}
	$rootScope.$on("$stateChangeStart",function(event, toState, toParams, fromState, fromParams){
		if(toState.name=="person"){
			if(typeof(user) == "undefined"){
				event.preventDefault();
				$state.go("login");
			}
		}
	});	
});
document.addEventListener('deviceready', function() {
    angular.bootstrap(document, ['myApp']);
}, false);
