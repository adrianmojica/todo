document.addEventListener("DOMContentLoaded", function() {
console.log('ready');


//get form and form inputs
let memeForm = document.getElementById('meme-form');
let imageInput = document.querySelector('.meme-image-input');
let topText = document.querySelector('.meme-top-input');
let bottomText = document.querySelector('.meme-bottom-input');
let formButton = document.querySelector('.submit-meme');
let list = document.querySelector('.meme-list');


formButton.addEventListener('click',function(event){
    event.preventDefault();
    if (imageInput.value.length < 1) return;
    createMeme(imageInput.value,topText.value,bottomText.value);
    memeForm.reset();
});


function createMeme(meme,topText,bottomText){
    console.log(meme, topText,bottomText);

    // creat meme item structure
    let memeContainer = document.createElement('div');
    memeContainer.classList.add('meme-container')
    let memeItem = document.createElement('li');
    memeItem.classList.add("meme-item");
    let memeImage = document.createElement('img');
    memeImage.classList.add('meme-image');
    memeImage.src = meme;
    let topCaption = document.createElement('div');
    topCaption.className = "top-caption";
    topCaption.innerText = topText;
    let bottomCaption = document.createElement('div');
    bottomCaption.className = "bottom-caption";
    bottomCaption.innerText = bottomText;
    let controls = document.createElement('div');
    controls.classList.add('meme-controls');
    let erase = document.createElement('button');
    erase.className ='erase';
    erase.innerHTML = "&#10006"

    // form the meme and append it to the list
    memeContainer.appendChild(memeImage);
    memeContainer.appendChild(topCaption);
    memeContainer.appendChild(bottomCaption);
    controls.appendChild(erase);
    memeContainer.appendChild(controls);
    memeItem.appendChild(memeContainer);
    list.appendChild(memeContainer);


};


// event delegation for done button and erase button
// if the button is pressed and has class done find parent and toggle cross class
// if the button is pressed and has class of erase find parent and remove from list
list.addEventListener('click',function(event){
    console.log(event.target.className);
    if (event.target.className === 'erase') {
        console.log(event.target.parentElement.parentElement.remove());
    }
});


});