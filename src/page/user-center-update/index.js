'use strict';
require('./index.scss');
require('../common/header/index.js');
require('../common/nav/index.js');
var navSide = require('../common/nav-side/index.js');
var _xh = require('../../util/util.js');
var _user = require('../../service/user-service.js');
var tempString = require('./index.string');

var page = {
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.btn-submit', function (e) {
            var userInfo = {
                phone: $.trim($('#phone').val()),
                email: $.trim($('#email').val())
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updateInformation(userInfo,function(data,msg){
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
            activeName: 'user-center'
        });
        this.loadUserInfo();
    },
    //加载用户信息
    loadUserInfo: function () {
        var userHtml = '';
        _user.getUserInfo(function (res) {
            userHtml = _xh.renderHtml(tempString, res);
            $('.panel-body').html(userHtml);
        }, function (errMsg) {
            _xh.errorTips(errMsg);
        })
    },
    //验证字段信息
    validateForm: function (formData) {
        var result = {
            status: false,
            msg: ''
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