document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout');

    if (logoutButton) {
        logoutButton.addEventListener('click', async (event) => {
            event.preventDefault();

            const response = await fetch('/api/users/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                document.location.replace('/'); // Redirect to homepage after logout
            } else {
                alert('Failed to log out. Please try again.');
            }
        });
    }
});