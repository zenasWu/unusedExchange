'use strict';
require('./index.scss');
require('../common/header/index.js');
var _xh = require('../../util/util.js');
var _product = require('../../service/product-service.js');
var _wishlist = require('../../service/wishList-service.js');
var tempString = require('./index.string');

var page = {
    data: {
        productId: _xh.getUrlParam('productId') || '',
    },

    init: function () {
        this.onLoad();
        this.bindEvent();
    },

    onLoad: function () {
        if(!this.data.productId){
            window.location.href = './result.html?type=productDetail&fail=true';
        }
        this.loadDetail();
    },

    bindEvent: function () {
        var _this = this;
        //图片预览
        $(document).on('mouseenter','.p-img-item',function(){
            var imgUrl = $(this).find('.p-img').attr('src');
            $('.main-img').attr('src',imgUrl);
        })
        // 加入心愿单
        $(document).on('click','.wishlist-add',function(){
            _wishlist.addToWishlist({
                productId:_this.data.productId,
            },function(){
                window.location.href = './result.html?type=wishlist-add';
            },function(errMsg){
                _xh.errorTips(errMsg);
            })
        })
    },

    loadDetail:function(){
        var html = '',
            pagewrap = $('.page-wrap');
            pagewrap.html('<div class="loading"></div>')
        
        _product.getProductDetail({
            productId:this.data.productId
        },function(res){
            res.subImages = res.subImages.split(',');
            html=_xh.renderHtml(tempString,res);
            pagewrap.html(html);
        },function(errMsg){
            window.location.href = './result.html?type=productDetail&fail=true';
        })
    }
}

$(function () {
    page.init();
})