'use strict';
require('./index.scss');
require('../common/nav-simple/index.js');
var _xh = require('../../util/util.js');
var _userGoods = require('../../service/userGoods-service.js');
var _cities = require('../../util/cities/index.js');
var tempString = require('./index.string');
var imgUpload = require('../../util/imgUpload/index.js');

var page = {
    option: {
        goodId: null,
        url: '/userGoods/add.do',
        data: {}
    },
    containWrap: $('.detail-con'),
    init: function () {
        this.onLoad();
        this.bindEvent();
    },
    bindEvent: function () {
        var _this = this;
        $(document).on('click', '.submit-btn', function () {
            var goodInfo = _this.getgoodInfo();
            if (goodInfo.status) {
                _this.imgUpload.setOtherData(goodInfo.data);
                _this.imgUpload.upload();
            }
            else {
                _xh.errorTips(goodInfo.errMsg);
            }
        })
        this.containWrap.find('#good-province').change(function () {
            // 省份城市二级联动
            var selectProvince = $(this).val();
            _this.loadCity(selectProvince);
        })
    },
    onLoad: function () {
        var _this = this;
        this.option.goodId = _xh.getUrlParam('goodId');
        if (this.option.goodId) {
            _userGoods.selectUserGood(this.option.goodId, function (res) {
                _this.option.url = '/userGoods/update.do'
                _this.option.data = res;
                _this.loadForm();
            }, function (errMsg) {
                _xh.errorTips(errMsg);
            })
        } else {
            this.loadForm();
        }
    },
    loadForm: function () {
        var detailHtml = _xh.renderHtml(tempString, {
            goodId: this.option.goodId,
            data: this.option.data
        });
        this.containWrap.html(detailHtml);
        var option = {
            url: this.option.url
        };
        this.imgUpload = new imgUpload('#good-image', option);
        this.loadCategory();
        this.loadProvince();
    },
    loadCategory: function () {
        if (this.option.goodId && this.option.data.categoryId) {
            $('#good-categoryId').val(this.option.data.categoryId);
        }
    },
    //加载省份
    loadProvince: function () {
        var provinces = _cities.getProvinces() || [],
            provinceSelect = this.containWrap.find('#good-province');
        provinceSelect.html(this.getSelectOption(provinces));
        if (this.option.goodId && this.option.data.province) {
            provinceSelect.val(this.option.data.province);
            this.loadCity(this.option.data.province);
        }
    },
    //加载城市
    loadCity: function (provinceName) {
        var cities = _cities.getCities(provinceName),
            citySelect = this.containWrap.find('#good-city');
        citySelect.html(this.getSelectOption(cities));
        if (this.option.goodId && this.option.data.city) {
            citySelect.val(this.option.data.city);
        }
    },
    //获取selcet选项框HTML 
    getSelectOption: function (optionArray) {
        var html = '<option value="">请选择</option>';
        optionArray.forEach(element => {
            html += `<option value="${element}">${element}</option>`;
        });
        return html;
    },
    getgoodInfo: function () {
        var goodInfo = {
                name: $.trim(this.containWrap.find('#good-name').val()),
                subtitle: $.trim(this.containWrap.find('#good-subtitle').val()),
                categoryId: $.trim(this.containWrap.find('#good-categoryId').val()),
                trading: $.trim(this.containWrap.find('#good-trading').val()),
                province: $.trim(this.containWrap.find('#good-province').val()),
                city: $.trim(this.containWrap.find('#good-city').val()),
                address: $.trim(this.containWrap.find('#good-address').val()),
                contact: $.trim(this.containWrap.find('#good-contact').val()),
                quality: $.trim(this.containWrap.find('#good-quality').val()),
                detail: $.trim(this.containWrap.find('#good-detail').val()),
            },
            result = {
                status: false,
            };

        if (this.option.goodId) {
            goodInfo.id = this.option.goodId;
        }
        if (!goodInfo.name) {
            result.errMsg = '请输入物品名称';
        } else if (!goodInfo.province) {
            result.errMsg = '请输入物品省份';
        } else if (!goodInfo.city) {
            result.errMsg = '请输入物品城市';
        } else if (!goodInfo.address) {
            result.errMsg = '请输入物品地址';
        } else if (!goodInfo.categoryId) {
            result.errMsg = '请选择商品品类';
        } else if (!goodInfo.trading) {
            result.errMsg = '请选择交易方式';
        } else if (!goodInfo.contact) {
            result.errMsg = '请输入联系方式';
        } else if (!_xh.validate(goodInfo.contact, 'phone')) {
            result.errMsg = '手机格式不正确';
        } else {
            result.status = true;
            result.data = goodInfo;
        }
        return result;
    }
}

$(function () {
    page.init();
})