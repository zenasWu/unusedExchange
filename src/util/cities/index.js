'use strict';
var data = require('./citiesJson.js');
var _cities = {
    // 获取所有的省份
    getProvinces: function () {
        var provinces = [];
        data.provinces.forEach(provinceElement => {
            provinces.push(provinceElement.provinceName);
        });
        return provinces;
    },
    // 获取某省份的所有城市
    getCities: function (provinceName) {
        var cities = [];
        data.provinces.forEach(provinceElement => {
            if(provinceElement.provinceName === provinceName){
                provinceElement.citys.forEach(cityElement => {
                    cities.push(cityElement.citysName)
                });
            }
        });
        return cities;
    }
}

module.exports = _cities;