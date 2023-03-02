const baseURL = "https://snapify.onrender.com/";
// const baseURL = "http://localhost:5000/";

const headers = {
  "Content-Type": "application/json; charset=UTF-8",
  authorization: `Bearer ${localStorage.getItem("token")}`,
};
var profileName = document.getElementById("profileName");
var profileEmail = document.getElementById("profileEmail");
//  Inputs
var fullName = document.getElementById("userName");
var userEmail = document.getElementById("userEmail");
var userAge = document.getElementById("userAge");
var userPhone = document.getElementById("userPhone");
//  Get All Pfrofile Data
const getProfileData = () => {
  axios({
    method: "get",
    url: `${baseURL}user/profile`,
    headers,
  })
    .then((response) => {
      //   console.log(response);
      const { message, user } = response.data;
      //   console.log(message);
      if (message == "Success") {
        console.log(user);
        const { userName, email, age, gender, phone } = user;
        // console.log({ userName, email, age, gender });
        fullName.value = userName;
        userEmail.value = email;
        userAge.value = age;
        userPhone.value = phone;
        document.getElementById(`${gender}`).checked = true;
        profileName.innerText = `${userName}`;
        profileEmail.innerText = `${email}`;
      } else {
        console.log("Errrrr!");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
getProfileData();
// Update Profile
const updateProfile = () => {
  var checkedValue = document.querySelector(".form-check-input:checked").value;
  console.log(checkedValue);
  let bodyOBJ = {
    userName: fullName.value,
    email: userEmail.value,
    age: userAge.value,
    gender: checkedValue,
    phone: userPhone.value,
  };
  console.log(bodyOBJ);
  axios({
    method: "patch",
    url: `${baseURL}user/update`,
    data: bodyOBJ,
    headers,
  })
    .then((response) => {
      console.log(response);
      const { message } = response.data;
      console.log(message);
      if (message == "Success") {
        toastr.success("Success");
        getProfileData();
      } else {
        toastr.error("Update Error!");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
//  Cancel Update
const cancelUpdate = () => {
  window.location.href = "home.html";
};
// Delete Account
const deleteAccount = () => {
  axios({
    method: "delete",
    url: `${baseURL}user/delete`,
    headers,
  })
    .then((response) => {
      console.log(response);
      const { message } = response.data;
      console.log(message);
      if (message == "Success") {
        toastr.success("Success");
        window.location.href = "signup.html";
      } else {
        toastr.error("Update Error!");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
// Update Password
const updatePassword = () => {
  const pass = document.getElementById("pass").value;
  const confirmpass = document.getElementById("confirmPass").value;
  if (pass != confirmpass) {
    toastr.error("Password Don't Match");
  } else {
    let bodyOBJ = {
      password: pass,
    };
    console.log(bodyOBJ);
    axios({
      method: "put",
      url: `${baseURL}user/password`,
      data: bodyOBJ,
      headers,
    })
      .then((response) => {
        console.log(response);
        const { message } = response.data;
        console.log(message);
        if (message == "Success") {
          toastr.success("Success");
          window.location.href = "login.html";
        } else {
          toastr.error("Update Error!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
