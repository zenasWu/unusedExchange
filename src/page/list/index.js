'use strict';
require('./index.scss');
require('../common/header/index.js');
require('../common/nav/index.js');
var _xh = require('../../util/util.js');
var _product = require('../../service/product-service.js');
var Pagination = require('../../util/pagination/index.js');
var tempString = require('./index.string');

var page = {
    data: {
        listPara: {
            keyword: _xh.getUrlParam('keyword') || '',
            categoryId: _xh.getUrlParam('categoryId') || '',
            orderBy: _xh.getUrlParam('orderBy') || 'default',
            pageNum: _xh.getUrlParam('pageNum') || 1,
            pageSize: _xh.getUrlParam('pageSize') || 20
        }
    },

    init: function () {
        this.onLoad();
        this.bindEvent();
    },

    onLoad: function () {
        this.loadList();
    },

    bindEvent: function () {
        var _this = this;
        $('.sort-item').click(function () {
            var sortChoice = $(this);
            _this.data.listPara.pageNum = 1;
            if (sortChoice.data('type') === 'default') {
                //默认排序
                if (sortChoice.hasClass('active')) {
                    return;
                } else {
                    sortChoice.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                    _this.data.listPara.orderBy = 'default'
                }
            } else if (sortChoice.data('type') === 'createTime') {
                //时间排序;
                sortChoice.addClass('active').siblings('.sort-item').removeClass('active asc desc');
                //升序,降序
                if (!sortChoice.hasClass('asc')) {
                    sortChoice.addClass('asc').removeClass('desc');
                    _this.data.listPara.orderBy = 'createTime_asc';
                } else if (!sortChoice.hasClass('desc')) {
                    sortChoice.addClass('desc').removeClass('asc');
                    _this.data.listPara.orderBy = 'createTime_desc';
                }
            };
            _this.loadList();
        })
    },

    loadList: function () {
        var _this = this,
            listPara = this.data.listPara;
        if (listPara.categoryId) {
            listPara.keyword = '';
        } else {
            listPara.categoryId = '';
        };
        $('.p-list-con').html('<div class="loading"></div>');
        _product.getProductList(listPara, function (res) {
            var listHtml = _xh.renderHtml(tempString, {
                list: res.list
            })
            $('.p-list-con').html(listHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                nextPage: res.nextPage,
                hasNextPage: res.hasNextPage,
                pageNum: res.pageNum,
                pages: res.pages,
            });
        }, function (errMsg) {
            _xh.errorTips(errMsg);
        });
    },
    //加载分页信息
    loadPagination: function (pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render(Object.assign({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function (pageNum) {
                _this.data.listPara.pageNum = pageNum;
                _this.loadList();
            }
        }));
    }
}

$(function () {
    page.init();
})