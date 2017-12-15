'use strict';

var _xh = require('../util/util.js');

var _user = {
    logout: function (resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/user/logout.do'),
            method: 'POST',
            success: resolve,
            error: reject,
        })
    },

    login: function (userdata, resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/user/login.do'),
            data: userdata,
            method: 'POST',
            success: resolve,
            error: reject,
        })
    },

    register: function (userdata, resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/user/register.do'),
            data: userdata,
            method: 'POST',
            success: resolve,
            error: reject,
        })
    },

    checklogin: function (resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject,
        })
    },

    checkUsername: function (username, resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/user/check_valid.do'),
            data: {
                type: 'username',
                value: username
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    },
    //重设密码,发送邮件
    sentEmail: function (email, resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/user/sent_email.do'),
            data: {
                email: email
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    },

    resetPassword: function (data, resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/user/forget_reset_password.do'),
            data: {
                newPassword: data.newPassword,
                email: data.email,
                token: data.token
            },
            method: 'POST',
            success: resolve,
            error: reject
        })
    },

    getUserInfo: function (resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/user/get_user_info.do'),
            method: 'POST',
            success: resolve,
            error: reject,
        })
    },

    updateInformation: function (data,resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/user/update_information.do'),
            method: 'POST',
            data: data,
            success: resolve,
            error: reject,
        })
    },

    updatePassword: function (data,resolve, reject) {
        _xh.request({
            url: _xh.getServerUrl('/user/reset_password.do'),
            method: 'POST',
            data: data,
            success: resolve,
            error: reject,
        })
    },
}

module.exports = _user;