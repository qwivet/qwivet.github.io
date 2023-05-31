document.getElementById('login-button').addEventListener('click', function() {
    var nickname = document.getElementById('nickname').value;
    var password = document.getElementById('password').value;

    if (!nickname || !password) {
        alert("Nickname and password can't be empty!");
        return;
    }

    fetch('https://ttvapibothelper.azurewebsites.net/user?name=' + encodeURIComponent(nickname) + '&password=' + encodeURIComponent(password), {
        method: 'GET'
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'true') {
            localStorage.setItem('nickname', nickname);
            localStorage.setItem('password', password);
            window.location.href = '/user';
        } else {
            alert('Invalid nickname or password');
        }
    });
});

document.getElementById('return-button').addEventListener('click', function() {
    window.location.href = '/main.html'; 
});
