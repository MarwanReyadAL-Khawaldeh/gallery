'use strict';
let arr=[];
function gallery(data) {
    this.image_url = data.image_url;
    this.title = data.title;
    this.description = data.description;
    this.keyword = data.keyword;
    this.horns = data.horns;
    arr=[this.keyword];
    if(! arr.includes(this.keyword)){
        arr.push(galleryClone);
    }
    
    gallery.all.push(this);
}
gallery.all = [];

console.log(arr);



$.ajax('./gallery.json')
    .then(galleryData => {
        console.log(galleryData);
        galleryData.forEach(val => {
            console.log(val);
            let newGallery = new gallery(val);
            newGallery.render();
        });

        $('.photo-template').first().remove();

    });


gallery.prototype.render = function () {
    let galleryClone = $('option').first().clone();
    galleryClone .text(this.keyword);
    galleryClone.attr('value',this.keyword);
    if(! arr.includes(galleryClone.text())){
        arr.push(galleryClone.text());
       
      }

   $('select').append(galleryClone);

    let div = $('<div></div>');
    div.addClass(galleryClone);
    let template = $('.photo-template').html();
    div.html(template);

    div.find('h2').text(this.title);
    div.find('img').attr('src', this.image_url);
    div.find('p').text(this.description);

    $('main').append(div);

}

$('select').on('change',function(){
    let selectValue = $(this).val();
    if(selectValue !== 'default'){
      $('.photo-template').removeClass('show');
      $('.'+selectValue).addClass('show');
    }else{
      $('.photo-template').addClass('show');
    }
  });



