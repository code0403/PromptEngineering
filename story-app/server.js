const express = require('express');
const axios = require('axios');
require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(express.json());

const API_KEY = process.env.OPENAI_API_KEY

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);


// Set up a route to handle story generation requests
app.post('/generate-story', async (req, res) => {

  const  {keyword} = req.query;
 
  try {
    // Make a request to the OpenAI API
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Given this keyword ${keyword} generate a story around this keyword`,
      max_tokens: 700,
      n: 1,
    });

    const story = response.data.choices[0].text.trim();
    res.json({ story });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});


// Set up a route to handle poem generation requests
app.post('/poem', async (req, res) => {

  const  {keyword} = req.query;
 
  try {
    // Make a request to the OpenAI API
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Given this keyword ${keyword} generate a poem around this keyword`,
      max_tokens: 700,
      n: 1,
    });

    const poem = response.data.choices[0].text.trim();
    res.json({ poem });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});


// Set up a route to handle joke generation requests
app.post('/joke', async (req, res) => {

  const  {keyword} = req.query;
 
  try {
    // Make a request to the OpenAI API
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Given this keyword ${keyword} generate a joke around this keyword`,
      max_tokens: 700,
      n: 1,
    });

    const joke = response.data.choices[0].text.trim();
    res.json({ joke });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});

// Set up a route to handle meme generation requests
app.post('/meme', async (req, res) => {

  const  {keyword} = req.query;
 
  try {
    // Make a request to the OpenAI API
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `With Given this keyword ${keyword} generate a meme in .jpg or .jpeg or .png.`,
      max_tokens: 700,
      n: 1,
    });

    const meme = response.data.choices[0].text.trim();
    res.json({ meme });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});


// Set up a route to handle shayri generation requests
app.post('/shayri', async (req, res) => {

  const  {keyword} = req.query;
  const {language} = req.body.language;
 
  try {
    // Make a request to the OpenAI API
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `With the Given keyword ${keyword} generate a Shayri in the specified ${language}`,
      max_tokens: 700,
      n: 1,
    });

    const shayri = response.data.choices[0].text.trim();
    res.json({ shayri });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});


// Set up a route to handle qoute generation requests
app.post('/quote', async (req, res) => {

  const  {keyword} = req.query;
 
  try {
    // Make a request to the OpenAI API
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `With Given this keyword ${keyword} generate a quote for the day`,
      max_tokens: 700,
      n: 1,
    });

    const quote = response.data.choices[0].text.trim();
    res.json({ quote });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});


// Set up a route to handle whishes generation requests
app.post('/whishes', async (req, res) => {

  const  {keyword} = req.query;
 
  try {
    // Make a request to the OpenAI API
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `With Given this keyword ${keyword} generate a ${keyword} whishes`,
      max_tokens: 700,
      n: 1,
    });

    const whishes = response.data.choices[0].text.trim();
    res.json({ whishes });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});



// Start the server
const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



