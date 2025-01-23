
//format the time

  const getTimeString = (time) => {
     const hour = parseInt(time / 3600);
     let remainingSecond = time % 3600;
     const minute = parseInt(remainingSecond / 60);
     const second = remainingSecond % 60;
     return `${hour} hour ${minute} minute ${second} second ago`;

  }
 

 //loadCategories
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
    .catch(error => console.log(error))
}

// displayCategories
const displayCategories = (categories) =>{

 const categoryContainer = document.getElementById("categories");

 categories.forEach((item) =>{
    
    const button = document.createElement("button")
    button.classList = "btn";
    button.innerHTML = `
     ${item.category}
    `;
    categoryContainer.append(button); 

 });
};

const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.log(error))
}

const displayVideos = (videos) =>{
    const videoContainer = document.getElementById("videos")

  videos.forEach( (video) => {
     const card = document.createElement("div")
     card.innerHTML = `
     <div class="card card-compact ">
  <figure class="h-[200px] rounded-md relative">
    <img class="object-cover h-full w-full"
      src=${video.thumbnail} />
      ${video.others.posted_date?.length == 0 ? "" : `  <span class="absolute bg-black text-white rounded-md bottom-2 text-xs right-2 p-1"> ${getTimeString(video.others.posted_date)} </span>`}
    
  </figure>
  <div class="px-0 py-2 flex gap-4 items-center">
    <div>
    <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
    </div>
    <div>
    <h2 class="font-bold">${video.authors[0].profile_name}</h2>
    <div class="flex gap-2">
    <p class="text-gray-400">${video.authors[0].profile_name}</p>


    ${video.authors[0].verified == true ? `<img class="w-5 object-cover" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>`:""}
  
    </div>
    </div>
  </div>
</div>
     `;

     videoContainer.append(card);
  });
};

loadCategories();
loadVideos();


