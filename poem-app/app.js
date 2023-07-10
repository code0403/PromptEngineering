const express = require('express');
const axios = require('axios');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const port = 2700; // Change this to the desired port number

app.use(express.json());

app.post('/poem', async (req, res) => {
  const { keyword } = req.query;

  try {
    // Make a request to the ChatGPT API
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
   
    // Make a request to the OpenAI API
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Given this keyword ${keyword} generate a poem about this keyword in hindi`,
      max_tokens: 700,
      n: 1,
    });

    const { choices } = response.data;
    const story = choices[0].text.trim();

    res.json({ story });
  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).json({ error: 'Failed to generate story.' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});
