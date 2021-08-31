const form = document.querySelector('form');    //Selecting the form from HTML page
form.addEventListener('submit', async function (e) {
    e.preventDefault(); //This stops our page from reloading when the button to submit the form is clicked
    const searchTerm = form.elements.query.value;
    resetImages();
    /*Break down of line below:
axios.get: This returns a resolved promisde and we do not have to parse the JSON data to make it an Object literal because this already does it for us
The url is the api from tvmaze and we add our userinput as the query string
*/
    const config = { params: { q: searchTerm } };   //This creates an object w/ a nest object and every key value pair will be added to the sting
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    makeImages(res.data);   //res.data returns an array containg all the shows w/ users input
    form.elements.query.value = '';
})

const makeImages = (arrShows) => {
    for (let results of arrShows) {
        //If the element in the array has an image

        if (results.show.image) {
            const img = document.createElement('IMG');  //Makes an image element but does not add it to the webpage yet
            img.src = results.show.image.medium;    //Gives the var img an actual img to store (results is the current element in the array of shows and the image is stores under the show property)
            document.body.appendChild(img);         //Adds the image to the body of the document

        }

    }
}

function resetImages() {
    const images = document.querySelectorAll('img');
    for (let eachImage of images) {
        eachImage.remove();
    }
}
