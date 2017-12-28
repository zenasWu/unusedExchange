'use strict';
require('./index.scss');
require('../common/nav-simple/index.js');
var _xh = require('../../util/util.js');
var _user = require('../../service/user-service.js');
//登陆页面
var formError = {
    //错误提示
    show: function (errmsg) {
        $('.error-item').show().find('.err-msg').text(errmsg);
    },
    hide: function () {
        $('.error-item').hide().find('.err-msg').text('');
    }
};

var page = {
    init: function () {
        this.bindEvent();
    },

    bindEvent: function () {
        var _this = this;
        //注册提交
        $('#submit').click(function () {
            _this.submit();
        })
        //回车提交
        $('.user-content').click(function (e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        })
        //验证username
        $('#username').blur(function () {
            var username = $.trim($(this).val());
            //用户名为空,不做验证
            if (!username) return;
            //异步验证
            _user.checkUsername(username, function () {
                formError.hide();
            }, function (errmsg) {
                formError.show(errmsg);
            })
        })
    },

    //提交登陆表单
    submit: function () {
        var formData = {
                username: $.trim($('#username').val()),
                password: $.trim($('#password').val()),
                passwordConfirm: $.trim($('#passwordConfirm').val()),
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val())
            },
            //表单验证结果
            validateResult = this.formValidate(formData);
        if (validateResult.status) {
            //验证提供提交
            _user.register(formData, function () {
                window.location.href = './result.html?type=register'
            }, function (errmsg) {
                formError.show(errmsg);
            })
        } else {
            //验证失败,提示错误
            formError.show(validateResult.msg);
        }
    },

    formValidate: function (formData) {
        var result = {
            status: false,
            msg: ''
        }
        if (!_xh.validate(formData.username, 'require')) {
            result.msg = '用户名不能为空';
            return result;
        }
        if (!_xh.validate(formData.password, 'require')) {
            result.msg = '密码不能为空';
            return result;
        }
        if (formData.password.length < 6) {
            result.msg = '密码少于6位,不安全';
            return result;
        }
        if (formData.password != formData.passwordConfirm) {
            result.msg = '两次密码不相等';
            return result;
        }
        if (!_xh.validate(formData.phone, 'phone')) {
            result.msg = '手机格式不正确';
            return result;
        }
        if (!_xh.validate(formData.email, 'email')) {
            result.msg = '邮箱格式不正确';
            return result;
        }

        //通过验证
        result.status = true;
        result.msg = '验证通过';
        return result;
    }

}

$(function () {
    page.init();
})