import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:3003");

function App() {
  const [message, setMessage] = useState("");
  const [msgrec, setMsgrec] = useState("");
  const sendMessage = () => {
    socket.emit("send_message", {
      message
    });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMsgrec(data.message);
      alert(data.message);
    });
  }, []);
  return (
    <>
      <input
        placeholder="enter something"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <button onClick={sendMessage}> My button 
      </button>
      <h1> Write Something : </h1>
      <h3>{msgrec}</h3>
    </>
  );
}

export default App;
