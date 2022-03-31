async function blogout() {
    const response = await fetch('/api/business/blogout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

// document.querySelector('#blogout').addEventListener('click', blogout);