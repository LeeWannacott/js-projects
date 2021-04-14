const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;

// Unsplash API
const count = 5;
const apiKey = 'niocaGMB01-eGv2NINHBbvt552pMPb12WNBwh0rjM3o';
const apiUrl =  `https://api.unsplash.com/photos/random/?
client_id=${apiKey}&count=${count}`;

// check if all images were loaded
function imageLoaded(){
    imagesLoaded++
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        initialLoad = false;
        count = 20;
    }
}

// helper function to set attributes on dom elements.
function setAttributes(element, attributes){
    for (const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}

// Create Elements for links and photos, add to dom.
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item,{
            href: photo.links.html,
            target: '_blank'
        });
        // create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src:  photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });
        // event listener check when each is finished loading
        img.addEventListener('load',imageLoaded);
        // put ,<img> inside <a>, then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll',() => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})

// Get photos from unsplash api
async function getPhotos(){
    try {
       const response = await fetch(apiUrl) 
       photosArray = await response.json();
       displayPhotos();
    } catch (error) {
        // catch error
    }
}

// on load 
getPhotos();