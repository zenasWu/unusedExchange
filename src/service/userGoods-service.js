'use strict';

var _xh = require('../util/util.js');

var _userGoods = {
    getExchangeList: function (resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/userGoods/getExchangeList.do'),
            success: resolve,
            error: reject,
        })
    },
    getUserGoodsList: function (data, resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/userGoods/getGoodsList.do'),
            data: data,
            success: resolve,
            error: reject,
        })
    },
    // updateUserGood: function (imgContainer,data,resolve, reject) {
    //     _xh.request({
    //         url: _xh.getServerUrl('/userGoods/update.do'),
    //         data: data,
    //         success: resolve,
    //         method:'POST',
    //         error: reject,
    //     })
    // },
    // addUserGood: function (data, resolve, reject) {
    //     _xh.request({
    //         url: _xh.getServerUrl('/userGoods/add.do'),
    //         data: data,
    //         success: resolve,
    //         method:'POST',
    //         error: reject,
    //     })
    // },
    deleteUserGood: function (goodId, resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/userGoods/del.do'),
            data: {
                goodId:goodId
            },
            success: resolve,
            method:'POST',
            error: reject,
        })
    },
    selectUserGood: function (goodId, resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/userGoods/select.do'),
            data: {
                goodId:goodId
            },
            success: resolve,
            error: reject,
        })
    },
    getTradingMessage: function (goodId, resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/userGoods/getTradingMessage.do'),
            data: {
                goodId:goodId
            },
            method:'POST',
            success: resolve,
            error: reject,
        })
    },
    rejectTrading: function (data, resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/userGoods/reject_trading.do'),
            data: data,
            method:'POST',
            success: resolve,
            error: reject,
        })
    },
    agreeTrading: function (data, resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/userGoods/agree_trading.do'),
            data: data,
            method:'POST',
            success: resolve,
            error: reject,
        })
    }
}

module.exports = _userGoods;