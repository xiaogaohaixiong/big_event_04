$(function () {
    let paseURL = 'http://api-breakingnews-web.itheima.net'
    $.ajaxPrefilter(function (options) {
        options.url = paseURL + options.url;
    })
})