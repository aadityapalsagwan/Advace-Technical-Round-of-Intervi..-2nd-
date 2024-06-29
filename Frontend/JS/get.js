document.addEventListener('DOMContentLoaded', () => {
    // Fetch user data from backend and display in table
    fetch('http://localhost:3000/api/users/') // Adjust URL if needed
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(users => {
            const userTableBody = document.getElementById('userTableBody');

            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.fullname}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                `;
                userTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            alert('Failed to fetch user data. Please check console for details.');
        });
});