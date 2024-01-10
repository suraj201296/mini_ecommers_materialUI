import React, { useEffect, useState } from 'react';

const WebsocketEvent: React.FC = () => {
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000'); // Replace 'backend' with your backend server address

    ws.onopen = () => {
      console.log('################ WebSocket connected ################');
    };

    ws.onmessage = (event) => {
      const receivedMessage = event.data;
      console.log('Received message:', receivedMessage);
      setMessage(receivedMessage);
      // Handle the message received from the backend (Bulk insertion completed)
      // You can update the UI or perform any necessary actions here
    };

    ws.onclose = () => {
      console.log('WebSocket closed');
    };

    return () => {
      ws.close(); // Close WebSocket connection on unmounting the component
    };
  }, []);

  return (
    <div>
      <h2>WebSocket Component</h2>
      {message && <p>Received message: {message}</p>}
    </div>
  );
};

export default WebsocketEvent;
