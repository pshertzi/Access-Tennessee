async function b_loginFormHandler(event) {
    event.preventDefault();

    const b_email = document.querySelector("#b-email-login").value.trim();
    const b_password = document.querySelector("#b-password-login").value.trim();

    if (b_email && b_password) {
        const response = await fetch("/api/business/b-login", {
        method: "post",
        body: JSON.stringify({
            b_email,
            b_password,
        }),
        headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
        document.location.replace("/business");
        } else {
        alert(response.statusText);
        }
    }
}

document.querySelector('.b-login-form').addEventListener('submit', b_loginFormHandler);