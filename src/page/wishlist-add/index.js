'use strict';
require('./index.scss');
require('../common/header/index.js');
require('../common/nav/index.js');
var Pagination = require('../../util/pagination/index.js');
var _xh = require('../../util/util.js');
var _wishlist = require('../../service/wishlist-service.js');
var _address = require('../../service/address-service.js');
var _userGoods = require('../../service/userGoods-service.js');
var addressModal = require('./address-modal.js');
var tempAddress = require('./address.string');
var tempProduct = require('./product.string');
var tempExchange = require('./exchange.string');


var page = {
    data: {
        selectAddressId: null,
        productId: _xh.getUrlParam('productId'),
        exchangeId: null,
        tradingOnline: false,
        listPara: {
            pageNum: _xh.getUrlParam('pageNum') || 1,
            pageSize: _xh.getUrlParam('pageSize') || 20
        }
        //交易方式(1:线上交易,0:线下交易)
    },

    init: function () {
        this.onLoad();
        this.bindEvent();
    },

    onLoad: function () {
        this.loadProduct();
    },

    bindEvent: function () {
        var _this = this;
        //地址选择
        $(document).on('click', '.address-item', function () {
            $(this).addClass('active').siblings('.address-item').removeClass('active');
            _this.data.selectAddressId = $(this).data('id');
        })
        //下一步选择交换物品
        $(document).on('click', '.product-submit', function () {
            if (_this.data.tradingOnline) {
                if (_this.data.selectAddressId) {
                    _this.loadExchange();
                } else {
                    _xh.errorTips('请选择收货地址');
                }
            } else {
                _this.loadExchange();
            }
        })

        //选择交换的物品
        $(document).on('click', '.exchange-select', function () {
            _this.data.exchangeId = $(this).parents('.exchange-item').data('product-id');
        })

        //返回上一步
        $(document).on('click', '.ruturn-to-product', function () {
            $('.exchange-panel').hide().siblings('.product-panel').show();
            if (_this.data.tradingOnline) {
                $('.address-panel').show()
            }
        })

        //加入愿望单
        $(document).on('click', '.exchange-submit', function () {
            if (_this.data.exchangeId) {
                _wishlist.addToWishlist({
                    addressId: _this.data.selectAddressId,
                    productId: _this.data.productId,
                    exchangeId: _this.data.exchangeId,
                }, function (res) {
                    window.location.href = './result.html?type=wishlist-add';
                }, function (errMsg) {
                    _xh.errorTips(errMsg)
                });
            } else {
                _xh.errorTips('请选择交换物品');
            }
        })
        //添加新地址
        $(document).on('click', '.address-add', function () {
            addressModal.show({
                isUpdate: false,
                onSuccess: function () {
                    _this.loadAddress();
                }
            })
        })
        // 编辑地址
        $(document).on('click', '.address-update', function (e) {
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            _address.getAddress(shippingId, function (res) {
                addressModal.show({
                    isUpdate: true,
                    data: res,
                    onSuccess: function () {
                        _this.loadAddress();
                    }
                })
            }, function (errMsg) {
                _xh.errorTips(errMsg);
            })
        })
        //删除地址
        $(document).on('click', '.address-delete', function (e) {
            e.stopPropagation();
            var shippingId = $(this).parents('.address-item').data('id');
            if (window.confirm('确认删除该地址?')) {
                _address.deleteAddress(shippingId, function (res) {
                    _this.loadAddress();
                }, function (errMsg) {
                    _xh.errorTips(errMsg);
                })
            }
        })
    },

    loadProduct: function () {
        var _this = this;
        $('.product-con').html('<div class="loading"></div>');
        _wishlist.getProduct({
            productId: this.data.productId
        }, function (res) {
            var productHtml = _xh.renderHtml(tempProduct, res);
            $('.product-con').html(productHtml);
            if (res.trading === '线上交易') {
                _this.data.tradingOnline = true;
            }
            _this.loadAddress();
        }, function () {
            $('.product-con').html('<p class="err-tip">产品信息加载失败</p>');
        })
    },

    loadAddress: function () {
        if (!this.data.tradingOnline) {
            return;
        } else {
            $('.address-panel').show();
            var _this = this;
            $('.address-con').html('<div class="loading"></div>');
            _address.getAddressList(function (res) {
                _this.addressFilter(res);
                var addressHtml = _xh.renderHtml(tempAddress, res);
                $('.address-con').html(addressHtml);
            }, function () {
                $('.address-con').html('<p class="err-tip">地址加载失败</p>');
            })
        }
    },
    //处理地址列表
    addressFilter: function (data) {
        if (this.data.selectAddressId) {
            var selectedAddressIdFlag = false; //表示选中地址是否可用
            data.list.forEach(element => {
                if (element.id === this.data.selectAddressId) {
                    element.isActive = true;
                    selectedAddressIdFlag = true;
                }
            });
            if (!selectedAddressIdFlag) {
                this.data.selectAddressId = null;
            }
        }
    },
    loadExchange: function () {
        var _this = this;
        $('.exchange-panel').show().siblings('.panel').hide();
        _userGoods.getExchangeList(function (res) {
            var exchangeHtml = _xh.renderHtml(tempExchange, res);
            $('.exchange-con').html(exchangeHtml);
            _this.loadPagination({
                hasPreviousPage: res.hasPreviousPage,
                prePage: res.prePage,
                nextPage: res.nextPage,
                hasNextPage: res.hasNextPage,
                pageNum: res.pageNum,
                pages: res.pages,
            });
        }, function () {
            $('.exchange-con').html('<p class="err-tip">地址加载失败</p>');
        })
    },

    loadPagination: function (pageInfo) {
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render(Object.assign({}, pageInfo, {
            container: $('.pagination'),
            onSelectPage: function (pageNum) {
                _this.data.listPara.pageNum = pageNum;
                _this.loadExchange();
            }
        }));
    }
}

$(function () {
    page.init();
})