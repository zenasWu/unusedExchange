'use strict';
require('./index.scss');
var _xh = require('../../../util/util.js');
var _user = require('../../../service/user-service.js');


//导航
var nav = {
    init: function () {
        this.bindEvent();
        this.loadMessage();
        this.loadUserInfo();
        return this;
    },

    bindEvent: function () {
        //登录点击事件
        $('.js-login').click(function () {
            _xh.doLogin();
        })

        //注册点击事件
        $('.js-register').click(function () {
            window.location.href = './user-register.html';
        })

        //退出
        $('.js-logout').click(function () {
            _user.logout(function (res) {
                window.location.reload();
            }, function (errMsg) {
                _xh.errorTips(errMsg);
            });
        })
    },

    //加载用户信息
    loadUserInfo: function () {
        _user.checklogin(function (res) {
            $('.user.not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
        }, function (errMsg) {
            // do nothing
        })
    },

    loadMessage: function () {
        _user.getMsgCount(function(res){
            $('.msg-count').text(res.num||0);
        },function(errMsg){
            $('.msg-count').text(0);
        })
    }

}

module.exports = nav.init();