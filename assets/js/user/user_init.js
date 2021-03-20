// 入口函数
$(function () {
    // 校验验证昵称名
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length < 2 || value.length > 6) {
                return '昵称必须在2到6位之间';
            }
        },
    })
    // 提交修改
    let layer = layui.layer;
    initInfo();

    function initInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            // headers: {
            //     Authorization: localStorage.getItem('token')
            // },
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 重置信息
    $("#Reset").on('click', function (e) {
        // 阻止默认事件
        e.preventDefault();
        //  重置
        initInfo();
    })

    // 提交修改
    $('.layui-form').on('submit', function (e) {
        // 阻止默认事件
        // console.log('1111');

        e.preventDefault();
        // 发送ajax
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                layer.msg('恭喜您，修改用户信息成功！');
                // console.log(window.parent);

                window.parent.getUserInfo();
            }
        })
    })

})