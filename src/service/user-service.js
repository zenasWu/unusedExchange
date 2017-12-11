'use strict';

var _xh = require('../util/util.js');

var _user = {
    logout: function (resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject,
        })
    },

    checklogin: function (resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject,
        })
    }
}

module.exports = _user;