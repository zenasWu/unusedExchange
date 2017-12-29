'use strict';

var _xh = require('../util/util.js');

var _wishlist = {
    addToWishlist: function (data, resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/wishlist/add.do'),
            data: data,
            method: "POST",
            success: resolve,
            error: reject,
        })
    },
    getProduct: function (productId, resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/wishlist/get_wishlist_product.do'),
            data: {
                productId:productId
            },
            success: resolve,
            error: reject,
        })
    },
    getWishlist: function (data, resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/wishlist/list.do'),
            data: data,
            success: resolve,
            error: reject,
        })
    },
    deleteWish: function (wishNo, resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/wishlist/deleteWish.do'),
            data: {
                wishNo:wishNo
            },
            method:'POST',
            success: resolve,
            error: reject,
        })
    }

}

module.exports = _wishlist;