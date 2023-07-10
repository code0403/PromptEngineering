
import './App.css';
import CodeConverter from './components/CodeConverter';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/theme-github';

function App() {
  return (
    <div className="App">
      <CodeConverter />
    </div>
  );
}

export default App;
