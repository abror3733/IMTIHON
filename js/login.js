

let elAddBtn = document.querySelector(".add-btn")
let elList = document.querySelector(".list")

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModal = document.querySelector(".modal")
let elNavInputChange =document.querySelector(".nav-input-change")
let elNavImgChange =document.querySelector(".nav-img-change")

let elSearchInput = document.querySelector(".search-input")
let elSearchList = document.querySelector(".search-list")
let elBtnLogout = document.querySelector(".btn-logout")

let dataTime = new Date()
let newTime = (`${dataTime.getDate().toString().padStart(2,"0")}.${(dataTime.getMonth() + 1).toString().padStart(2,"0")}.${dataTime.getFullYear()}  ${dataTime.getHours().toString().padStart(2,"0")}:${dataTime.getMinutes().toString().padStart(2,"0")} `)

elNavInputChange.addEventListener("change", function(evt) {
  const file = evt.target.files[0];
  const imageUrl = URL.createObjectURL(file);
  elNavImgChange.src = imageUrl;

  // Faylni brauzer xotirasiga saqlash
  window.localStorage.setItem("navImage", imageUrl);
});

// ------ modal  start ----- 

let datas =JSON.parse(window.localStorage.getItem("datas")) || []
elAddBtn.addEventListener("click",function(){
  elModalWrapper.classList.add("open-modal")

  elModal.innerHTML=`
    <form class=" add-form w-[100%]">
      <img id="modal-imgx" class="modal-imgx hover:scale-125 ease-out duration-300 flex justify-end top-[20px] absolute right-[20px] cursor-pointer" src="https://cdn4.iconfinder.com/data/icons/generic-interaction/143/close-x-cross-multiply-delete-cancel-modal-error-no-512.png" alt="modal-icon" width="30" height="30">
      <div class="w-[200px] border-dashed border-[2px] border-black mx-auto  py-[10px] px-[30px] rounded-[10px] mt-[30px]" >
        <label class="w-[100%]">
          <img class="cursor-pointer render-img" src="./images/chooose.webp" alt="Choose-img" width="100%" height="100%"/>
          <input class="visually-hidden get-img" type="file"/>
        </label>
      </div>
      <div class="flex flex-col">
        <div class="flex justify-between items-center pt-[40px]">
          <div class="w-[45%] flex flex-col gap-[20px]">
            <label class="flex flex-col gap-[2px]">
              <span class="text-[15px] font-semibold">Enter user name</span>
              <input type="text" class="py-[8px] pl-[15px] rounded-[4px] outline-none" placeholder="enter user name"/>
            </label>
            <label class="flex flex-col gap-[2px]">
              <span class="text-[15px] font-semibold">Enter user Email</span>
              <input type="email" class="py-[8px] pl-[15px] rounded-[4px] outline-none" placeholder="enter user Email"/>
            </label>
          </div>
          <div class="w-[45%] flex flex-col gap-[20px]">
            <label class="flex flex-col gap-[2px]">
              <span class="text-[15px] font-semibold">Enter user Phone</span>
              <input type="tel" class="py-[8px] pl-[15px] rounded-[4px] outline-none" placeholder="enter user Phone"/>
            </label>
            <label class="flex flex-col gap-[2px]">
              <span class="text-[15px] font-semibold">Enter Enroll Number</span>
              <input type="text" class="py-[8px] pl-[15px] rounded-[4px] outline-none" placeholder="Enter Enroll Number"/>
            </label>
          </div>
        </div>
        <div class="mt-[40px] flex  justify-center mb-[30px]">

          <button class="w-[45%] h-[50px] py-[8px] pl-[15px] bg-orange-800 hover:opacity-70 ease-out duration-300 text-white text-[20px] rounded-[4px] ">Add+</button>
        </div>
      </div>
    </form>
  `;

  let elForm = document.querySelector(".add-form");
  let elInputChange = document.querySelector(".get-img");
  let elRenderImg = document.querySelector(".render-img");

   


  elInputChange.addEventListener("change", function(evt){
     elRenderImg.src =  URL.createObjectURL(evt.target.files[0]);
  });
  elForm.addEventListener("submit",function(evt){
    evt.preventDefault();
     
    const data = {
      id: datas.length, // 
      img: evt.target[0].files[0] ? URL.createObjectURL(evt.target[0].files[0]) : "", // Fayl mavjudligini tekshirish
      name: evt.target[1].value,
      email: evt.target[2].value,
      phone: evt.target[3].value,
      number: evt.target[4].value
    };
    datas.push(data);
    renderCrud(datas,elList);
    elModalWrapper.classList.remove("open-modal");
    window.localStorage.setItem("datas", JSON.stringify(datas));
  });
});




