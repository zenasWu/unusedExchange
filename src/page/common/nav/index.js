'use strict';
require('./index.scss');
var $ = require('jquery');
var _xh = require('../../../util/util.js');
var _user = require('../../../service/user-service.js');
var _cart = require('../../../service/cart-service.js');


//导航
var nav = {
    init: function () {
        this.bindEvent();
        this.loadCartCount();
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
            window.location.href = './register.html';
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
            window.location.reload();
        }, function (errMsg) {
            //
        })
    },

    loadCartCount: function () {
        _cart.getCartCount(function(res){
            $('.cart-count').text(res||0);
        },function(errMsg){
            $('.cart-count').text(0);
        })
    }

}

module.exports = nav.init();