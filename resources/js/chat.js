import './echo';

document.addEventListener('DOMContentLoaded', () => {
    const userButtons = document.querySelectorAll('[data-user-id]');
    const chatWith = document.getElementById('chat-with');
    const messageInput = document.getElementById('message');
    const sendButton = document.querySelector('#chat-form button');
    const form = document.getElementById('chat-form');
    const messagesContainer = document.getElementById('messages');

    let selectedUser = null;
    let selectedUserName = '';

    if (typeof CURRENT_USER_ID !== 'undefined') {
        window.Echo.private(`chat.${CURRENT_USER_ID}`)
            .listen('MessageSent', (e) => {
                // Only show if current chat is with the sender
                if (parseInt(selectedUser) === e.sender_id) {
                    appendMessage(e.message, 'them', e.created_at);
                } else {
                    // Optionally: show badge/notification
                    console.log('New message from:', e.sender_name);
                }
            });
    }
    

    userButtons.forEach(button => {
        button.addEventListener('click', () => {
            selectedUser = button.dataset.userId;
            selectedUserName = button.textContent.trim();
            chatWith.textContent = `Chat with ${selectedUserName}`;
            messageInput.disabled = false;
            sendButton.disabled = false;
            messagesContainer.innerHTML = '';

            // Fetch past messages
            fetch(`/messages/${selectedUser}`)
            .then(res => res.json())
            .then(data => {
                messagesContainer.innerHTML = '';
                data.forEach(msg => {
                    appendMessage(msg.message, msg.sender_id == CURRENT_USER_ID ? 'you' : 'them', msg.created_at);
                });
            });

            // fetch(`/api/messages/${selectedUser}`)
                // .then(res => res.json())
                // .then(res => res.text())
                // .then(console.log);
                // .then(data => {
                //     data.forEach(msg => {
                //         const sender = msg.sender_id === window.Laravel.userId ? 'you' : 'them';
                //         appendMessage(msg.message, sender, msg.created_at);
                //     });
                // });
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = messageInput.value.trim();
        if (msg === '' || !selectedUser) return;

        appendMessage(msg, 'you');
        messageInput.value = '';

        // await fetch('/api/messages', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
        //     },
        //     body: JSON.stringify({
        //         receiver_id: selectedUser,
        //         message: msg
        //     })
        // });

        await fetch('/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify({
                receiver_id: selectedUser,
                message: msg
            })
        })
        
    });

    function appendMessage(content, sender = 'you', timeString = null) {
        const messageBox = document.createElement('div');
        const messageWrapper = document.createElement('div');
        messageWrapper.className = `flex ${sender === 'you' ? 'justify-end' : 'justify-start'}`;

        const messageBubble = document.createElement('div');
        messageBubble.className = `max-w-[70%] px-4 py-2 rounded-lg text-sm shadow ${
            sender === 'you' 
                ? 'bg-blue-500 text-white rounded-br-none' 
                : 'bg-gray-200 text-gray-800 rounded-bl-none'
        }`;

        messageBubble.textContent = content;

        const time = timeString ? new Date(timeString) : new Date();
        const timestamp = document.createElement('div');
        timestamp.className = 'text-xs text-gray-400 mt-1 text-right';
        timestamp.textContent = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        messageBox.appendChild(messageBubble);
        messageBox.appendChild(timestamp);
        messageWrapper.appendChild(messageBox);
        messagesContainer.appendChild(messageWrapper);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    if (window.Laravel?.userId) {
        window.Echo.private(`chat.${window.Laravel.userId}`)
            .listen('MessageSent', (e) => {
                const message = e.message;

                if (selectedUser == message.sender_id) {
                    appendMessage(message.message, 'them', message.created_at);
                }
            });
    }
});
