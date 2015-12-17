/**
 * @author LiPeng
 */
var ctrl=angular.module("App.ctrl",[]);
ctrl.controller("homeCtrl",["$scope","initService","$ionicSlideBoxDelegate","$timeout","$state","$ionicScrollDelegate","popService",function(a,b,c,d,e,f,g){
	b.getCarouselImages().then(function(data){
		a.cImages=data;
		c.update();
	},function(error){
		g.alertNetError();
	});
	b.getNoticeList().then(function(data){
		a.notices=data;
	},function(error){
		console.log(error);
		g.alertNetError();
	});
	a.rePlay=function(){
		c.$getByHandle("homeCarouse").slide(0);
	}
	a.slideHasChanged=function(index){
		if(index==3){
			d(a.rePlay,3000);
		}
	}
	a.showImageDetail=function(product){
		e.go("product",product);
		//alert(id);
	}
	f.$getByHandle("noticeScoll").scrollBottom();
	var i=1;
	setInterval(function(){
		if(i==3)i=0;
		f.$getByHandle("noticeScoll").scrollTo(0,25*i++,true);
	},3000);
}]);
ctrl.controller("commonCtrl",["$scope","$ionicSideMenuDelegate","$state",function(a,b,c){
	a.menuToggle=function(){
		b.toggleLeft();
	}
//	a.goPerson=function(){
//		if (typeof(user) == "undefined") {
//			c.go("login");
//		}
//		else {
//			c.go("person");
//		}
//	}
}]);
ctrl.controller("workCtrl",["$scope",function(a){
	a.labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    a.series = ['Series A', 'Series B'];
    a.data = [
      [65, 59, 80, 81, 56, 55, 40],
      [28, 48, 40, 19, 86, 27, 90]
    ];
    a.onClick = function (points, evt) {
      console.log(points, evt);
    };
    a.onHover = function (points) {
      if (points.length > 0) {
        console.log('Point', points[0].value);
      } else {
        console.log('No point');
      }
    };

	a.labels1 = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    a.data1 = [300, 500, 100];
	
	a.labels2 =["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"];

 	a.data2 = [
    [65, 59, 90, 81, 56, 55, 40],
    [28, 48, 40, 19, 96, 27, 100]
  ];
}]);
ctrl.controller("mailCtrl",["$scope",function(a){
	
}]);
ctrl.controller("personCtrl",["$scope","$ionicNavBarDelegate","userService","$state",function(a,b,c,d){

//	c.getUserData().then(function(data){
//		console.log(data);
//	});
}]);
ctrl.controller("loginCtrl",["$scope","userService","$state",function(a,b,c){
	a.rs=true;
	a.login=function(){
		if(typeof(a.user)=="undefined"){
			a.msg="用户名密码不能为空！";
			a.rs=false;
			return;
		}
		b.userLogin(a.user).then(function(data){
			a.rs=data;
			if (data) {
				user=a.user;
				c.go("person");
			}else{
				a.msg="用户名或密码错误！";
			}	
		},function(error){
			alert("网络异常！请检查你的网络设置");
		});
	}
}]);
ctrl.controller("productCtrl",["$scope","$stateParams",function(a,b){
//	alert("qqqqqqqqq");
//	console.log(b);
}]);
ctrl.controller("searchCtrl",["$scope","$ionicScrollDelegate",function(a,b){
	a.items=[];
    a.loadData = function(){
		var length=a.items.length;
        for (var i = 1+length; i <= 10+length; i++) {
            var item = {
                "id": "img" + i + ""
            };
            a.items.push(item);
        }
    }
	a.loadData();
	
	a.loadMore=function(){
		a.loadData();
		a.$broadcast('scroll.infiniteScrollComplete');
	}
	
	a.maxMore=function(){
		return a.items.length>=50?false:true;
	}
	
}]);
ctrl.controller("infoCtrl",["$scope","$stateParams","infoService","popService","utilService",function(a,b,c,d,e){
	a.title = b.title;
	c.getNoticeDeail().then(function(data){
		a.notice=data;
	},function(error){
		d.alertNetError();
	});
	a.previewFile=function(file){
		e.previewPDF(file);
	}
}]);
