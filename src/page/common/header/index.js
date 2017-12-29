'use strict';
require('./index.scss');
var _xh = require('../../../util/util.js');

//通用头部
var header = {
    init: function () {
        this.bindEvent();
        this.onLoad();
    },

    bindEvent: function () {
        var _this = this;
        $('#search-btn').click(function () {
            _this.searchSubmit();
        })
        $('#search-input').keyup(function (e) {
            if(e.keyCode === 13){
                //回车提交
                _this.searchSubmit();
            }
        })
    },

    onLoad: function () {
        var keyword = _xh.getUrlParam('keyword');
        if (keyword) {
            $('#search-input').val(keyword);
        }
    },

    //提交搜索
    searchSubmit: function () {
        var keyword  = $.trim($('#search-input').val());
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }else{
            _xh.goHome();
        }
    }
}

header.init();