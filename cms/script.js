console.log('Script loaded');
document.getElementById('post-form').addEventListener('submit', function(event) {
    console.log('Form submitted'); // Add this line to check if the form is being submitted

    // Prevent the form from being submitted normally
    event.preventDefault();

    // Get the form data
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var date = document.getElementById('date').value;
    var content = document.getElementById('content').value;

    // Log the form data
    console.log('Form data:', { title, description, date, content });

    // Send the form data to the server
    fetch('/create-post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            description: description,
            date: date,
            content: content,
        }),
    })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
});
