// 入口函数
$(function () {
    // 验证表单
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        newpwd: function (value) {
            // value 是代表newPwd的值,原密码的值需要获取
            if (value == $(".layui-form input[name=oldPwd]").val()) {
                return '新密码和原密码不能相同！';
            }
        },
        repwd: function (value) {
            // value 是确定密码的值，新密码需要获取
            if (value != $(".layui-form input[name=newPwd]").val()) {
                return '确定新密码必须和新密码一致！'
            }
        }
    });

    // 提交修改密码
    let layer = layui.layer
    $('.layui-form').on('submit', function (e) {
        // 阻止默认事件
        e.preventDefault();
        // 发送ajax
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layui.layer.msg('更新密码成功！')
                $('.layui-form')[0].reset();
            }
        })
    })

})