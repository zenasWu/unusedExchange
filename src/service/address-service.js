'use strict';

var _xh = require('../util/util.js');

var _address = {
    getAddressList: function (resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/shipping/list.do'),
            data: {
                pageNum:20
            },
            success: resolve,
            error: reject,
        })
    },
    getAddress: function (addressId,resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/shipping/select.do'),
            data: {
                shippingId:addressId,
            },
            success: resolve,
            error: reject,
        })
    },
    updateAddress: function (addressinfo,resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/shipping/update.do'),
            data: addressinfo,
            method:'POST',
            success: resolve,
            error: reject,
        })
    },
    addAddress: function (addressinfo,resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/shipping/add.do'),
            data: addressinfo,
            method:'POST',
            success: resolve,
            error: reject,
        })
    },
    deleteAddress: function (addressId,resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/shipping/del.do'),
            data: {
                shippingId:addressId,
            },
            method:'POST',
            success: resolve,
            error: reject,
        })
    },
}

module.exports = _address;