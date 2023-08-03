const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = 3000; // You can use any available port you prefer

app.use(express.json());

// API endpoint to handle user requests and interact with ChatGPT API
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message; 
  // Make a call to the ChatGPT API using 'node-fetch' 
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      prompt: userMessage,
      max_tokens: 100
    })
  });

  const data = await response.json();
  const botReply = data.choices[0].text.trim();

  res.json({ reply: botReply });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
