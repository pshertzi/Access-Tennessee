async function signupFormHandler(event) {
  event.preventDefault();

  const first_name = document.querySelector('#firstname-signup').value.trim();
  const last_name = document.querySelector('#lastname-signup').value.trim();
  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  const description = document.querySelector('#description-signup').value.trim();
  

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'post',
      body: JSON.stringify({
        first_name,
        last_name,
        username,
        email,
        password,
        description
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    // check the response status
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
}
async function b_signupFormHandler(event) {
  event.preventDefault();

  const b_name = document.querySelector('#b-name-signup').value.trim();
  const b_username = document.querySelector('#b-username-signup').value.trim();
  const b_email = document.querySelector('#b-email-signup').value.trim();
  const b_password = document.querySelector('#b-password-signup').value.trim();
  const b_description = document.querySelector('#b-description-signup').value.trim();
  const logo_url = document.querySelector('#logo_url').value
  

  if (b_username && b_email && b_password && b_description && b_username && logo_url) {
    const response = await fetch('/api/business', {
      method: 'post',
      body: JSON.stringify({
        b_name,
        b_username,
        b_email,
        b_password,
        b_description,
        logo_url
      }),
      headers: { 'Content-Type': 'application/json' }
    });
    // check the response status
    if (response.ok) {
      document.location.replace('/business');
    } else {
      alert(response.statusText);
    }
  }
}
console.log(b_signupFormHandler)
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.b-signup-form').addEventListener('submit', b_signupFormHandler);