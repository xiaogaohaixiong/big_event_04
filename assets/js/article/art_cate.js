$(function () {
    // 渲染表格
    let layer = layui.layer

    atrCateInitList();

    //封装
    function atrCateInitList() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                let htmlStr = template('tpl-atr-cate', { data: res.data });
                $('tbody').html(htmlStr);
            }
        })
    };

    let indexAdd = null;
    // 修改类别
    $('tbody').on('click', '#btnAdd', function () {
        indexAdd = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('#dialog-add').html(),
            area: ['500px', '250px'],
        });
    })

    // 点击添加类别 进行添加
    $("body").on('submit', '#form-add', function (e) {

        // 阻止默认提交
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 成功后渲染
                layer.msg('恭喜您，添加文章分类成功！')
                atrCateInitList();
                layer.close(indexAdd);
            }
        })

    })
    let form = layui.form;
    let indexEdit = null;
    // 修改类别
    $('tbody').on('click', '#btnEdit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('#dialog-edit').html(),
            area: ['500px', '250px'],
        });

        let Id = $(this).attr('data-id');
        // console.log(Id);

        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + Id,
            success: (res) => {
                // console.log(res);
                form.val('from-edit', res.data);
            }
        })
    })

    // 点击编辑 进行修改
    $("body").on('submit', '#form-edit', function (e) {
        // console.log('111');

        // 阻止默认提交
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                // 成功后渲染
                layer.msg('恭喜您，修改文章分类成功！')
                atrCateInitList();
                layer.close(indexEdit);
            }
        })

    });

    // 删除
    $("tbody").on('click', '.btn-delete', function (e) {
        console.log('111');

        e.preventDefault();
        let Id = $(this).attr('data-id');
        $.ajax({
            type: 'get',
            url: '/my/article/deletecate/' + Id,
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                layer.confirm('是否确定删除?', { icon: 3, title: '提示' }, function (index) {
                    //do something
                    ('恭喜您，删除文章分类成功！')
                    atrCateInitList();

                    layer.close(index);
                });
            }
        })
    })
})