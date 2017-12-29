'use strict';

require('./index.scss');
require('../common/nav-simple/index.js');
var _xh = require('../../util/util.js');

$(function () {
    var type = _xh.getUrlParam('type') || 'default',
        element = null;
    if (!_xh.getUrlParam('fail')) {
        element = $('.' + type + '-success')
    } else {
        element = $('.' + type + '-fail');
    }
    element.show();

    var timetoGoHome = 10000;
    $('.timetoGoHome').html(new String(timetoGoHome / 1000));
    setTimeout(() => {
        _xh.goHome();
    }, timetoGoHome);
})