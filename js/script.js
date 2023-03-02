const baseURL = "https://snapify.onrender.com/";
// const headers = {
//   "Content-Type": "application/json; charset=UTF-8",
//   authorization: `Bearer ${localStorage.getItem("token")}`,
// };
const splitDateTime = (dateTime) => {
  return (splitted = dateTime.split(
    "GMT+0200 (Eastern European Standard Time)"
  )[0]);
};
const setAllPosts = (list) => {
  var container = ``;
  for (let i = 0; i < list.length; i++) {
    // console.log(list[i]);
    // const time = new Date(list[i].createdAt);
    // console.log(time);
    container += `<div class="mt-4 px-5">
    <div class="px-4 md:px-7">
      <div class="justify-between flex items-start mb-3">
        <div class="flex gap-2 items-center">
          <div class="aspect-square overflow-hidden w-[50px] rounded-full border border-gray-300"><img
              alt="avatar" srcset="" src="./assets/images/avatar.svg" width="50" height="50" decoding="async"
              data-nimg="1" class="object-cover w-full h-full" loading="lazy" style="color: transparent;">
          </div>
          <div><a class="font-bold text-white" href="">ِ${list[i].userId.userName}</a>
            <p class="text-sm text-gray-400">${list[i].createdAt}</p>
          </div>
        </div><button type="button"
          class="text-blue-600 bg-blue-600/[.10] hover:bg-blue-600/[.20]  font-medium  py-2 px-4 text-sm rounded-lg"
          style="color: #af4daf;">Follow</button>
      </div>
      <p class="mb-2 text-[15px]" style="color: #b9b9b9;">${list[i].caption}</p>
      <div class="flex gap-2 mb-2"><a class="text-blue-600 text-[15px] hover:underline" href="">#${list[i].topics}</a>
      </div>
    </div>
    <div class="px-7">
      <div class="flex items-center mb-2 gap-4 py-4 text-gray-400"><button type="button"
          class="group flex text-[15px] items-center gap-2">
          <i class="fas fa-heart"></i>
          <span>1
            Like</span>
        </button><button type="button" class="group flex items-center text-[15px] gap-2">
          <i class="fas fa-comment"></i>
          <span>1
            Comment</span></button></div>
    </div>
    <hr class="text-white">
  </div>`;
  }
  document.getElementById("allPosts").innerHTML = container;
};
const getAllPosts = () => {
  axios({
    method: "get",
    url: `${baseURL}post/allPosts`,
    headers: { "Content-Type": "application/json; charset=UTF-8" },
  })
    .then((response) => {
      //   console.log(response);
      const { message, post } = response.data;
      console.log(message);
      if (message == "Success") {
        console.log(post);
        setAllPosts(post);
      } else {
        console.log("Errrrr!");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
getAllPosts();
