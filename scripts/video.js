
function getTimeString(time){

  //get hour and rest seconds 
  const hour = parseInt(time/3600);
  let remainingSecond = (time % 3600);
  const minute = parseInt(remainingSecond / 60);
  const second = remainingSecond % 60;
  return `${hour} hour ${minute}minute ${second} second ago`;
}

const removeActiveClass = () => {
   const buttons = document.getElementsByClassName('category-btn');
   console.log(buttons);
   for(let btn of buttons){
    btn.classList.remove("active");
   }
}


//fetch load and show categories on html

// create loadCategories
 const loadCategories = () => {
   //fetch the data
   fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
   .then(res => res.json())
   .then(data => displayCategories(data.categories))
   .catch(error => console.log(error));
 };

  const loadVideos = (searchText = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then( res => res.json())
    .then(data => displayVideos(data.videos))
    .catch(error => console.log(error));
  }


  const loadCategoryVideos = (id) =>{
  //  alert(id);
   fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then( res => res.json())
    .then(data => {
      //shobaike active class remove korao
        removeActiveClass();
      //id er class ke use korai
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideos(data.category);
      
    })
    .catch(error => console.log(error));
  }

  const loadDetails = async  (videoId) => {
   console.log(videoId);

   const uri = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
   const res = await fetch(uri);
   const data = await res.json();
   displayDetails(data.video)

  }

  const displayDetails = (video) =>{
   console.log(video);
   const detailsContainer = document.getElementById("modal-content");

   detailsContainer.innerHTML = `
   <img src=${video.thumbnail} />
   <p>${video.description}</p>
   `
   //WAY-1 
  //  document.getElementById("showModalData").click();

   //way-2
   document.getElementById("customModal").showModal();
  };



const displayVideos = (videos) => {
   const videoContainer = document.getElementById("videos");
   videoContainer.innerHTML = "";

   if(videos.length == 0){
    videoContainer.classList.remove("grid");
    videoContainer.innerHTML = `
    <div class="min-h-[300px] flex flex-col gap-5 items-center justify-center">
    <img src="../assets/Icon.png"/>
    <p class="font-bold text-red-400 text-xl"> NO CONTENT HERE </p>
    </div>
    `;
    return ;
   }
   else{
    videoContainer.classList.add("grid");
   }

   videos.forEach((video) =>{
      // console.log(video)

      const card = document.createElement("div");
      card.classList = "card card-compact"
      card.innerHTML = `
      <figure class="h-[200px] rounded-md relative">
    <img class="h-full w-full object-cover"
      src=${video.thumbnail} />
     
      ${video.others.posted_date?.length == 0 ? "" : `<span class="absolute right-2 bottom-2 bg-black rounded-md p-1 text-xs text-white">${getTimeString(video.others.posted_date)}</span>  `
      }

  </figure>
  <div class="px-0 py-2 flex gap-2">
    <div class="">
    <img class="w-10 h-10 rounded-full object-cover" src=${video.authors[0].profile_picture}/>
    </div>
    <div>
    <h2 class="font-bold">${video.title}</h2>
    <div class="flex gap-2 items-center">
    <p class="text-gray-400">${video.authors[0].profile_name}</p>
     ${video.authors[0].verified == true ? `  <img class="w-5 object-cover" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>` : ""}
    </div>
    <p> <button onclick="loadDetails('${video.video_id}')" class="btn btn-sm btn-error">details</button> </p>
    </div>
    
  </div>
      `;
      videoContainer.append(card);
   });
};

// create displayCategories
const displayCategories = (categories) => { 
  const categoryContainer = document.getElementById("categories");
  
 categories.forEach((item) =>{
      console.log(item)

      //create a button
      const buttonContainer = document.createElement("div");
      buttonContainer.innerHTML = `
      <button class="btn category-btn" id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})">
      ${item.category}
      </button>
      `;
      
      // add button to category container
      categoryContainer.append(buttonContainer);
 });
 
};

document.getElementById("search-input").addEventListener("keyup", (e) =>{
   loadVideos(e.target.value);
}) ;




loadCategories();
loadVideos();
