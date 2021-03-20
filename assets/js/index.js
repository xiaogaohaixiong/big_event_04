$(function () {
    getUserInfo();
    // 退出
    let layer = layui.layer;
    $('#quit').on('click', function () {
        // console.log('111');
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');
            location.href = "/login.html";
            layer.close(index);
        });
    });
});
function getUserInfo() {
    $.ajax({
        type: 'get',
        url: '/my/userinfo',
        data: {},
        success: (res) => {
            // console.log(res);
            if (res.status != 0) {
                return layer.msg(res.message);
            }
            userModi(res.data)
        }
    })
}

// 渲染页面
function userModi(user) {
    let name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    if (user.user_pic == null) {
        $('.layui-nav-img').hide();
        $('.text-avatar').show().html(name[0].toUpperCase())
    } else {
        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide()
    }
}