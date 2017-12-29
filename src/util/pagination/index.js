'use strict';

require('./index.scss');
var _xh = require('../util.js');
var tempPagination = require('./index.string');

class Pagination {
    option;
    constructor() {
        this.defaultOption = {
            container: null,
            pageNum: 1,
            pageRange: 3,
            onSelectPage: null
        }
        var _this = this;

        $(document).on('click','.pg-item',function(){
            var pageSelected = $(this);
            //过滤不能使用的按钮
            if(pageSelected.hasClass('active')||pageSelected.hasClass('active')){
                return;
            }
            typeof _this.option.onSelectPage === 'function'? _this.option.onSelectPage(pageSelected.data('value')):null;
        })
    }

    render(userOption) {
        this.option = Object.assign({}, this.defaultOption, userOption);
        if (!(this.option.container instanceof jQuery)) {
            return;
        }
        if (this.option.pages <= 1) {
            return;
        }
        this.option.container.html(this.getPaginationHtml());
    }

    getPaginationHtml() {
        var html = '',
            option = this.option,
            pageArray = [],
            start = option.pageNum - option.pageRange > 0 ? option.pageNum - option.pageRange : 1,
            end = option.pageNum + option.pageRange < option.pages ? option.pageNum + option.pageRange : option.pages;

        //上一页
        pageArray.push({
            name: '上一页',
            value: option.prePage,
            disabled: !option.hasPreviousPage
        });

        //数字按钮
        for (var i = start; i <= end; i++) {
            pageArray.push({
                name: i,
                value: i,
                active: (i === option.pageNum),
            });
        }

        //下一页
        pageArray.push({
            name: '下一页',
            value: option.nextPage,
            disabled: !option.hasNextPage
        });

        html = _xh.renderHtml(tempPagination, {
            pageArray: pageArray,
            pageNum: option.pageNum,
            pages: option.pages
        })

        return html;
    }
}

module.exports = Pagination;