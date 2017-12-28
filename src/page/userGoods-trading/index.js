'use strict';
require('./index.scss');
require('../common/header/index.js');
require('../common/nav/index.js');
var navSide = require('../common/nav-side/index.js');
var _xh = require('../../util/util.js');
var _userGoods = require('../../service/userGoods-service.js');
var Pagination = require('../../util/pagination/index.js');
var tempString = require('./index.string');

var page = {
    data: {
        goodId:_xh.getUrlParam('goodId'),
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click','.agree',function(){
            var exchangeId = $(this).parents("tr").data('exchange-id');
            _userGoods.agreeTrading({
                exchangeId:exchangeId,
                goodId:_this.data.goodId
            },function(res){
                window.location.href="./result.html?type=trading";
            },function(errMsg){
                _xh.errorTips(errMsg);
            })
        })

        $(document).on('click','.reject',function(){
            var exchangeId = $(this).parents("tr").data('exchange-id');
            _userGoods.rejectTrading({
                exchangeId:exchangeId,
                goodId:_this.data.goodId
            },function(res){
                _xh.successTips('操作成功');
                _this.loadTrading();
            },function(errMsg){
                _xh.errorTips(errMsg);
            })
        })
       
    },
    onLoad: function () {
        navSide.init({
            activeName: 'userGoods'
        });
        this.loadTrading();
    },
    loadTrading: function () {
        var tradingHtml = '',
            _this = this,
            content = $('.container');
        _userGoods.getTradingMessage(this.data.goodId, function (res) {
            tradingHtml = _xh.renderHtml(tempString, res);
            content.html(tradingHtml);
            _this.loadPagination({
                hasPreviousPage: res.exchange.hasPreviousPage,
                prePage: res.exchange.prePage,
                nextPage: res.exchange.nextPage,
                hasNextPage: res.exchange.hasNextPage,
                pageNum: res.exchange.pageNum,
                pages: res.exchange.pages,
            });
        }, function (errMsg) {
            content.html(`<p class="err-tip">${errMsg}</p>`)
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