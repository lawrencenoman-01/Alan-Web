import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Home/index';
import Header from './components/Header/Header';
import CreateMenu from './pages/CreateMenu';
import Transaction from './pages/Transaction';
import Tabs from './components/Tabs';

function App() {
  return (
    <Router>
      <Header />
      <Tabs />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/add" element={<CreateMenu />} />
        <Route path="/transaction" element={<Transaction />} />
      </Routes>
    </Router>
  );
}

export default App;