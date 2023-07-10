const express = require('express');
const axios = require('axios');
require('dotenv').config()
var cors = require('cors')
const { Configuration, OpenAIApi } = require("openai");


const app = express();
app.use(express.json());

app.use(cors())

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// API endpoint for code conversion
app.post('/api/convert', async (req, res) => {
    try {
     

      const { code,  targetLanguage } = req.body;

      //console.log(code, targetLanguage)
  
      // Make a request to the ChatGPT API for code conversion
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `given this code ${code} convert this into the target language ${targetLanguage}`,
        max_tokens: 700,
        n: 1,
      });

      const convertedCode = response.data.choices[0].text;

  
      // Return the converted code as a response
      res.json({ convertedCode });
    } catch (error) {
      console.error('Error converting code:', error);
      res.status(500).json({ error: 'An error occurred during code conversion' });
    }
  });


  // API endpoint for code debug
app.post('/api/debug', async (req, res) => {
  try {
  
    const { code } = req.body;
    // Make a request to the ChatGPT API for code debug
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `given this code ${code} debug the code and give suggest neccessary changes to it`,
      max_tokens: 700,
      n: 1,
    });

    const convertedCode = response.data.choices[0].text;
    // Return the converted code as a response
    res.json({ convertedCode });
  } catch (error) {
    console.error('Error converting code:', error);
    res.status(500).json({ error: 'An error occurred during code conversion' });
  }
});

 // API endpoint for code quality check
 app.post('/api/qualityCheck', async (req, res) => {
  try {
  
    const { code } = req.body;
    // Make a request to the ChatGPT API for code debug
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `given this code ${code} provide a quality check for the code give score out of 100 and suggestion to improve.`,
      max_tokens: 700,
      n: 1,
    });

    const convertedCode = response.data.choices[0].text;
    // Return the converted code as a response
    res.json({ convertedCode });
  } catch (error) {
    console.error('Error converting code:', error);
    res.status(500).json({ error: 'An error occurred during code conversion' });
  }
});
  
  
const port = 4500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`)
});
