let allposts = [];
const baseURL = "https://snapify.onrender.com/";
const headers = {
  "Content-Type": "application/json; charset=UTF-8",
  authorization: `Bearer ${localStorage.getItem("token")}`,
};
//  Get All Posts
const getAllPosts = async () => {
  await axios({
    method: "get",
    url: `${baseURL}post/posts`,
    headers,
  })
    .then((response) => {
      console.log(response);
      const { message, posts } = response.data;
      console.log(message);
      if (message == "Success") {
        // console.log(posts);
        allposts = posts;
        // console.log(allposts);
        setAllPosts(posts);
      } else {
        console.log("Errrrr!");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
getAllPosts();
// Set All Posts
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
                  <div class="aspect-square overflow-hidden w-[50px] rounded-full border border-gray-300">
                      <img alt="avatar" srcset="" src="./assets/images/avatar.svg" width="50" height="50"
                          decoding="async" data-nimg="1" class="object-cover w-full h-full" loading="lazy"
                          style="color: transparent;">
                  </div>
                  <div><a class="font-bold text-white" href="">ِ${list[i].userId.userName}</a>
                      <p class="text-sm text-gray-400">${list[i].createdAt}</p>
                  </div>
              </div>
              <div class="mx-4 d-flex">
                  <a href="#editSnapModal" class="btn btn-warning me-2 px-3" data-toggle="modal" onclick="update(${i})"><i
                          class="fas fa-edit"></i>
                      <span class="d-none" >Edit</span></a>
                  <a href="#deleteSnapModal" class="btn btn-danger px-3" data-toggle="modal" onclick="update(${i})"><i
                          class="fas fa-trash"></i>
                      <span class="d-none">Delete</span></a>
              </div>
          </div>
          <p class="mb-2 text-[15px]" style="color: #b9b9b9;">${list[i].caption}</p>
          <div class="flex gap-2 mb-2"><a class="text-blue-600 text-[15px] hover:underline"
                  href="">#${list[i].topics}</a>
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
// Edit Modal Content
var caption = document.getElementById("caption");
var topics = document.getElementById("topics");
var postId;
const clearForm = (flag) => {
  postId = flag ? flag._id : "";
  caption.value = flag ? flag.caption : "";
  topics.value = flag ? flag.topics : "";
  //   console.log(postId);
};
// update Modal Content
const update = (index) => {
  clearForm(allposts[index]);
};
// Update Snap
updateSnap = () => {
  if (caption.value == "" || topics.value === "") {
    toastr.error("In-Valid Inputs");
  } else {
    let bodyOBJ = {
      caption: caption.value,
      topics: topics.value,
      id: postId,
    };
    console.log(bodyOBJ);
    axios({
      method: "patch",
      url: `${baseURL}post/update`,
      data: bodyOBJ,
      headers,
    })
      .then((response) => {
        console.log(response);
        const { message } = response.data;
        console.log(message);
        if (message == "Success") {
          toastr.success("Success");
          getAllPosts();
        } else {
          toastr.error("Update Error!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
// Delete Snap
deleteSnap = () => {
  let bodyOBJ = {
    id: postId,
  };
  console.log(bodyOBJ);
  axios({
    method: "delete",
    url: `${baseURL}post/delete`,
    data: bodyOBJ,
    headers,
  })
    .then((response) => {
      console.log(response);
      const { message } = response.data;
      console.log(message);
      if (message == "Success") {
        toastr.success("Success");
        getAllPosts();
      } else {
        toastr.error("Delete Error!");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
// Add Snap
addSnap = () => {
  var captionContent = document.getElementById("captionContent");
  var topicsContent = document.getElementById("topicsContent");
  let bodyOBJ = {
    caption: captionContent.value,
    topics: topicsContent.value,
  };
  console.log(bodyOBJ);
  axios({
    method: "post",
    url: `${baseURL}post/add`,
    data: bodyOBJ,
    headers,
  })
    .then((response) => {
      console.log(response);
      const { message } = response.data;
      console.log(message);
      if (message == "Success") {
        toastr.success("Success");
        getAllPosts();
      } else {
        toastr.error("Adding Error!");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
