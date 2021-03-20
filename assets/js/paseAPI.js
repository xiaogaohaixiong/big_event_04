$(function () {
    let paseURL = 'http://api-breakingnews-web.itheima.net'
    $.ajaxPrefilter(function (options) {
        options.url = paseURL + options.url;
        // 身份认证
        // 验证身份证
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }
        // 退出
        options.complete = function (res) {
            // console.log(res.responseJSON);

            let obj = res.responseJSON;
            if (obj.status == 1 && obj.message == '身份认证失败！') {
                // 跳转到登录页面，清空token
                localStorage.removeItem('token');
                location.href = '/login.html';
            }
        }
    })

})