import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import messageService from '../services/messages';
import { socket } from '../socket';

const ChatView = ({ user }) => {
  const [messages, setMessages] = useState([]);
  const [ messageToSend, setMessageToSend ] = useState('')

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesFromDb = await messageService.getAll();
        setMessages(messagesFromDb);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages(data.messages)
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket]);

  const handleMessageSend = async () => {
    const mes = await messageService.create({ content: messageToSend })
    setMessages(messages.concat(mes))
    setMessageToSend('')
    socket.emit("send_message", { messages: messages.concat(mes) });
  }

  return (
    <Box>
      <Typography>ChatView</Typography>

      <Box sx={{ margin: '1rem' }}>
      {messages.length > 0 ? (
        messages.map(message => (
          <Box key={message.id} sx={{ marginTop: '1rem', 
            backgroundColor: user.username === message.user.username ? 'lightblue' : 'lightgreen',
            padding: '0.5rem',
            marginLeft: user.username === message.user.username ? '0.5rem' : '0rem',
            marginRight: user.username === message.user.username ? '0rem' : '0.5rem',
            borderRadius: user.username === message.user.username ? 
            '0.5rem 0.5rem 0.1rem 1rem' : '0.5rem 0.5rem 1rem 0.1rem'
            }}>
            <Typography>{message.content}</Typography>
            <Typography sx={{ fontSize: '0.8rem' }}>{message.user.username}</Typography>
          </Box>
        ))
      ): (
        <Typography>No messages yet</Typography>
      )}
      </Box>

        <TextField 
          type='text'
          placeholder='Write a message...'
          sx={{ width: '23rem' }}
          value={messageToSend}
          onChange={({target}) => setMessageToSend(target.value)}
        />
        <Button
        variant='contained'
        onClick={handleMessageSend}
        >
          Send
        </Button>

    </Box>
  );
};

export default ChatView;
