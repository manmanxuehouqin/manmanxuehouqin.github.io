
$(function(){
	

	
	
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
	//验证码
	(function($){
		
			var settings = {
					e	 	: 'idcode',
					codeType: { name : 'follow', len: 4},
					codeTip	: 'refresh?',
					inputID	: 'Txtidcode'//引用验证码输入框Id
				};
			
			var set = {
				storeLable  : 'codeval',
				store	: '#ehong-code-input',
				codeval	: '#ehong-code'
			}
			$.idcode = {
				getCode:function(option){
					commSetting(option);
					return storeData(set.storeLable, null);
				},
				setCode:function(option){
					commSetting(option);
					setCodeStyle("#"+settings.e, settings.codeType.name, settings.codeType.len);
					
				},
				validateCode:function(option){
					commSetting(option);
					var inputV;
					if(settings.inputID){
						inputV=$('#' + settings.inputID).val();
					}else{
						inputV=$(set.store).val();
					}
					
					if(inputV == storeData(set.storeLable, null)){
						return true;
					}else{
						setCodeStyle("#"+settings.e, settings.codeType.name, settings.codeType.len);				
						return false;
					}
				}
			};
			
			function commSetting(option){
				$.extend(settings, option);		
			}
			
			function storeData(dataLabel, data){
				var store = $(set.codeval).get(0);			
				if(data){
					$.data(store, dataLabel, data);			
				}else{
					return $.data(store, dataLabel);			
				}
			}
			
			function setCodeStyle(eid, codeType, codeLength){
				var codeObj = createCode(settings.codeType.name, settings.codeType.len);		
				var randNum = Math.floor(Math.random()*6);
				var htmlCode=''
				if(!settings.inputID){
					htmlCode='<span><input id="ehong-code-input" type="text" maxlength="4" /></span>';
				}
				htmlCode+='<div id="ehong-code" class="ehong-idcode-val ehong-idcode-val';
				htmlCode+=String(randNum);
				htmlCode+='" href="#" onblur="return false" onfocus="return false" oncontextmenu="return false" onclick="$.idcode.setCode()">' + setStyle(codeObj) + '</div>' + '<span id="ehong-code-tip-ck" class="ehong-code-val-tip" onclick="$.idcode.setCode()">'/*+ settings.codeTip*/ +'</span>';
				$(eid).html(htmlCode);
				storeData(set.storeLable, codeObj);		
			}
			/*验证码背景色*/
			function setStyle(codeObj){
				var fnCodeObj = new Array();
				var col = new Array('#BF0C43', '#E69A2A','#707F02','#18975F','#BC3087','#73C841','#780320','#90719B','#1F72D8','#D6A03C','#6B486E','#243F5F','#16BDB5');
				var charIndex;
			   	for(var i=0;i<codeObj.length;i++){		
					charIndex = Math.floor(Math.random()*col.length);
					fnCodeObj.push('<font color="' + col[charIndex] + '">' + codeObj.charAt(i) + '</font>');
				}
				return fnCodeObj.join('');		
			}
			function createCode(codeType, codeLength){
			   var codeObj;
			   if(codeType=='follow'){
				   codeObj = createCodeFollow(codeLength);
			   }else if(codeType=='calc'){
				   codeObj = createCodeCalc(codeLength);
			   }else{
				   codeObj="";
			   }
			   return codeObj;   
			 }
			 
			 function createCodeCalc(codeLength){
			   var code1, code2, codeResult;
			   var selectChar = new Array('0','1','2','3','4','5','6','7','8','9');	
			   var charIndex;
			   for(var i=0;i<codeLength;i++){		
				   charIndex = Math.floor(Math.random()*selectChar.length);
				   code1 +=selectChar[charIndex];
				   
				   charIndex = Math.floor(Math.random()*selectChar.length);
				   code2 +=selectChar[charIndex];		   
			   }
			   return [parseInt(code1), parseInt(code2) , parseInt(code1) + parseInt(code2)] ;
			 }
			 
			 function createCodeFollow(codeLength){
			   var code = "";
			   var selectChar = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z');
				
			   for(var i=0;i<codeLength;i++){		
				   var charIndex = Math.floor(Math.random()*selectChar.length);
				   if(charIndex % 2 == 0){
					   code+=selectChar[charIndex].toLowerCase();
				   }else{
					   code +=selectChar[charIndex];
				   }	   
			   }
			   return code;
			 }
		   
		})(jQuery);
	
	
	
	
	    $.idcode.setCode();   //加载生成验证码方法
	    $("#butn").click(function(){
	        var IsBy = $.idcode.validateCode()  //调用返回值，返回值结果为true或者false
	        if(IsBy){
	            message.eq(3).html('验证码输入正确')
	        }else {
	            message.eq(3).html('请重新输入')
	            
	        }
	    })
	
		
	
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
			}
		});
		

});
