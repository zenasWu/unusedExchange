require('./basic.css');
require('./dropzone.css');
var Dropzone = require('./dropzone.js');
var tempString = require('./index.string');
var _xh = require('../util.js');

class dz {
    constructor(container, option) {
        var _this = this;
        this.data = {};
        this.Option = {
            method: 'POST',
            paramName: 'image',
            parallelUploads: 5,
            uploadMultiple: true,
            maxFiles: 5,
            createImageThumbnails: true,
            acceptedFiles: 'image/*',
            autoQueue: false,
            addRemoveLinks: true,
            // translation Part
            dictDefaultMessage: "点击上传",
            dictInvalidFileType: "仅支持图片文件",
            dictCancelUpload: "取消上传图片",
            dictCancelUploadConfirmation: "确定取消上传图片?",
            dictRemoveFile: "删除",
            dictRemoveFileConfirmation: "确定删除图片",
        }
        Dropzone.autoDiscover = false;
        this.myDropzone = new Dropzone(container, Object.assign(this.Option, option));
        $(container).addClass('dropzone');

        this.myDropzone.on("sendingmultiple", function (file, xhr, formData) {
            // Will send the filesize along with the file as POST data.'
            var otherData = _this.data;
            for (const key in otherData) {
                formData.append(key, otherData[key]);
            }
        });

        this.myDropzone.on("uploadprogress", function (file, progress) {
            file.previewElement.querySelector(".dz-upload").style.width = progress + "%";
        });

        this.myDropzone.on("sending", function (file) {
            file.previewElement.querySelector(".dz-progress").style.opacity = "1";
        });
        this.myDropzone.on("complete", function (file) {
            file.previewElement.querySelector(".dz-progress").style.opacity = "0";
            // _this.myDropzone.removeFile(file);
        });

        this.myDropzone.on("maxfilesexceeded", function (file) {
            _this.myDropzone.removeFile(file);
        });
    }
    setOtherData(ortherData) {
        this.data = Object.assign({}, this.data, ortherData);
    }
    upload() {
        this.myDropzone.enqueueFiles(this.myDropzone.getFilesWithStatus(Dropzone.ADDED));
    }

    isEmpty() {
        return !this.myDropzone.getQueuedFiles().length;
    }
}

module.exports = dz;