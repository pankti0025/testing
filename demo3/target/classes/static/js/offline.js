if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/js/sw.js')
        .then(() => console.log('Service Worker Registered'));
}

// Offline form data
const form = document.getElementById('registerForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    if (navigator.onLine) {
        await sendData(userData);
        alert('Data submitted successfully!');
        form.reset();
    } else {
        localStorage.setItem('offlineUser', JSON.stringify(userData));
        alert('You are offline. Data saved locally. It will submit when you are back online.');
    }
});

// Listen for online
window.addEventListener('online', async () => {
    const offlineData = localStorage.getItem('offlineUser');
    if (offlineData) {
        await sendData(JSON.parse(offlineData));
        localStorage.removeItem('offlineUser');
        alert('You are back online. Offline data submitted!');
        form.reset();
    }
});

async function sendData(data) {
    await fetch('/register', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });
}
