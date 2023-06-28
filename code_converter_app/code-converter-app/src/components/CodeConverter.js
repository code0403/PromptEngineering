import React, { useState } from 'react';
import axios from 'axios';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';
import '../styles/CodeConverter.css';

const openai = require('openai');

const CodeConverter = () => {
  const [sourceCode, setSourceCode] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [convertedCode, setConvertedCode] = useState('');
  const [debugLogs, setDebugLogs] = useState('');
  const [suggestedCode, setSuggestedCode] = useState('');

  const handleConvertCode = async () => {
    try {
      const response = await axios.post('/api/convert', {
        code: sourceCode,
        sourceLanguage: 'source_language_here',
        targetLanguage: targetLanguage,
        debug: true,
      });

      setConvertedCode(response.data.convertedCode);
      setDebugLogs(response.data.debugLogs);

      const suggestedCodeResponse = await openai.complete({
        engine: 'davinci-codex',
        prompt: sourceCode,
        maxTokens: 100,
        temperature: 0.7,
        n: 1,
        stop: '\n',
      });

      setSuggestedCode(suggestedCodeResponse.choices[0].text);
    } catch (error) {
      console.error('Error converting code:', error);
    }
  };

  const handleCodeChange = (newCode) => {
    setSourceCode(newCode);
  };

  const handleLanguageChange = (event) => {
    setTargetLanguage(event.target.value);
  };

  return (
    <div className="container">
      <div className="editor-container">
        <AceEditor
          mode="javascript"
          theme="github"
          name="code-editor"
          value={sourceCode}
          onChange={handleCodeChange}
          editorProps={{ $blockScrolling: true }}
          width="45%"
        />
        <div className="result-container">
          <div className="code-pane">
            <h3>Converted Code:</h3>
            <pre>{convertedCode}</pre>
          </div>
          <div className="code-pane">
            <h3>Suggested Code:</h3>
            <pre>{suggestedCode}</pre>
          </div>
        </div>
      </div>
      <div className="select-container">
        <select value={targetLanguage} onChange={handleLanguageChange}>
          <option value="">Select Target Language</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
        <button onClick={handleConvertCode} disabled={!targetLanguage}>
          Convert Code
        </button>
      </div>
      <div className="debug-container">
        <h3>Debug Logs:</h3>
        <pre>{debugLogs}</pre>
      </div>
    </div>
  );
};

export default CodeConverter;
