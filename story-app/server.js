const express = require('express');
const { v1: openai } = require('openai');
require('dotenv').config()

const app = express();
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.use(express.json());

app.post('/generate-story', async (req, res) => {
  const { keyword } = req.body;

  try {
    const response = await openai.complete({
      engine: 'text-davinci-003', // Use the gpt-3.5-turbo model
      prompt: `Once upon a time, there was a ${keyword}.`,
      max_tokens: 200, // Adjust the number of tokens as per your desired story length
      temperature: 0.7, // Adjust the temperature for more or less randomness
      n: 1, // Generate a single response
      stop: '\n' // Stop generation at the end of the story
    });

    const story = response.data.choices[0].text.trim();

    res.json({ story });
  } catch (error) {
    console.error('Error generating story:', error);
    res.status(500).json({ error: 'Failed to generate story' });
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});


