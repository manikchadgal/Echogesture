document.addEventListener('DOMContentLoaded', function() {
    // Function to get URL parameters
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    // Get username from URL parameter (you'll need to pass this when redirecting to the profile page)
    const username = getUrlParameter('username');

    if (username) {
        fetch(`/profile/${username}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('username').textContent = data.userName;
                document.getElementById('email').textContent = data.email;
                // Add more fields as needed
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
                alert('Error loading user profile. Please try again later.');
            });
    } else {
        alert('No user specified. Please log in first.');
        // Redirect to login page or handle as appropriate
    }
});