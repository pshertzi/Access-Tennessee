async function suggestionFormHandler(event) {
  event.preventDefault();

  const suggestion_text = document.querySelector('textarea[name="suggestion-body"]').value.trim();


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
    document.location.replace('/suggestion');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.suggestion-form').addEventListener('submit', suggestionFormHandler);