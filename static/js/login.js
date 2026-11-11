
        let form = document.getElementById("form");
        let eye = document.getElementById("eye");
        let password = document.getElementById("password");
        let user = document.getElementById("user");
        let errorMessage = document.getElementById("errorMessage");

        eye.addEventListener("click", () => {
            if (password.type === "password") {
                password.type = "text";
                eye.classList.remove("fa-eye");
                eye.classList.add("fa-eye-slash");
            } else {
                password.type = "password";
                eye.classList.remove("fa-eye-slash");
                eye.classList.add("fa-eye");
            }
        });

        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            if (user.value.trim() === "" || password.value.trim() === "") {
                errorMessage.innerHTML = "Invalid username/password";
                return;
            }

            if (user.value.includes("@") && !user.value.includes(".")) {
                errorMessage.innerHTML = "invalid email";
                return;
            }

            // authentication
            let loginData = {
                username: user.value,
                password: password.value,
            };

            // sends request to flask
            let response = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            let data = await response.json();

            if (data.success) {
                errorMessage.style.color = "green";
                errorMessage.innerHTML = data.message;
                form.reset();

                window.location.href = "/dashboard";
            } else {
                errorMessage.style.color = "red";
                errorMessage.innerHTML = data.message;
            }
        });
