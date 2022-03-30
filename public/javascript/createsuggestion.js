async function newFormHandler(event) {
    event.preventDefault();
  
    const suggestion_text = document.querySelector('input[name="suggest-text"]').value;
  
    const response = await fetch(`/api/suggestion`, {
      method: 'POST',
      body: JSON.stringify({
        suggestion_text,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/userpage');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);