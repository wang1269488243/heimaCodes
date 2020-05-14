$(function() {
	//切换登录和注册模块
	$('.goto-register a').click(function() {
		$('#register').show().prev().hide();
	});
	$('.goto-login a').click(function() {
		$('#register').hide().prev().show();
	});

	//注册功能
	$('#register form').on('submit', function(e) {
		//阻止表单提交的行为
		e.preventDefault();
		//serialize 表单项的name属性值获取值
		var data = $(this).serialize();
		$.ajax({
			type: 'POST',
			url: 'http://www.liulongbin.top:3007/api/reguser',
			data: data,
			success: function(res) {
				//提示返回信息
				alert(res.message);
				// 隐藏注册，显示登录
				if(res.status === 0) {
					$('#register').hide().prev().show();
				}
			}
		});

	});

	//登录
	$('#login form').on('submit', function(e) {
		//阻止表单提交的行为
		e.preventDefault();
		//serialize 是根据表单项的name属性值获取值的，所以这里一定要检查表单项的name属性
		var data = $(this).serialize();
		// 把账号和密码提交给接口，从而完成注册
		$.ajax({
			type: 'POST',
			url: 'http://www.liulongbin.top:3007/api/login',
			data: data,
			success: function(res) {
				if(res.status === 0) {
					$('#register').hide().prev().show();
					//使用cookie存储
					//setCookie('accesstoken', res.token, "7");
					//使用本地存储
					localStorage.setItem('token',res.token);
					window.location.href = 'index.html';
				}else{
					//登录失败提示内容
					alert(res.message);
				}
			}
		});
	});

	// 设置cookie   
	function setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}

	// 读取cookie   
	function getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i].trim();
			if(c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	}

	// 检查cookie 
	function checkCookie(c_name) {
		username = getCookie(c_name);
		console.log(username);
		if(username != null && username != "") {
			return true;
		} else {
			return false;
		}
	}

	// 清除cookie 
	function clearCookie(name) {
		setCookie(name, "", -1);
	}

});