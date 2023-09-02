const handleCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    const categories = data.data;
    const tabContainer = document.getElementById("tab-container");
    categories.slice(0, 4).forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <a onclick="handleLoad('${category.category_id}')" class="tab rounded-lg bg-[#25252526]">${category.category}</a> 
        `;
        tabContainer.appendChild(div);
    });
};


const handleLoad = async (categoryId) => {

    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    const data = await res.json();
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    const category = data.data;
    // console.log(data.data);


    //No Content Show
    const noContainer = document.getElementById("no-content");
    noContainer.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML=`
    <div class="card w-96 mx-auto bg-base-100 shadow-xl">
    <figure class="px-10 pt-10">
      <img src="images/Icon.png" alt="Shoes" class="rounded-xl" />
    </figure>
    <div class="card-body items-center text-center">
      <p>Oops!! Sorry, There is no content here</p>
    </div>
  </div>
    `;
    noContainer.appendChild(div);

    if (data.data.length === 0) {
        noContainer.classList.remove('hidden');
    }
    category.forEach((image) => {
          //sort
        const view= image?.others?.views;
        let arrayIs = [];
        let viewArray = parseFloat(view.split(" "));
        console.log(viewArray);
        

        //convert min and hr 
        const seconds = `${image?.others?.posted_date}`;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds / 3600) / 60);
        const times = `${hours}hrs ${minutes} min ago`;
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card card-compact bg-base-100 shadow-xl">
        <div class=" relative "><img class="w-full mx-auto h-60 rounded-lg" src=${image?.thumbnail} alt="" />
        <div class="absolute rounded-lg bottom-4 right-4 bg-[#171717] text-white">
        ${hours === 0 && minutes === 0 ? '' : times}</div>
        </div>
        <div class="flex justify-start space-x-5 m-5 items-center ml-4">
        <div class="avatar">
        <div class="w-14 rounded-full">
        <img src=${image?.authors[0]?.profile_picture} />
        </div>
        </div>

        <div class="">
        <h2 class="card-title">${image.title.slice(0, 30)}</h2>
        <div class="flex justify-start items-center gap-3">
        <p>${image?.authors[0]?.profile_name}</p>
        <p>${image?.authors[0]?.verified ? '<img src="images/mark.svg" />' : ""}</p>
        </div>
        <p>${image?.others?.views} views</p>
        </div>
        </div>

        </div>
        `;
        cardContainer.appendChild(div);


    });

};

handleCategory();
handleLoad("1000");
