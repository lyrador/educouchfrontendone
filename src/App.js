//import logo from './logo.svg';
import './App.css';
import AppBar from './components/Appbar';
import Learner from './components/Learner'

function App() {
  return (
    <div className="App">
      <AppBar/>
      Welcome to EduCouch! 
      <Learner/>
    </div>
  );
}

export default App;
