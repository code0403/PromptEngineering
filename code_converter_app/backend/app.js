const express = require('express');
const axios = require('axios');
require('dotenv').config()

const app = express();
app.use(express.json());


// API endpoint for code conversion
app.post('/api/convert', async (req, res) => {
    try {
      const { code, sourceLanguage, targetLanguage } = req.body;
  
      // Make a request to the ChatGPT API for code conversion
      const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
        prompt: code,
        max_tokens: 1000,
        temperature: 0.7,
        n: 1,
        stop: '\n',
        temperature: 0.7,
        model: 'davinci-codex',
        documents: [`${sourceLanguage} to ${targetLanguage}`]
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      });
  
      const convertedCode = response.data.choices[0].text;
  
      // Return the converted code as a response
      res.json({ convertedCode });
    } catch (error) {
      console.error('Error converting code:', error);
      res.status(500).json({ error: 'An error occurred during code conversion' });
    }
  });
  
  // API endpoint for code suggestion
  app.post('/api/suggest', async (req, res) => {
    try {
      const { code, targetLanguage } = req.body;
  
      // Make a request to the ChatGPT API for code suggestion
      // ... Add your code to request code suggestion here ...
  
      const suggestedCode = ''; // Add the suggested code
  
      // Return the suggested code as a response
      res.json({ suggestedCode });
    } catch (error) {
      console.error('Error suggesting code:', error);
      res.status(500).json({ error: 'An error occurred during code suggestion' });
    }
  });
  
const port = 4500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
