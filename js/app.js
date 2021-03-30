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
            newGallery.render();
        });
        forSelection();
        checkGallery();

    });




Gallery.prototype.render = function () {
    let div = $('<div></div>');
    div.addClass(this.keyword);
    // div.addClass(GalleryClone);
    let template = $('.photo-template').html();
    div.html(template);

    div.find('h2').text(this.title);
    div.find('img').attr('src', this.image_url);
    div.find('p').text(this.description);

    $('main').append(div);

};

function checkGallery() {
    $('select').change(function () {
        let select = $(this).val();
        $('div').hide();
        $(`.${select}`).show();
    });
}



function forSelection() {
    for (let index = 0; index < arr.length; index++) {
        let GalleryClone = $('option').first().clone().text(arr[index]);
        GalleryClone.attr('value', arr[index]);
        $('select').append(GalleryClone);
    }
}

$('#page1').on('click', function () {
    $('main').empty();
    $.ajax('./Data/page-1.json')
        .then(GalleryData => {
            GalleryData.forEach(val => {
                let newGallery = new Gallery(val);
                newGallery.render();
            });
            forSelection();
            checkGallery();

        });
});

$('#page2').on('click', function () {
    $('main').empty();
    $.ajax('./Data/page-2.json')
        .then(GalleryData => {
            GalleryData.forEach(val => {
                let newGallery = new Gallery(val);
                newGallery.renderMustash();
            });
            forSelection();
            checkGallery();

        });
});


Gallery.prototype.renderMustash = function () {
    let mustach = $('#galleryTemplate').html();
    let renderMustach = Mustache.render(mustach, this);
    console.log(this);
    let section = $('section');
    section.addClass(this.keyword);
    $('main').append(renderMustach);

    let keyList = $('option').first().clone().text(this.keyword);
    $('select').append(keyList);


};


