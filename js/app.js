'use strict';
let arr = [];
function Gallery(data) {
    this.image_url = data.image_url;
    this.title = data.title;
    this.description = data.description;
    this.keyword = data.keyword;
    this.horns = data.horns;
    if (!arr.includes(this.keyword)) {
        arr.push(this.keyword);
    }
    Gallery.all.push(this);
}
Gallery.all = [];

$.ajax('./Data/page-1.json')
    .then(GalleryData => {
        GalleryData.forEach(val => {
            let newGallery = new Gallery(val);
            newGallery.renderMustash();
        });
        forSelection();
        checkGallery();

    });

function checkGallery() {
    $('select').change(function () {
        let select = $(this).val();
        $('.keyword').hide();
        $(`.${select}`).show();
        console.log(select);
    });
}
let GalleryClone;
function forSelection() {
    for (let index = 0; index < arr.length; index++) {
        GalleryClone = $('option').first().clone().text(arr[index]);
        GalleryClone.attr('value', arr[index]);
        $('select').append(GalleryClone);
    }
}

$('#page1').on('click', function () {
    $('main').empty();
    $('select').empty();
    arr = [];
    $.ajax('./Data/page-1.json')
        .then(GalleryData => {
            GalleryData.forEach(val => {
                let newGallery = new Gallery(val);
                newGallery.renderMustash();
            });
            forSelection();
            checkGallery();
        });
});

$('#page2').on('click', function () {
    $('main').empty();
    $('select').empty();
    arr = [];
    console.log(arr);

    $.ajax('./Data/page-2.json')
        .then(GalleryData => {
            GalleryData.forEach(val => {
                let newGallery = new Gallery(val);
                newGallery.renderMustash();
            });
            checkGallery();
            forSelection();
        });
});


Gallery.prototype.renderMustash = function () {
    let mustach = $('#galleryTemplate').html();
    let renderMustach = Mustache.render(mustach, this);
    console.log(this);
    $('select').append(GalleryClone);
    $('main').append(renderMustach);
};


