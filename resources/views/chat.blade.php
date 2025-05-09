<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Chatverse</title>
    <script>
        window.Laravel = {
            userId: {{ auth()->id() }}
        };
        const CURRENT_USER_ID = {{ auth()->id() }};
    </script>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @vite(['resources/css/app.css', 'resources/js/echo.js', 'resources/js/chat.js'])
</head>
<body class="bg-gray-100 h-screen">
    

    <div class="h-full flex">
        <!-- Sidebar: User List -->
        <div class="w-1/4 bg-white border-r p-4 overflow-y-auto">
            <h2 class="text-lg font-semibold mb-4">Users</h2>
            <ul class="space-y-2">
                @foreach ($users as $user)
                    @if ($user->id !== auth()->id())
                        <li>
                            <button class="w-full text-left p-2 bg-gray-100 rounded hover:bg-blue-100 transition" data-user-id="{{ $user->id }}">
                                {{ $user->name }}
                            </button>
                        </li>
                    @endif
                @endforeach
            </ul>
        </div>

        <!-- Chat Panel -->
        <div class="w-3/4 flex flex-col h-full">
            <!-- Header -->
            <div class="bg-white border-b p-4 text-lg font-semibold">
                <span id="chat-with">Select a user</span>
            </div>

            <!-- Messages -->
            <div id="messages" class="flex-1 p-4 overflow-y-auto space-y-2 bg-gray-50">
                <!-- Messages will be dynamically appended -->
            </div>

            <!-- Input -->
            <div class="p-4 bg-white border-t">
                <form id="chat-form" class="flex gap-2">
                    <input type="text" id="message" placeholder="Type a message..."
                        class="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300" disabled>
                    <button type="submit"
                        class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" disabled>
                        Send
                    </button>
                </form>
            </div>
        </div>
    </div>
</body>
</html>
