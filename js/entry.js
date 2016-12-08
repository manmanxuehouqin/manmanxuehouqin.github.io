$(function(){
	/*鼠标事件*/
	var nav ={
		news: $('.xw'),
		newItem: $('.item-contw'),
		
		into: function(){
			//移入移出事件
			this.move();
		},
		//移入移出事件
		move: function(){
			var that = this
			this.news.mouseenter(function(){
				that.newItem.show();
			});
			this.news.mouseleave(function(){
				that.newItem.hide();
			});
		}
	}
	nav.into();
	/*表单验证*/
	var username = $('.username');
	var password = $('.password');
	var passwordCheck = $('.password-check');
	var submit = $('.submit');
	var message=$('.message');
	
	//定义用户名、密码、手机号验证规则
	//用户名
	var regUName =  /^1[358]\d{9}$/;
	var mail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	//密码长度
	var regPswLength = /^.{6,16}$/;
	
	//用户名失焦事件
	username.blur(function(){
		//获取用户名
		var uname = username.val();
		//用户名为空
		if( uname.length == 0 ){
			message.eq(0).html('请输入您的手机号或邮箱');
			$(this).css('border','1px solid red');
			return;
		}
		//用户名是否正确
		if( ( regUName.test(uname) ) || ( mail.test(uname) ) ){
			message.eq(0).html('');
			$(this).css('border','1px solid #bbb');
		}else{
			message.eq(0).html('请输入正确的手机号或邮箱。');
			$(this).css('border','1px solid red');
			return;
		}
	});
	
	//密码失焦事件
	password.blur(function(){
		//获取密码值
		var upsw = password.val();
		//密码是为空
		if(upsw.length == 0){
			message.eq(1).html('密码不能为空，请输入密码。');
			$(this).css('border','1px solid red');
			return;
		}
		//4、密码长度不合法
		if(!regPswLength.test(upsw)){
			message.eq(1).html('用户密码长度范围在6-16位之间。');
			$(this).css('border','1px solid #8E0C3A');
			return;
		}else{
			message.eq(1).html('');
			$(this).css('border','1px solid #bbb');
		}
	});
	//确认密码失焦 事件
	passwordCheck.blur(function(){
		//获取密码值
		var upsw = password.val();
		//获取确认密码值
		var upswCheck = passwordCheck.val();
		//确认密码为空
		if(upswCheck.length == 0){
			message.eq(2).html('请重新输入一次上面的密码。');
			$(this).css('border','1px solid red');
			return;
		}
		//两次密码不一致
		if(upsw != upswCheck){
			message.eq(2).html('您两次的密码密码不一致。');
			$(this).css('border','1px solid #8E0C3A');
			return;
		}else{
			message.eq(2).html('');
			$(this).css('border','1px solid #bbb');
		}
	});
	
	
		//点击注册判断事件
		var zhu=$(".zhu");
		zhu.click(function(){
			//获取用户名
			var uname = username.val();
			//获取密码值
			var upsw = password.val();
			//获取确认密码值
			var upswCheck = passwordCheck.val();
			//用户名检测
			//用户名是否正确
			if( ( regUName.test(uname) ) || ( mail.test(uname) ) ){
				message.eq(0).html('');
				$(this).css('border','1px solid #bbb');
			}else{
				message.eq(0).html('请输入正确的手机号或邮箱。');
				$(this).css('border','1px solid red');
				return;
			}
			/*此处省略密码验证吗等*/
			
			
			//注册完成
			if(hint.html()==''){
				alert("注册完成，正在提交。。。");
				
				$.cookie({'username':uname,'password':upsw,},{expires:7,path:'/'});
				location.href = 'enter.html';
			}nodeName
		});
	
	
});	
	
	
	
	
	
	
	

