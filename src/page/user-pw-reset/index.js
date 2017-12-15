'use strict';
require('./index.scss');
require('../common/nav-simple/index.js');
var $ = require('jquery');
var _xh = require('../../util/util.js');
var _user = require('../../service/user-service.js');
//登陆页面
var formError = {
    //错误提示
    show: function (errMsg) {
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
};

var page = {

    init: function () {
        this.onload();
        this.bindEvent();
    },
    onload: function () {
        var isStepPassword = _xh.getUrlParam('stepPassword');
        if (isStepPassword) {
            this.loadStepPassword();
        } else {
            this.loadStepEmail();
        }
    },

    bindEvent: function () {
        var _this = this;
        $('#submit-email').click(function () {
            var email = $.trim($('#email').val());
            if (email) {
                _user.sentEmail(email, function (res) {
                    _this.loadStepSented();
                }, function (errMsg) {
                    formError.show(errMsg)
                });
            } else {
                formError.show('请输入注册邮箱');
            }
        });
        $('#submit-password').click(function () {
            var password = $.trim($('#password').val());
            if (password && password.length>6) {
                _user.resetPassword({
                    newPassword: password,
                    email: _xh.getUrlParam('email'),
                    token: _xh.getUrlParam('token')
                }, function (res) {
                    window.location.href = './result.html?type=pass-reset';
                }, function (errMsg) {
                    formError.show(errMsg);
                });
            } else {
                formError.show('请输入成都不少于6位新密码');
            }
        });
    },

    loadStepEmail: function () {
        $('.step-email').show();
    },
    loadStepSented: function () {
        formError.hide();
        $('.step-email').hide().siblings('.step-sented').show();
    },
    loadStepPassword: function () {
        formError.hide();
        $('.step-con').hide();
        $('.step-password').show();
    }

}

$(function () {
    page.init();
})