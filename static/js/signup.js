
      let form = document.getElementById("form");
      let user = document.getElementById("username");
      let name = document.getElementById("name");
      let email = document.getElementById("email");
      let password = document.getElementById("password");
      let phone = document.getElementById("phone");
      let confirm_password = document.getElementById("confirm-password");
      let errorMessage = document.getElementById("errorMessage");
      let check = document.getElementById("check");

      let length = document.getElementById("lengthcheck");
      let letter = document.getElementById("lettercheck");
      let digit = document.getElementById("digitcheck");
      let special = document.getElementById("specialchar");

      password.addEventListener("input", function () {
        let value = password.value;
        if (value.length > 7) {
          length.style.color = "green";
        }
        if (/[a-zA-Z]/.test(value)) {
          letter.style.color = "green";
        }
        if (/[0-9]/.test(value)) {
          digit.style.color = "green";
        }
        if (/[^a-zA-Z,0-9]/.test(value)) {
          special.style.color = "green";
        }
      });

      form.addEventListener("submit", async function (event) {
        event.preventDefault();
        errorMessage.innerHTML = "";

        if (
          user.value == "" ||
          name.value == "" ||
          email.value == "" ||
          password.value == "" ||
          confirm_password.value == ""
        ) {
          errorMessage.innerHTML =
            "invalid Entities fill out all the required fields";
        }
        if (password.value < 7) {
          length.innerHTML = "password must be > 7 chracters";
        }
        if (password.value != confirm_password.value) {
          errorMessage.innerHTML = "passwords dont match";
        }

        if (check.checked == false) {
          errorMessage.innerHTML = "check the terms and conditions";
        }

        // authentication
        let signupData = {
          fullname: name.value,
          username: user.value,
          email: email.value,
          phone: phone.value,
          password: password.value,
        };

        // sends request to flask
        let response = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(signupData),
        });

        let data = await response.json();

        if (data.success) {
          errorMessage.style.color = "green";
          errorMessage.innerHTML = data.message;
          form.reset();

          setTimeout(function () {
            window.location.href = "/login";
          }, 1000);
        } else {
          errorMessage.style.color = "red";
          errorMessage.innerHTML = data.message;
        }
      });
