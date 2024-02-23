(function() {
    // Create a unique root element for the chat app
    var appRoot = document.createElement('div');
    appRoot.id = 'chat-app-root';
    document.body.appendChild(appRoot);

    // Assuming your CSS is accessible directly via the React dev server
    var cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'http://localhost:3000/chat-popup.css'; // Adjust if your CSS path differs
    document.head.appendChild(cssLink);

    // Load React and ReactDOM from CDN for simplicity
    var reactScript = document.createElement('script');
    reactScript.src = 'https://unpkg.com/react/umd/react.production.min.js';
    document.body.appendChild(reactScript);

    var reactDOMScript = document.createElement('script');
    reactDOMScript.src = 'https://unpkg.com/react-dom/umd/react-dom.production.min.js';
    document.body.appendChild(reactDOMScript);

    // Ensure React and ReactDOM are loaded before your app's script
    reactDOMScript.onload = function() {
        var chatScript = document.createElement('script');
        // Directly use the React development server's bundle.js
        chatScript.src = 'http://localhost:3000/static/js/bundle.js';
        document.body.appendChild(chatScript);
    };
})();