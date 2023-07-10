import React, { useState } from 'react';
import axios from 'axios';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import '../styles/CodeConverter.css';

function App() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState('Python');
  const [convertedCode, setConvertedCode] = useState('');
  const [debugSuggestions, setDebugSuggestions] = useState([]);
  const [qualityCheckResults, setQualityCheckResults] = useState("");
  const [activeOutput, setActiveOutput] = useState('converted'); // Default to 'converted'

  const targetLanguages = [
    'Python',
    'JavaScript',
    'Java',
    'C++',
    // Add more languages as needed
  ];

  const convertCode = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4500/api/convert', { code, targetLanguage });
      setConvertedCode(response.data.convertedCode);
      setActiveOutput('converted');
    } catch (error) {
      setError('An error occurred while converting the code.');
      console.error(error);
    }

    setLoading(false);
  };

  const debugCode = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4500/api/debug', { code });
      console.log(response.data.convertedCode)
      setDebugSuggestions(response.data.convertedCode);
      setActiveOutput('debug');
    } catch (error) {
      setError('An error occurred while debugging the code.');
      console.error(error);
    }

    setLoading(false);
  };

  const performQualityCheck = async () => {
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:4500/api/qualityCheck', { code });
      console.log(response.data.convertedCode)
      console.log(typeof(response.data.convertedCode))
      setQualityCheckResults(response.data.convertedCode);
      setActiveOutput('qualityCheck');
    } catch (error) {
      setError('An error occurred while performing quality check.');
      console.error(error);
    }

    setLoading(false);
  };

  const renderOutput = () => {
    switch (activeOutput) {
      case 'converted':
        return (
          <textarea className="output-content" value={convertedCode} readOnly />
        );
      case 'debug':
        return (
          <pre className="output-content debug-list">
            {debugSuggestions}
          </pre>
        );
      case 'qualityCheck':
        return (
          <pre className="output-content quality-check-results">
            {qualityCheckResults}
          </pre>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <h1 className="app-title">Code Converter</h1>
      <div className="app-container">
        <div className="editor-container">
          <div className="editor-header">
            <select
              className="language-select"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              {targetLanguages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
            <button className="convert-button" onClick={convertCode} disabled={loading}>
              {loading ? 'Converting...' : 'Convert'}
            </button>
            <button className="debug-button" onClick={debugCode} disabled={loading}>
              {loading ? 'Debugging...' : 'Debug'}
            </button>
            <button className="quality-check-button" onClick={performQualityCheck} disabled={loading}>
              {loading ? 'Checking...' : 'Quality Check'}
            </button>
          </div>
          <AceEditor
            mode="javascript"
            theme="github"
            value={code}
            onChange={setCode}
            placeholder="Enter your code here..."
            fontSize={16}
            width="100%"
            height="calc(100vh - 120px)"
          />
        </div>
        <div className="output-container">
          <div className="output-header">
            <h2 className="output-title">Output</h2>
          </div>
          {renderOutput()}
        </div>
      </div>
    </div>
  );
}

export default App;
