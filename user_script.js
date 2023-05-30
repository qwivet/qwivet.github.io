window.onload = function() {
    var nickname = localStorage.getItem('nickname');
    var password = localStorage.getItem('password');
    
    if (!nickname || !password) {
        window.location.href = 'file:///D:/Prog/1/TTV/front/login.html'; // redirect to login if no nickname or password
        return;
    }
    
    document.getElementById('user-title').innerText = 'User Page: ' + nickname;
    
    fetch('http://localhost:5224/samples/user?name=' + encodeURIComponent(nickname) + '&password=' + encodeURIComponent(password), {
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
                    fetch('http://localhost:5224/sample/user?name=' + encodeURIComponent(nickname) + '&password=' + encodeURIComponent(password) + '&chat=' + encodeURIComponent(chat) + '&sample=' + encodeURIComponent(sample), {
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
