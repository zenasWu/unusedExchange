'use strict';
require('./index.scss');
require('../common/header/index.js');
require('../common/nav/index.js');
var navSide = require('../common/nav-side/index.js');
var _xh = require('../../util/util.js');
var _user = require('../../service/user-service.js');

var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.btn-submit', function (e) {
            var userInfo = {
                password: $.trim($('#password').val()),
                newPassword: $.trim($('#newPassword').val()),
                newPasswordConfirm: $.trim($('#newPasswordConfirm').val()),
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updateInformation({
                    passwordOld:userInfo.password,
                    passwordNew:userInfo.newPassword
                },function(data,msg){
                    _xh.successTips(msg);
                    window.location.href = './user-center.html';
                },function(errMsg){
                    _xh.errorTips(errMsg);
                });
            }else{
                _xh.errorTips(validateResult.msg)
            }
        })
    },
    onLoad: function () {
        navSide.init({
            activeName: 'pw-update'
        });
    },
   
    //验证字段信息
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
        }
        if (!_xh.validate(formData.password, 'require')) {
            result.msg = '原密码不能为空';
            return result;
        }
        if (!formData.newPassword || formData.newPassword.length<6) {
            result.msg = '请输入不少于6位的新密码';
            return result;
        }
        if (formData.newPassword != formData.newPasswordConfirm) {
            result.msg = '请输入不少于6位的新密码';
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