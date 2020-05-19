
//进入首页判断token是否正确
if(!localStorage.getItem('token')) {
	window.location.href = 'login.html';
}

$(function () {
	
	//调用layui的js插件
	layui.use('element', function() {
		var element = layui.element;
	});
	
	//退出
	$('#logout').on('click',function(){
		layer.confirm('确定退出?', function(index) {
			localStorage.removeItem('token');
			window.location.href = 'login.html';
			layer.close(index); // 关闭当前弹出层
		});
	})
	
	//获取用户信息
	getUserInfo()
})
//获取用户信息函数
function getUserInfo() {
	$.ajax({
		//将token添加到请求头
		headers: {
			Authorization: localStorage.getItem('token')
		},
		url: 'http://www.liulongbin.top:3007/my/userinfo',
		success: function(res) {
//			layer.open({
//				title: '成功',
//				content:'登录成功'
//			});
			if(res.status === 0) {
				//用户名渲染
				var name = res.data.nickname || res.data.username;
				$('.welcome').html('欢迎你&nbsp;&nbsp;' + name);
				//渲染头像
				if(res.data.user_pic) {
					$('.layui-nav-img').attr('src', res.data.user_pic).show();
					$('.text-img').hide();
				}
				//存储用户信息
				localStorage.setItem('username',res.data.username);
				localStorage.setItem('nickname',res.data.nickname);
				localStorage.setItem('email',res.data.email);
				localStorage.setItem('id',res.data.id);
				localStorage.setItem('user_pic',res.data.user_pic);
			} else if(res.status === 1 && res.message === '身份认证失败！') {
				//获取用户名失败,退出登录
				localStorage.removeItem('token');
				window.location.href = 'login.html';
			}
		}
	});
}