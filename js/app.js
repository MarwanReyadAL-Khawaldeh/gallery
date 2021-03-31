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
        $('div').hide();
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

function sortHorns() {
    Gallery.all.sort(function(a,b){
        if (a.horns < b.horns) {
            return 1;
        } else if (a.horns > b.horns) {
            return -1;
        } else {
            return 0;
        }
    });
}

function sortTitle() {
    Gallery.all.sort(function(a,b){
        if (a.keyword.toUpperCase() < b.keyword.toUpperCase()) {
            return 1;
        } else if (a.keyword.toUpperCase() > b.keyword.toUpperCase()) {
            return -1;
        } else {
            return 0;
        }
    });
}

$('#Sort-Title').on('click', function () {
    $('main').empty();
    arr = [];
    $.ajax('./Data/page-1.json')
        .then(GalleryData => {
            GalleryData.forEach(val => {
                let newGallery = new Gallery(val);
                newGallery.sortHorns();
                console.log(newGallery);
                newGallery.renderMustash();
            });
            forSelection();
            checkGallery();
        });
});

$('#Sort-by-NumHorns').on('click', function () {
    $('main').empty();
    arr = [];
    $.ajax('./Data/page-1.json')
        .then(GalleryData => {
            GalleryData.forEach(val => {
                let newGallery = new Gallery(val);
                newGallery.sortTitle();
                newGallery.renderMustash();
                console.log(newGallery);
            });
            forSelection();
            checkGallery();
        });
});



