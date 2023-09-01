const handleCategory = async () =>{
    const res = await fetch ("https://openapi.programming-hero.com/api/videos/categories");
    const data = await res.json();
    const categories = data.data;
    const tabContainer = document.getElementById("tab-container");
    console.log(categories);
    categories.slice(0,4).forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <a class="tab rounded-lg bg-[#25252526]">${category.category}</a> 
        `;
        tabContainer.appendChild(div);
    });
}
handleCategory();