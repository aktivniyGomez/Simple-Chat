import axios from 'axios'
import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([])
  const [value, setValue] = useState('')


  useEffect(() => {
    getMessages()
  }, [])


  const sendMessage = async () => {
    await axios.post('http://localhost:5000/post-message', {
      message: value,
      id: Date.now()
    })
  }



  const getMessages = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/new-message')
      setMessages(prev => [data, ...prev])
      await getMessages()
    } catch (error) {
      setTimeout(() => {
        getMessages()
      }, 500)
    }
  }


  return (
    <div className="App">
      <div className="form">
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        <button onClick={sendMessage}></button>
      </div>
      <div className="main">
        {messages.map((mess) =>
          <div className="message" key={mess.id}>
            {mess.message}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
