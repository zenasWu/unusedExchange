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
        listParm: {
            pageNum: 1,
            pageSize: 10
        },
        isUpdate: false
    },
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        // 编辑物品
        $(document).on('click', '.edit-good', function (e) {
            var goodId = $(this).parents('.good-item').data('good-id');
            window.location.href = './userGoods-detail.html?goodId='+goodId;
        })
        //删除物品
        $(document).on('click', '.delete-good', function (e) {
            var goodId = $(this).parents('.good-item').data('good-id');
            if (window.confirm('确认删除该物品?')) {
                _userGoods.deleteUserGood(goodId, function (res) {
                    _this.loadUserGoodlist();
                }, function (errMsg) {
                    _xh.errorTips(errMsg);
                })
            }
        })
    },
    onLoad: function () {
        navSide.init({
            activeName: 'userGoods'
        });
        this.loadUserGoodlist();
    },
    loadUserGoodlist: function () {
        var userGoodsListHtml = '',
            _this = this,
            listCon = $('.wishlist-con');
        _userGoods.getUserGoodsList(this.data.listParm, function (res) {
            _this.dataFilter(res);
            userGoodsListHtml = _xh.renderHtml(tempString, res);
            listCon.html(userGoodsListHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                nextPage: res.nextPage,
                hasNextPage: res.hasNextPage,
                pageNum: res.pageNum,
                pages: res.pages,
            });
        }, function (errMsg) {
            listCon.html('<p class="err-tip">加载愿望单失败,亲!</p>')
        })
    },
    //数据适配
    dataFilter: function (data) {
        data.list.forEach(element => {
            element.hasMessage = false;
            switch (element.status) {
                case 0:
                    element.statusIcon = 'frown';
                    break;
                case 1:
                    element.statusIcon = 'comment';
                    element.hasMessage = true;
                    break;
                case 2:
                    element.statusIcon = 'handshake';
                    break;
            }
        });
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