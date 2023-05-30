document.getElementById('login-button').addEventListener('click', function() {
    var nickname = document.getElementById('nickname').value;
    var password = document.getElementById('password').value;

    if (!nickname || !password) {
        alert("Nickname and password can't be empty!");
        return;
    }

    fetch('http://localhost:5224/user?name=' + encodeURIComponent(nickname) + '&password=' + encodeURIComponent(password), {
        method: 'GET'
    })
    .then(response => response.text())
    .then(data => {
        if (data === 'true') {
            localStorage.setItem('nickname', nickname);
            localStorage.setItem('password', password);
            window.location.href = '/user/' + encodeURIComponent(nickname);
        } else {
            alert('Invalid nickname or password');
        }
    });
});

document.getElementById('return-button').addEventListener('click', function() {
    window.location.href = 'file:///D:/Prog/1/TTV/front/main.html'; 
});
