//入口函数
$(function () {
    $(".reg_box").on('click', function () {
        $(".regBox").show();
        $(".loginBox").hide();
    })
    $(".login_box").on('click', function () {
        $(".regBox").hide();
        $(".loginBox").show();
    })

    // 需求2 登录校验规则
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // value是新密码
            if (value != $('.regBox input[name=password]').val()) {
                return '两次密码不一致'
            }
        }
    })


    // 注册功能
    let layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            data: {
                username: $('.regBox input[name=username]').val(),
                password: $('.regBox input[name=password]').val(),
            },
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                // 提交成功后处理代码
                layer.msg('恭喜您，用户名注册成功！', { icon: 6 });
                $(".login_box").click();
                // 重置form表单
                $('#form_reg')[0].reset();
            }
        })

    })

    // 登录功能
    $("#form_login").on('submit', function (e) {
        // 阻止默认提交
        e.preventDefault();
        // 发送ajax进行登录
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                localStorage.setItem('tokrn', res.token);
                // 跳转
                location.href = "/index.html";
            }
        })
    })



})