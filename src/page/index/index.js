/*
 * @Author: zenas 
 * @Date: 2017-12-11 14:11:38 
 * @Last Modified by:   zenas 
 * @Last Modified time: 2017-12-11 14:11:38 
 */

'use strict';
require('./index.scss');
require('../common/nav/index.js');
require('../common/header/index.js');
var navSide = require('../common/nav-side/index.js');
var _xh = require('../../util/util.js');


navSide.init({
    activeName:'order-list'
});