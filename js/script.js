const handleCategory = async () => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    const categories = data.data;
    const tabContainer = document.getElementById("tab-container");
    // console.log(categories);
    categories.slice(0, 4).forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <a onclick="handleLoad('${category.category_id}')" class="tab rounded-lg bg-[#25252526]">${category.category}</a> 
        `;
        tabContainer.appendChild(div);
    });
};


const handleLoad = async (categoryId) => {
    console.log(categoryId);
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`
    );
    const data = await res.json();
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";

    data.data.forEach((image) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="card card-compact bg-base-100 shadow-xl">
        <figure><img class="w-full mx-auto h-60 rounded-lg" src=${image?.thumbnail} alt="" /></figure>

        <div class="flex justify-center items-center ml-4">
        <div class="avatar">
        <div class="w-16 rounded-full">
        <img src=${image?.authors[0]?.profile_picture} />
        </div>
        </div>

        <div class="card-body">
        <h2 class="card-title">${image.title}</h2>
        <div class="flex ">
        <p>${image?.authors[0]?.profile_name}</p>
        <p>${image?.authors[0]?.verified ? '<img src="images/mark.svg" />' :""}</p>
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