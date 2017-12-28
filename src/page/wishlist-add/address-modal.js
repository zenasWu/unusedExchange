'use strict';

var _xh = require('../../util/util.js');
var _address = require('../../service/address-service.js');
var _cities = require('../../util/cities/index.js');
var tempAddressModal = require('./address-modal.string');
var addressModal = {
    modelWrap: $('.modal-wrap'),
    option: {
        goodId: null,
        data: {},
    },
    show: function (option) {
        this.option = option;
        this.loadModal();
        this.bindEvent();
    },
    hide: function () {
        this.modelWrap.empty();
    },
    bindEvent: function () {
        var _this = this;
        this.modelWrap.find('#receiver-province').change(function () {
            // 省份城市二级联动
            var selectProvince = $(this).val();
            _this.loadCity(selectProvince);
        })
        //提交收货地址
        this.modelWrap.find('.address-btn').click(function () {
            var receiverInfo = _this.getReceiverInfo(),
                isUpdate = _this.option.isUpdate;
            if (!isUpdate && receiverInfo.status) {
                //使用新地址,验证通过
                _address.addAddress(receiverInfo.data, function (res) {
                    _xh.successTips('地址添加成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function (errMsg) {
                    _xh.successTips(errMsg);
                })
            } else if (isUpdate && receiverInfo.status) {
                // 更新地址
                _address.updateAddress(receiverInfo.data, function (res) {
                    _xh.successTips('地址修改成功');
                    _this.hide();
                    typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
                }, function (errMsg) {
                    _xh.successTips(errMsg);
                })
            } else {
                // 验证未通过
                _xh.errorTips(receiverInfo.errMsg);
            }
        })
        // 阻止冒泡
        this.modelWrap.find('.modal-container').click(function (e) {
            e.stopPropagation();
        })
        // 关闭弹窗
        this.modelWrap.find('.close').click(function () {
            _this.hide();
        })
    },
    loadModal: function () {
        var addressModalHtml = _xh.renderHtml(tempAddressModal, {
            isUpdate: this.option.isUpdate,
            data: this.option.data
        });
        this.modelWrap.html(addressModalHtml);
        this.loadProvince();
    },
    //加载省份
    loadProvince: function () {
        var provinces = _cities.getProvinces() || [],
            provinceSelect = this.modelWrap.find('#receiver-province');
        provinceSelect.html(this.getSelectOption(provinces));
        if (this.option.isUpdate && this.option.data.receiverProvince) {
            provinceSelect.val(this.option.data.receiverProvince);
            this.loadCity(this.option.data.receiverProvince);
        }
    },
    //加载城市
    loadCity: function (provinceName) {
        var cities = _cities.getCities(provinceName),
            citySelect = this.modelWrap.find('#receiver-city');
        citySelect.html(this.getSelectOption(cities));
        if (this.option.isUpdate && this.option.data.receiverCity) {
            citySelect.val(this.option.data.receiverCity);
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

    //获取并验证表单信息
    getReceiverInfo: function () {
        var receiverInfo = {
                receiverName: $.trim(this.modelWrap.find('#receiver-name').val()),
                receiverProvince: $.trim(this.modelWrap.find('#receiver-province').val()),
                receiverCity: $.trim(this.modelWrap.find('#receiver-city').val()),
                receiverAddress: $.trim(this.modelWrap.find('#receiver-address').val()),
                receiverPhone: $.trim(this.modelWrap.find('#receiver-phone').val()),
            },
            result = {
                status: false,
            };

        if(this.option.isUpdate){
            receiverInfo.id = this.modelWrap.find('#receiver-id').val();
        }
        if (!receiverInfo.receiverName) {
            result.errMsg = '请输入收件人姓名';
        } else if (!receiverInfo.receiverProvince) {
            result.errMsg = '请输入收件人所在省份';
        } else if (!receiverInfo.receiverCity) {
            result.errMsg = '请输入收件人所在城市';
        } else if (!receiverInfo.receiverAddress) {
            result.errMsg = '请输入收件人所在地址';
        } else if (!receiverInfo.receiverPhone) {
            result.errMsg = '请输入收件人手机';
        } else if (!_xh.validate(receiverInfo.receiverPhone, 'phone')) {
            result.errMsg = '手机格式不正确';
        } else {
            result.status = true;
            result.data = receiverInfo;
        }
        return result;
    }
}

module.exports = addressModal;