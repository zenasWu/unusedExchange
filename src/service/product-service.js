'use strict';

var _xh = require('../util/util.js');

var _product = {
    getHottedProduct: function (data, resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/product/category_hottest.do'),
            data: data,
            method: 'GET',
            success: resolve,
            error: reject,
        })
    },
    getProductList: function (data, resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/product/list.do'),
            data: data,
            method: 'GET',
            success: resolve,
            error: reject,
        })
    },
    getProductDetail: function (data, resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/product/detail.do'),
            data: data,
            method: 'GET',
            success: resolve,
            error: reject,
        })
    },
}

module.exports = _product;