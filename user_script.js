var nickname = '';
var password = '';
window.onload = function() {
    nickname = localStorage.getItem('nickname');
    password = localStorage.getItem('password');
    
    if (!nickname || !password) {
        window.location.href = 'file:///D:/Prog/1/TTV/front/login.html'; // redirect to login if no nickname or password
        return;
    }
    
    document.getElementById('user-title').innerText = 'User Page: ' + nickname;
    
    fetch('https://ttvapibothelper.azurewebsites.net/samples/user?name=' + encodeURIComponent(nickname) + '&password=' + encodeURIComponent(password), {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        var sampleList = document.getElementById('sample-list');
        
        for (var chat in data) {
            var chatItem = document.createElement('p');
            chatItem.innerText = chat;
            sampleList.appendChild(chatItem);
            
            for (var i = 0; i < data[chat].length; i++) {
                var sample = data[chat][i];
                var sampleButton = document.createElement('button');
                sampleButton.innerText = sample;
                sampleButton.addEventListener('click', function() {
                    fetch('https://ttvapibothelper.azurewebsites.net/sample/user?name=' + encodeURIComponent(nickname) + '&password=' + encodeURIComponent(password) + '&chat=' + encodeURIComponent(chat) + '&sample=' + encodeURIComponent(sample), {
                        method: 'GET'
                    })
                    .then(response => response.blob())
                    .then(blob => {
                        var url = URL.createObjectURL(blob);
                        var audio = new Audio(url);
                        audio.play();
                    });
                });
                sampleList.appendChild(sampleButton);
            }
        }
    });
};

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