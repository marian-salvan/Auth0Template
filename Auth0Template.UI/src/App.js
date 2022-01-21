import logo from './logo.svg';
import './App.css';
import LoginButton from './authentication/login-button';
import LogoutButton from './authentication/logout-button';
import Profile from './authentication/profile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <LoginButton />
        <LogoutButton />
        <Profile />
      </header>
    </div>
  );
}

export default App;
