// Define the accounts with their roles and ratings
const accounts = [
    { id: 1, username: 'Гаплан', password: 'pass1', role: 'student', ratings: [] },
    { id: 2, username: 'Мирас', password: 'pass2', role: 'teacher', ratings: [] },
    { id: 3, username: 'Мейрам', password: 'pass3', role: 'admin', ratings: [] },
    { id: 4, username: 'teacher2', password: 'pass4', role: 'teacher', ratings: [] },
    { id: 5, username: 'student2', password: 'pass5', role: 'student', ratings: [] }
];

// Function to handle the login process
function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Find the account that matches the username and password
    const account = accounts.find(acc => acc.username === username && acc.password === password);

    if (account) {
        // Display the user's role and ratings
        const loginStatus = document.getElementById('login-status');
        loginStatus.innerHTML = `Role: ${account.role}<br>Ratings: ${account.ratings.join(', ')}`;

        // Add functionality based on the user's role
        if (account.role === 'teacher') {
            // Allow teachers to rate students
            const rateStudentForm = `
                <form id="rate-student-form">
                    <label for="student-id">Выберите ученика:</label>
                    <select id="student-id">
                        ${accounts.filter(acc => acc.role === 'student').map(acc => `<option value="${acc.id}">${acc.username}</option>`).join('')}
                    </select>
                    <label for="rating">Оценка:</label>
                    <input type="number" id="rating" min="0" max="10">
                    <button type="submit">Rate Student</button>
                </form>
            `;
            loginStatus.innerHTML += rateStudentForm;

            // Add an event listener to the rate student form
            document.getElementById('rate-student-form').addEventListener('submit', e => {
                e.preventDefault();
                const studentId = document.getElementById('student-id').value;
                const rating =document.getElementById('rating').value;

                // Find the student and add the rating
                const student = accounts.find(acc => acc.id === parseInt(studentId));
                student.ratings.push(parseInt(rating));

                // Display the updated ratings
                loginStatus.innerHTML = `Role: ${account.role}<br>Ratings: ${student.ratings.join(', ')}`;
            });
        } else if (account.role === 'admin') {
            // Allow administrators to rate both teachers and students
            const rateUserForm = `
                <form id="rate-user-form">
                    <label for="user-id">Select a user:</label>
                    <select id="user-id">
                        ${accounts.map(acc => `<option value="${acc.id}">${acc.username}</option>`).join('')}
                    </select>
                    <label for="rating">Rating:</label>
                    <input type="number" id="rating" min="0" max="10">
                    <button type="submit">Rate User</button>
                </form>
            `;
            loginStatus.innerHTML += rateUserForm;

            // Add an event listener to the rate user form
            document.getElementById('rate-user-form').addEventListener('submit', e => {
                e.preventDefault();
                const userId = document.getElementById('user-id').value;
                const rating = document.getElementById('rating').value;

                // Find the user and add the rating
                const user = accounts.find(acc => acc.id === parseInt(userId));
                user.ratings.push(parseInt(rating));

                // Display the updated ratings
                loginStatus.innerHTML = `Role: ${account.role}<br>Ratings: ${user.ratings.join(', ')}`;
            });
        }
    } else {
        alert('Incorrect username or password. Please try again.');
    }
}

// Add an event listener to the login form
document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    handleLogin();
});