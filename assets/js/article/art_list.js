$(function () {
    // 修改时间列表
    let form = layui.form;
    //  定义时间过滤器
    template.defaults.imports.dataFormat = function (drtStr) {
        let dt = new Date(drtStr);

        let y = dt.getFullYear();
        let m = padZora(dt.getMonth())
        let d = padZora(dt.getDate())

        let hh = padZora(dt.getHours())
        let mm = padZora(dt.getMinutes())
        let ss = padZora(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;
    }
    // 补零函数
    function padZora(n) {
        return n > 9 ? n : '0' + n;
    }
    // 定义对象接收参数
    let q = {
        pagenum: 1,     //页码值
        pagesize: 2,    //每页显示多少条数据
        cate_id: "",    //文章分类的 Id
        state: "",      //文章的状态，可选值有：已发布、草稿
    }
    // 渲染表格
    let layer = layui.layer
    atrCateList();

    //封装
    function atrCateList() {
        $.ajax({
            type: 'get',
            url: '/my/article/list',
            data: q,
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                let htmlStr = template('tpl-atr-cate', { data: res.data });
                $('tbody').html(htmlStr);
                renderPage(res.total);
            }
        })
    };

    // 初始化分类
    initCate();

    function initCate() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message);
                }
                let htmlStr = template('tpl-atr-listify', { data: res.data });
                $('[name=cate_id]').html(htmlStr);
                form.render();
            }
        })
    }
    // 筛选
    $('#btnfiy').on('submit', function (e) {
        e.preventDefault();
        // console.log('111');

        let cate_id = $("[name=cate_id]").val();
        let state = $("[name=state]").val();

        q.cate_id = cate_id;
        q.state = state;

        atrCateList();
    });

    // 分页
    let laypage = layui.laypage;
    function renderPage(total) {

        laypage.render({
            elem: 'test1',
            count: total, //数据总数，从服务端得到
            limit: q.pagesize, //每页显示多少条数据
            curr: q.pagenum,    //页码值
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                q.pagenum = obj.curr;
                q.pagesize = obj.limit
                //首次不执行
                if (!first) {
                    //do something
                    atrCateList()
                }
            }
        });
    }



    // 删除
    $("tbody").on('click', '.btn-delete', function (e) {
        console.log('111');

        e.preventDefault();
        let Id = $(this).attr('data-id');
        layer.confirm('是否确定删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                type: 'get',
                url: '/my/article/delete/' + Id,
                success: (res) => {
                    // console.log(res);
                    if (res.status != 0) {
                        return layer.msg(res.message);
                    }
                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--;
                    layer.msg('恭喜您，删除文章分类成功！');
                    atrCateList()
                }
            })
            layer.close(index);
        });

    })
})