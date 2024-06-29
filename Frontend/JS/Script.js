document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect form data
    const formData = {
        fullname: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        role: document.getElementById('role').value
    };

    // Send data to Node.js backend
    fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // assuming backend sends JSON response
    })
    .then(data => {
        console.log('Registration successful:', data);
        alert('Registration successful!');
        // Optionally redirect to a new page or reset form fields
        document.getElementById('registerForm').reset();
    })
    .catch(error => {
        console.error('Error registering user:', error);
        alert('Registration failed. Please try again.');
    });
});
// ============== get 

// Fetch user data from backend and display in table
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