elModalWrapper.addEventListener("click", function(evt){
  if( evt.target.id == "modal-wrapper" || evt.target.id =="modal-imgx"){
    elModalWrapper.classList.remove("open-modal")
  }
})


// ------ modal  end ----- 

function renderCrud(arr,list){
  let newTime = (`${dataTime.getDate().toString().padStart(2,"0")}.${(dataTime.getMonth() + 1).toString().padStart(2,"0")}.${dataTime.getFullYear()}  ${dataTime.getHours().toString().padStart(2,"0")}:${dataTime.getMinutes().toString().padStart(2,"0")} `)
  list.innerHTML=``
  arr.map(item=>{
    let elItem = document.createElement("li")
    elItem.classList.add("list-item-render")
    elItem.innerHTML=`
      <div class="w-[180px] flex justify-evenly items-center">
         <img class="inline-block rounded-[20%]" src="${item.img}" alt="render-img" width="60" height="60"/>
         <span class="inline-block ">${item.name}</span>
      </div>
      <span class="w-[160px]">${item.email}</span>
      <span class="w-[160px]">${item.phone}</span>
      <span class="w-[160px]">${item.number}</span>
       <div class="w-[160px] flex items-center gap-[25px]">
            <span>${newTime}</span>
           <button onclick="updateCrud(${item.id})" class="update-btn">

              <img class="  hover:opacity-40 ease-out duration-100" src="./images/update-icon.svg" alt="update-icon" width="19" height="19"/>
          </button>
          <button onclick="deleteCrud(${item.id})">
          <img class="hover:opacity-40 ease-out duration-100" src="./images/delete-icon.svg" alt="update-icon" width="16" height="18"/>
       </button>
       
       </div>
    `
    list.appendChild(elItem)
    window.localStorage.setItem("datas", JSON.stringify(datas));
  })
}

renderCrud(datas,elList)


// Update part start 
let elUpdateForm = document.querySelector(".update-form");
let elUpdateInputImg = document.querySelector(".update-img-input");
let elUpdateImg = document.querySelector(".update-img");

// elUpdateInputImg.addEventListener("change", function(evt){
//   elUpdateImg.src = URL.createObjectURL(evt.target.files[0]);
// });


function updateCrud(id) {
  let data = datas.find(item => item.id == id);
  elModalWrapper.classList.add("open-modal");
  elModal.innerHTML = `
    <form class="update-form w-[100%]">
      <img id="modal-imgx" class="modal-imgx hover:scale-125 ease-out duration-300 flex justify-end top-[20px] absolute right-[20px] cursor-pointer" src="https://cdn4.iconfinder.com/data/icons/generic-interaction/143/close-x-cross-multiply-delete-cancel-modal-error-no-512.png" alt="modal-icon" width="30" height="30">
      <div class="w-[200px] border-dashed border-[2px] border-black mx-auto py-[10px] px-[30px] rounded-[10px] mt-[30px]">
        <label class="w-[100%]">
          <img class="cursor-pointer update-img" src="${data.img}" alt="Choose-img" width="100%" height="100%"/>
          <input class="visually-hidden update-img-input " type="file"/>
        </label>
      </div>
      <div class="flex flex-col">
        <div class="flex justify-between items-center pt-[40px]">
          <div class="w-[45%] flex flex-col gap-[20px]">
            <label class="flex flex-col gap-[2px]">
              <span class="text-[15px] font-semibold">Enter user name</span>
              <input value="${data.name}" type="text" class="py-[8px] pl-[15px] rounded-[4px] outline-none" placeholder="enter user name"/>
            </label>
            <label class="flex flex-col gap-[2px]">
              <span class="text-[15px] font-semibold">Enter user Email</span>
              <input value="${data.email}" type="email" class="py-[8px] pl-[15px] rounded-[4px] outline-none" placeholder="enter user Email"/>
            </label>
          </div>
          <div class="w-[45%] flex flex-col gap-[20px]">
            <label class="flex flex-col gap-[2px]">
              <span class="text-[15px] font-semibold">Enter user Phone</span>
              <input value="${data.phone}" type="tel" class="py-[8px] pl-[15px] rounded-[4px] outline-none" placeholder="enter user Phone"/>
            </label>
            <label class="flex flex-col gap-[2px]">
              <span class="text-[15px] font-semibold">Enter Enroll Number</span>
              <input value="${data.number}" type="text" class="py-[8px] pl-[15px] rounded-[4px] outline-none" placeholder="Enter Enroll Number"/>
            </label>
          </div>
        </div>
        <div class="mt-[20px] flex items-end justify-between mb-[30px]">
          <label class="flex flex-col gap-[2px]">
            <span class="text-[15px] font-semibold">Enter date</span>
            <input class="py-[8px] pl-[15px] pr-[5px] rounded-[4px] outline-none" type="date"/> 
          </label>
          <button type="submit" class="w-[45%] h-[50px] py-[8px] pl-[15px] bg-orange-800 hover:opacity-70 ease-out duration-300 text-white text-[20px] rounded-[4px] ">Update</button>
        </div>
      </div>
    </form>
  `;

 
  elUpdateForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
    // const file = evt.target[0].files[0];
    // if (file) {
    //   data.img = URL.createObjectURL(file);
    //   document.querySelector(".update-img").src = data.img;
    // }
    data.img = evt.target.files[0]
    data.name = evt.target[1].value;
    data.email = evt.target[2].value;
    data.phone = evt.target[3].value;
    data.number = evt.target[4].value;

    renderCrud(datas,elList)
    elModalWrapper.classList.remove("open-modal");
  });
}



