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
require('../../util/slider/index.js')
var navSide = require('../common/nav-side/index.js');
var _xh = require('../../util/util.js');
var _product = require('../../service/product-service.js');
var keywordTmp = require('./keyword.string');
var floorTmp = require('./floor.string');
var bannerTmp = require('./banner.string');

var page = {
    option: {
        keywordList: {
            appliance: ["耳机", "风扇", "吹风机"],
            digital: ["手机", "相机", "电脑"],
            dress: ["女装", "箱包"],
            accessory: ["珠宝", "饰品", "艺术收藏"],
            maternal: ["童装", "儿童玩具"],
            book: ["人文社科", "经济管理"]
        },
        categoryId: {
            appliance: 1,
            digital: 2,
            dress: 3,
            accessory: 4,
            maternal: 5,
            book: 6
        },
        bannerList: [{
            href: './list.html?categoryId=1',
            imageHost: '/img/banner/',
            bannerImage: 'banner1.jpg'
        },{
            href: './list.html?categoryId=2',
            imageHost: '/img/banner/',
            bannerImage: 'banner2.jpg'
        },{
            href: './list.html?categoryId=3',
            imageHost: '/img/banner/',
            bannerImage: 'banner3.jpg'
        },{
            href: './list.html?categoryId=4',
            imageHost: '/img/banner/',
            bannerImage: 'banner4.jpg'
        },{
            href: './list.html?categoryId=5',
            imageHost: '/img/banner/',
            bannerImage: 'banner5.jpg'
        },{
            href: './list.html?categoryId=6',
            imageHost: '/img/banner/',
            bannerImage: 'banner6.jpg'
        }]

    },

    init: function (option) {
        // option = Object.assign(this.option, option);
        this.renderKeyword();
        this.renderFloor();
        this.renderBanner();
        return this;
    },

    renderKeyword: function () {
        var keywordHtml = _xh.renderHtml(keywordTmp, {
            appliance: this.option.keywordList.appliance,
            digital: this.option.keywordList.digital,
            dress: this.option.keywordList.dress,
            accessory: this.option.keywordList.accessory,
            maternal: this.option.keywordList.maternal,
            book: this.option.keywordList.book,
        });

        $('.keyword-list').html(keywordHtml);
    },

    renderFloor: function () {
        var categoryId = this.option.categoryId
        for (const key in categoryId) {
            if (categoryId.hasOwnProperty(key)) {
                var data = {
                    categoryId: categoryId[key],
                    num: 5
                }
                _product.getHottedProduct(data, function (res) {
                    var floorListHtml = _xh.renderHtml(floorTmp, {
                        list: res
                    });
                    var floorClass = ".floor-" + key;
                    $(floorClass).find('.floor-list').html(floorListHtml);
                }, function (msg) {
                    _xh.errorTips(msg);
                });
            }
        }
    },

    renderBanner: function () {
        var bannerHtml = _xh.renderHtml(bannerTmp,{
            List:this.option.bannerList
        });
        $(".banner-con").html(bannerHtml);
        $('.banner').unslider({
            infinite: true,
            arrows: {
                prev: '<a class="unslider-arrow prev"><i class="fas fa-angle-left"></i></a>',
                next: '<a class="unslider-arrow next"><i class="fas fa-angle-right"></i></a>'
            }
        });
    }
}

$(function () {
    page.init();
})