// Hide And Show
function password_show_hide() {
  var x = document.getElementById("userPassword");
  var show_eye = document.getElementById("show_eye");
  var hide_eye = document.getElementById("hide_eye");
  hide_eye.classList.remove("d-none");
  if (x.type === "password") {
    x.type = "text";
    show_eye.style.display = "none";
    hide_eye.style.display = "block";
  } else {
    x.type = "password";
    show_eye.style.display = "block";
    hide_eye.style.display = "none";
  }
}
const baseURL = "https://snapify.onrender.com/";
// const baseURL = "http://localhost:5000/";

// Sign Up Method
const signUp = () => {
  const userName = document.getElementById("userName").value;
  const userEmail = document.getElementById("userEmail").value;
  const userPassword = document.getElementById("userPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  if (
    userName == "" ||
    userEmail == "" ||
    userPassword == "" ||
    confirmPassword == ""
  ) {
    toastr.error("In-Valid Input");
  } else {
    let bodyOBJ = {
      userName: userName,
      email: userEmail,
      password: userPassword,
      cPassword: confirmPassword,
    };
    console.log(bodyOBJ);
    axios({
      method: "post",
      url: `${baseURL}auth/sign-up`,
      data: bodyOBJ,
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => {
        console.log(response);
        const { message } = response.data;
        console.log(message);
        if (message == "Success") {
          toastr.success("Success");
          window.location.href = "login.html";
          console.log(message);
        } else if (message == "Email Allready Exist !") {
          toastr.warning("Email Allready Exist !");
        } else if (message == "Password MisMatch Confirmation Password") {
          toastr.error("Password Mis Match");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
// Toaster
// Set the options that I want
// Default Configuration
// $(document).ready(function () {
//   toastr.options = {
//     closeButton: true,
//     debug: false,
//     newestOnTop: false,
//     progressBar: false,
//     positionClass: "toast-top-right",
//     preventDuplicates: false,
//     showDuration: "1000",
//     hideDuration: "1000",
//     timeOut: "5000",
//     extendedTimeOut: "1000",
//     showEasing: "swing",
//     hideEasing: "linear",
//     showMethod: "fadeIn",
//     hideMethod: "fadeOut",
//   };
// });

// Toast Type
// $("#success").click(function (event) {
//   toastr.success("You clicked Success toast");
// });
// $("#info").click(function (event) {
//   toastr.info("You clicked Info toast");
// });
// $("#error").click(function (event) {
//   toastr.error("You clicked Error Toast");
// });
// $("#warning").click(function (event) {
//   toastr.warning("You clicked Warning Toast");
// });