// Update part end



// delete part start 

function deleteCrud(id){
  let finedIndex =datas.findIndex(item=>item.id==id)
  let confirmDelete = confirm("Are you delete")
  if(confirmDelete == true){
    datas.splice(finedIndex,1)
    renderCrud(datas,elList)
    window.localStorage.setItem("datas", JSON.stringify(datas));
  }
  else{
    renderCrud(datas,elList)
  }
}

//delete part end 



// Search start 
elSearchInput.addEventListener("keyup",function(evt){
let  data = datas.filter(item=>item.name.toLowerCase().includes(evt.target.value.toLowerCase()))
elSearchList.innerHTML=``
data.map(item=>{
  let elListItem =document.createElement("li")
  elListItem.className="cursor-pointer"
  elListItem.dataset.id=item.id
  elListItem.textContent =`${item.name}`
  elSearchList.appendChild(elListItem)
 
  elListItem.addEventListener("click",function(evt){
    let clickedId = evt.target.dataset.id
    let dataClick = datas.find(item=>item.id == clickedId)
 
    elSearchInput.value=`${dataClick.name}`

    let searchFilter = datas.filter(item=>item.id == clickedId)
    renderCrud(searchFilter,elList)

    console.log(searchFilter);
  })
 

})



if(evt.target.value){
  elSearchList.classList.add("open-list")
}
else{
  elSearchList.classList.remove("open-list")
}
})

elSearchInput.addEventListener("blur",function(evt){
  elSearchList.classList.remove("open-list")
})


// Search end



// logout 
elBtnLogout.addEventListener("click", function(evt){
  evt.preventDefault()
  elModalWrapper.classList.add("open-modal")
  elModal.innerHTML=`
  <div class=" logout-form w-[100%] mx-auto">
    <img id="modal-imgx" class="modal-imgx hover:scale-125 ease-out duration-300 flex justify-end top-[20px] absolute right-[20px] cursor-pointer" src="https://cdn4.iconfinder.com/data/icons/generic-interaction/143/close-x-cross-multiply-delete-cancel-modal-error-no-512.png" alt="modal-icon" width="30" height="30">
  <div class="mx-auto mt-[120px]  flex gap-[100px] flex-col justify-center items-center">
  <div class="">
  <h2 class="text-[44px] font-semibold">Log out the page ?</h2>
  </div>
  <div class="flex gap-[30px] items-center">
  <button id="0" onclick="cancelBtn()" class="hover:opacity-50 ease-out duration-300 text-[24px] w-[180px] py-[9px] px-[15px] bg-white rounded-[8px] text-[#FEAF00]">Cancel</button>
  <button id="1" onclick="logoutBtn()" class="hover:opacity-50 ease-out duration-300 text-[24px] w-[180px] py-[9px] px-[15px] bg-[#9A3412] rounded-[8px] text-white">Yes</button>
  </div>
  </div>
  </div>
`;

})

function cancelBtn(){
   elModalWrapper.classList.remove("open-modal")
}
function logoutBtn(){
 setTimeout(()=>{
  window.location = "index.html";
 },1000)

}


// localStorage dan login ma'lumotini olish
let savedLogin = localStorage.getItem("login");

// elTitle elementini tanlash
let elTitle = document.querySelector(".title");

// localStorage da login ma'lumoti borligini tekshirish
if (savedLogin) {
    // elTitle elementining textContentiga login ma'lumotini joylash
    elTitle.textContent = savedLogin;
} else {
    // localStorage da login ma'lumoti yo'q bo'lsa, bo'sh qoldirish
    elTitle.textContent = "";
}
