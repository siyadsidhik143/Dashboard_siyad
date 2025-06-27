"use client";
import React, { useEffect, useRef, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAppDispatch, useAppSelector } from "@/app/library/hooks";
import { fetchChatbotResponse } from "@/app/library/reduxSlices/chatbotSlice";
import WhatsappBGImg from "@assets/Images/whatsppMsgImage.jpg";

interface Message {
  text: string;
  sender: string;
  timestamp: Date;
}

const ChatBox = () => {
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const {
    fetchchatbotApiMeta,
    fetchchatbotApiBegin,
    fetchchatbotApiData,
    fetchchatbotApiFailure,
    fetchchatbotApiFailureMessage,
  }: any = useAppSelector((state) => state.reduxChatbotStates);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (input.trim() === "") return;
    const newMessage = {
      text: input,
      sender: "You",
      timestamp: new Date(),
    };
    setMessages([...messages, newMessage]);
    setInput("");
  };

  useEffect(() => {
    if (messages?.length > 0) {
      let lastMessage = messages[messages.length - 1];
      if (lastMessage?.sender === "You") {
        let inputMessage = {
          inputs: lastMessage?.text,
        };
        dispatch(fetchChatbotResponse(inputMessage));
      }
    }
  }, [messages]);

  useEffect(() => {
    if (fetchchatbotApiData?.length > 0) {
      const combinedText = fetchchatbotApiData
        .map((data: any) => data?.summary_text)
        .filter(Boolean)
        .join(" ");

      const newMessage = {
        text: combinedText,
        sender: "Bot",
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
    }
  }, [fetchchatbotApiData]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Paper
      elevation={4}
      sx={{
        width: 320,
        height: 390,
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        overflow: "hidden",
      }}
    >
      {/* Chat Header */}
      <Box
        sx={{
          bgcolor: "primary.main",
          p: 2,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Avatar
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI4df2Lt70XKJfN1IvdK-_Vv7HPzimt3fXtA&s"
          alt="Chat Avatar"
          sx={{ width: 48, height: 48 }}
        />
        <Box>
          <Typography
            variant="h6"
            color="white"
            sx={{ fontFamily: "Poppins, sans-serif", fontSize: 15 }}
          >
            Siyad's AI Chat Box
          </Typography>
          <Typography
            variant="body2"
            color="white"
            sx={{ fontFamily: "Poppins, sans-serif", opacity: 0.85 }}
          >
            Ask anything, anytime!
          </Typography>
        </Box>
      </Box>

      {/* Chat Window */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 2,
          bgcolor: "#fafafa",
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Stack spacing={1}>
          {messages.map((msg, idx) => (
            <Box
              key={idx}
              sx={{
                display: "flex",
                justifyContent:
                  msg.sender === "You" ? "flex-end" : "flex-start",
                mb: 1,
              }}
            >
              <Box
                sx={{
                  bgcolor: msg.sender === "You" ? "#d1e7dd" : "#e0e0e0",
                  borderRadius: 2,
                  px: 2,
                  py: 1.5,
                  maxWidth: "80%",
                  wordBreak: "break-word",
                }}
              >
                <Typography variant="subtitle2" fontWeight="bold">
                  {msg.sender}
                </Typography>
                <Typography variant="body2">{msg.text}</Typography>
                <Typography
                  variant="caption"
                  sx={{ mt: 0.5, color: "gray", display: "block" }}
                >
                  {msg.timestamp.toLocaleTimeString()}
                </Typography>
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />

          {/* Optional loading dots */}
          {fetchchatbotApiBegin && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 0.5,
                my: 1,
              }}
            >
              {[...Array(3)].map((_, i) => (
                <Box
                  key={i}
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: "GrayText",
                    borderRadius: "50%",
                    animation: "pulse 1.4s infinite ease-in-out",
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </Box>
          )}
        </Stack>
      </Box>

      {/* Input Box */}
      <Box
        sx={{
          borderTop: "1px solid #ddd",
          p: 2,
          display: "flex",
          gap: 1,
          alignItems: "center",
        }}
      >
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={!input.trim()}
        >
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatBox;
