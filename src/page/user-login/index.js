'use strict';
require('./index.scss');
require('../common/nav-simple/index.js');
var $ = require('jquery');
var _xh = require('../../util/util.js');
var _user = require('../../service/user-service.js');
//登陆页面
var formError = {
    //错误提示
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

var page = {
    init: function () {
        this.bindEvent();
    },

    bindEvent: function () {
        var _this = this;
        $('#submit').click(function () {
            _this.submit();
        })
        //回车提交
        $('.user-content').click(function (e) {
            if (e.keyCode === 13) {
                _this.submit();
            }
        })
    },

    //提交登陆表单
    submit: function () {
        var formData = {
                username: $.trim($('#username').val()),
                password: $.trim($('#password').val()),
            },
            //表单验证结果
            validateResult = this.formValidate(formData);
        if (validateResult.status) {
            //验证提供提交
            _user.login(formData,function(){
                window.location.href = _xh.getUrlParam('redirect')||'./index.html';
            },function(errmsg){
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
        //通过验证
        result.status = true;
        result.msg = '验证通过';
        return result;
    }

}

$(function () {
    page.init();
})