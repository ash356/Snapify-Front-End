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

// Log In Method
const logIn = () => {
  const userEmail = document.getElementById("userEmail").value;
  const userPassword = document.getElementById("userPassword").value;
  if (userEmail == "" || userPassword == "") {
    toastr.error("In-Valid Input");
  } else {
    let bodyOBJ = {
      email: userEmail,
      password: userPassword,
    };
    console.log(bodyOBJ);

    axios({
      method: "post",
      url: `${baseURL}auth/sign-in`,
      data: bodyOBJ,
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => {
        console.log(response);
        const { message, token } = response.data;
        console.log(message);
        if (message == "Success") {
          toastr.success("Success");

          console.log(token);
          localStorage.setItem("token", token);
          window.location.href = "home.html";
        } else if (message == "In-Valid Email!") {
          toastr.warning("In-Valid Email!");
        } else if (message == "In-Valid Password!") {
          toastr.error("In-Valid Password!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
