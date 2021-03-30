'use strict';


let arr = [];
function gallery(data) {
    this.image_url = data.image_url;
    this.title = data.title;
    this.description = data.description;
    this.keyword = data.keyword;
    this.horns = data.horns;
    if (! arr.includes(this.keyword)) {
        arr.push(this.keyword);
    }
    gallery.all.push(this);
}
gallery.all = [];




$.ajax('./Data/page-1.json')
    .then(galleryData => {
        console.log(galleryData);
        galleryData.forEach(val => {
            console.log(val);
            let newGallery = new gallery(val);
            newGallery.render();
        });

        $('.photo-template').first().remove();
        forSelection();
        checkGallery();

    });


gallery.prototype.render = function () {
    // let galleryClone = $('option').first().clone();
    // galleryClone.text(this.keyword);
    // galleryClone.attr('value', this.keyword);
    // $('select').append(galleryClone);

    let div = $('<div></div>');
    div.addClass(this.keyword);
    // div.addClass(galleryClone);
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
        console.log(select);
    });
}



function forSelection() {
    for (let index = 0; index < arr.length; index++) {
        let galleryClone = $('option').first().clone().text(arr[index]);
        galleryClone.attr('value', arr[index]);
        $('select').append(galleryClone);
    }
}


