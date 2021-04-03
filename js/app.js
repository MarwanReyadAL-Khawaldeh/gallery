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


$('#title').click(handleSubmitKeyword);

function handleSubmitKeyword() {
    arr.sort(function (a, b) {
        return a.keyword.localeCompare(b.keyword);
    });

    $('#MustacheTemplate').fadeOut(300);
    const mainPage = document.querySelector('main');
    for (let i = 0; i < arr.length; i++) {
        const parentElement = document.createElement('#MustacheTemplate');
        mainPage.appendChild(parentElement);

        const keywords = document.createElement('h2');
        parentElement.appendChild(keywords);
        keywords.textContent = `${arr[i].keyword}`;

        const img = document.createElement('img');
        parentElement.appendChild(img);
        img.setAttribute('src', `${arr[i].image_url}`);

        const titles = document.createElement('h3');
        parentElement.appendChild(titles);
        titles.textContent = `${arr[i].title}`;

        const numHorns = document.createElement('h4');
        parentElement.appendChild(numHorns);
        numHorns.textContent = `Number Of Horns: ${arr[i].horns}`;
    }
}



$('#horns').click(handleSubmitHorns);

function handleSubmitHorns() {
    arr.sort(function (a, b) {
        return a.horns - b.horns;
    });

    $('#MustacheTemplate').fadeOut(300);
    const mainPage = document.querySelector('main');
    for (let i = 0; i < arr.length; i++) {
        const parentElement = document.createElement('#MustacheTemplate');
        mainPage.appendChild(parentElement);

        const hornsNum = document.createElement('h2');
        parentElement.appendChild(hornsNum);
        hornsNum.textContent = `Number Of Horns: ${arr[i].horns}`;

        const img = document.createElement('img');
        parentElement.appendChild(img);
        img.setAttribute('src', `${arr[i].image_url}`);

        const titles = document.createElement('h3');
        parentElement.appendChild(titles);
        titles.textContent = `${arr[i].title}`;

        const keywords = document.createElement('h4');
        parentElement.appendChild(keywords);
        keywords.textContent = `Number Of Horns: ${arr[i].keyword}`;
    }
}

