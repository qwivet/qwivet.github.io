document.getElementById('register-button').addEventListener('click', function() {
    var nickname = document.getElementById('nickname').value;
    var password = document.getElementById('password').value;
    
    if (!nickname || !password) {
        alert("Nickname and password can't be empty!");
        return;
    }
    fetch('https://ttvapibothelper.azurewebsites.net/user/' + nickname, {
    method: 'GET'
}).then(response => response.json())
.then(data => {
    if (data === false) {
        fetch('https://ttvapibothelper.azurewebsites.net/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nickname,
                password: password
            })
        });
    }
});

});
document.getElementById('return-button').addEventListener('click', function() {
    window.location.href = '/main.html'; 
});