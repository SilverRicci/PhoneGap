/**
 * @author LiPeng
 */
var service = angular.module("App.service", []);
var host = "http://192.168.95.2:8080/PhoneGap/";
service.service("initService", function($http, $q){
	/**
	 * 加载轮播图片
	 */
    this.getCarouselImages = function(){
        var deferred = $q.defer();
        $http.jsonp(host + "loadImgs.do?callback=JSON_CALLBACK").success(function(data){
			for(var i=0;i<data.length;i++){
				data[i].src=host+data[i].path+data[i].filename;
			}
            deferred.resolve(data);
        }).error(function(data, status, headers, config){
            deferred.reject(status);
        });
        return deferred.promise;
    }
	/**
	 * 加载通知信息
	 */
	this.getNoticeList=function(){
		var deferred = $q.defer();
		$http.jsonp(host+"loadNoticeList.do?callback=JSON_CALLBACK").success(function(data){
			deferred.resolve(data);
		}).error(function(data, status, headers, config){
			 deferred.reject(status);
		});
		return deferred.promise;
	}
    return this;
});
service.service("fileService",function($http,$q){
	this.previewPDF=function(){
		var deferred = $q.defer();
		$http.jsonp(host+"loadNoticeList?callback=JSON_CALLBACK").success(function(data){
			deferred.reject(data);
		}).error(function(data, status, headers, config){
			 deferred.reject(status);
		});
		return deferred.promise;
	}
});
service.service("userService",function($http,$q){
	this.getUserData=function(){
		var deferred = $q.defer();
		$http.jsonp(host+"user/loadUserData.do?callback=JSON_CALLBACK").success(function(data){
			 deferred.resolve(data);
		}).error(function(reason){
			deferred.reject(reason);
		});
		return deferred.promise;
	}
	this.userLogin=function(user){
		var deferred = $q.defer();
		var config={
			params:user
		};
		$http.jsonp(host+"user/userLogin.do?callback=JSON_CALLBACK",config).success(function(data){
			deferred.resolve(data);
		}).error(function(data, status, headers, config){
			deferred.reject(data);
		});
		return deferred.promise;
	}
	return this;
});
service.service("utilService",function($cordovaInAppBrowser){
	var options = {
      location: 'no',
      clearcache: 'yes',
      toolbar: 'no',
	  enableviewportscale:'yes'
    };
	this.previewPDF=function(file){
//		var ref = cordova.InAppBrowser.open(host+'app/pdfview/viewer.html?file='+file+'', '_self', 'location=yes');
//	    cordova.exec(function(response){console.log("==========================222222222222222");}, function(errorText){console.log("==========================3333333333333"+errorText);}, "InAppBrowser", "open", [host+'app/pdfview/viewer.html?file='+file+'', '_self', 'location=yes']);
		$cordovaInAppBrowser.open(host+'app/pdfview/viewer.html?file='+file+'', '_blank', options).then(function(event) {
			console.log("============$cordovaInAppBrowser"+event);
      	}).catch(function(event) {
			console.log("++++++++++++"+event);
      	});
//		$cordovaInAppBrowser.close();
	}
	return this;
});
service.factory('HitService', function($q, $http){
    var service = {
        count: function(){
            var d = $q.defer();
            $http.jsonp('http://192.168.1.108:8080/PhoneGap/loadImgs.do?callback=JSON_CALLBACK').success(function(data, status){
                d.resolve(data);
            }).error(function(data, status){
                d.reject(data);
            });
            return d.promise;
        }
    }
    return service;
});
service.service("popService",function($ionicPopup){
	var ops_1={
  		title: '提示', // String. 弹窗的标题。
  		subTitle: '', // String (可选)。弹窗的子标题。
  		template: '<i class="iconfont ">&#xe611;</i><font>网络异常！请检查你的网络设置</font>', // String (可选)。放在弹窗body内的html模板。
  		templateUrl: '', // String (可选)。 放在弹窗body内的html模板的URL。
  		okText: '确定', // String (默认: 'OK')。OK按钮的文字。
  		okType: '', // String (默认: 'button-positive')。OK按钮的类型。
	}
	this.alertNetError=function(){
		var obj = $ionicPopup.alert(ops_1);
	}
	return this;
});
service.service("infoService",function($http,$q){
	this.getNoticeDeail=function(){
		var deferred = $q.defer();
		$http.jsonp(host+"getNoticeDetail.do?callback=JSON_CALLBACK").success(function(data){
			deferred.resolve(data);
		}).error(function(data, status, headers, config){
            deferred.reject(status);
        });
        return deferred.promise;
	}
	return this;
});
