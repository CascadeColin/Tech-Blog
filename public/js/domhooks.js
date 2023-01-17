// import npm module for time (forget name lol) needed for timestamp management for blog posts

// displaying timestamp on blog posts
const timestamp = 0;

// button hooks for nav bar
const dashboardBtn = document.querySelector('#dashboard');
const homepageBtn = document.querySelector('#homepage');
const loginBtn = document.querySelector('#login');
const logoutBtn = document.querySelector('#logout');


const saveBlog = () => {}

const updateBlog = () => {}

const deleteBlog = () => {}

const login = async (e) => {
    //fn for login btn event handler
    e.preventDefault();
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        // FIXME: write api route to validate user login
        const res = await fetch(/* api route */ {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // if check passes replace template with homepage, else send alert
        if (res.ok) document.location.replace('/homepage');
        alert('Failed to login!');
    }
}

const logout = () => {
    //fn for logout btn event handler
}