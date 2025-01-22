console.log('video file added')

// 1. Fetch , load & show categories on html

// create loadCategories

const loadCategories = () => {
    //fetch the data
     fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => console.log(data.categories[0]))
    .catch((err) => console.log(err))
};

//create displayCategories

const displayCategories = () => {
   //add data in html


};

loadCategories();