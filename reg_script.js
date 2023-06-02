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
        window.location.href = '/main.html'; 
    } else {alert('User alrealy registered');}
});

});
document.getElementById('return-button').addEventListener('click', function() {
    window.location.href = '/main.html'; 
});
var deleteButton = document.getElementById('delete-button');
var deletePassword = document.getElementById('delete-password');

deleteButton.addEventListener('click', function() {
    if (deletePassword.value === password) {
        fetch('https://ttvapibothelper.azurewebsites.net/sample/user?name=' + encodeURIComponent(nickname) + '&password=' + encodeURIComponent(password), {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.removeItem('nickname');
                localStorage.removeItem('password');
                window.location.href = 'main'; // redirect to login page after account deletion
            } else {
                alert('Error deleting account');
            }
        });
    } else {
        alert('Invalid password. Please enter your correct password to delete account.');
    }
});
