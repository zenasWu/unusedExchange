'use strict';
require('./index.scss');
require('../common/header/index.js');
require('../common/nav/index.js');
var navSide = require('../common/nav-side/index.js');
var _xh = require('../../util/util.js');
var _wishlist = require('../../service/wishlist-service.js');
var Pagination = require('../../util/pagination/index.js');
var tempString = require('./index.string');

var page = {
    data: {
        listPara: {
            pageNum: 1,
            pageSize: 10
        }
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        //删除愿望
        $(document).on('click','.delete-wish',function(){
            var wishNo = $(this).parents('.wish-item').data('wish-no');
            _wishlist.deleteWish(wishNo,function(res){
                _this.loadWishlist();
            },function(errMsg){
                _xh.errorTips(errMsg);
            })
        })
    },
    onLoad: function () {
        navSide.init({
            activeName: 'wishlist'
        });
        this.loadWishlist();
    },
    loadWishlist: function () {
        var wishlistHtml = '',
            _this = this,
            listCon = $('.wishlist-con');
        listCon.html('<div class="loading"></div>')
        _wishlist.getWishlist(this.data.listPara, function (res) {
            wishlistHtml = _xh.renderHtml(tempString, res);
            listCon.html(wishlistHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                nextPage: res.nextPage,
                hasNextPage: res.hasNextPage,
                pageNum: res.pageNum,
                pages: res.pages,
            });
        }, function (errMsg) {
            listCon.html('<p class="err-tip">加载愿望失败,亲!</p>')
        })
    },

    loadPagination: function (pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render(Object.assign({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function (pageNum) {
                _this.data.listPara.pageNum = pageNum;
                _this.loadWishlist();
            }
        }));
    }
}

$(function () {
    page.init();
})