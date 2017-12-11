'use strict';

var _xh = require('../util/util.js');

var _cart = {
    getCartCount: function (resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/cart/get_cart_count.do'),
            // method: 'POST',
            success: resolve,
            error: reject,
        })
    },
}

module.exports = _cart;