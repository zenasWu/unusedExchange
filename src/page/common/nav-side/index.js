
'use strict';
require('./index.scss');
var $ = require('jquery');
var _xh = require('../../../util/util.js');
var tempString = require('./index.string')


//侧边导航
var navSide = {
    option:{
        activeName:'',
        navList :[
            {name:'user-center',desc:'个人中心',href:'./user-center.html'},
            {name:'user-wanted',desc:'愿望单',href:'./user-wanted.html'},
            {name:'user-release',desc:'我的闲置',href:'/user-release.html'},
            {name:'pw-update',desc:'修改密码',href:'./user-pw-update.html'},
            {name:'about',desc:'关于玄换',href:'./about.html'}
        ]
    },
    
    init: function (option) {
        option = Object.assign(this.option,option);
        this.renderNav();
        return this;
    },

    renderNav:function(){
        var list = this.option.navList;
        for (let i = 0; i < list.length; i++) {
            if(list[i].name === this.option.activeName){
                list[i].isActive = true;
            }
        }
        var navHtml = _xh.renderHtml(tempString,{
            navList:list
        });

        $('.nav-side').html(navHtml);
    }
}

module.exports = navSide;