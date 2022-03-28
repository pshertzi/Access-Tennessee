//Sign Up function
function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const bio = document.querySelector('#bio-signup').value.trim();
  
    if (username && email && password && bio && picture_url) {
      const response = await fetch('/api/users', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password,
          bio,
          picture_url
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      if( response.ok) {
        document.location.replace('/individual')
      } else {
        alert(response.statusText);
      }
    }
  }





document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);