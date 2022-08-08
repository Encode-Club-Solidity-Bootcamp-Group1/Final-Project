import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NewWrapper } from './components/wrappers/IdentityWrapper';
import HomePage from './pages/home-page';

function App() {
  return (
    <NewWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </NewWrapper>
  );
}

export default App;
