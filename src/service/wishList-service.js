'use strict';

var _xh = require('../util/util.js');

var _product = {
    addToWishlist: function (data, resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/wishlist/add.do'),
            data: data,
            success: resolve,
            error: reject,
        })
    },

}

module.exports = _product;