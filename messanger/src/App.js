import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  Input,
  InputLabel,
  FormControl,
  IconButton,
} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import Message from "./Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("please enter your name"));
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="App">
      <img src="https://facebookbrand.com/wp-content/uploads/2018/09/header-e1538151782912.png?w=100&h=100" />

      <h1 className="hello">Messanger App</h1>
      <h4>welcome {username}</h4>

      <form className="app__form">
        <FormControl className="app__formcontrol">
          <InputLabel>Write a Message and press Enter...</InputLabel>
          <Input
            className="app__input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            className="app__iconbutton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default App;
