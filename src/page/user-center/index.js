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
        _user.getUserInfo(function(res){
            userHtml = _xh.renderHtml(tempString,res);
            $('.panel-body').html(userHtml);
        },function(errMsg){
            _xh.errorTips(errMsg);
        })
    }
}

$(function () {
    page.init();
})