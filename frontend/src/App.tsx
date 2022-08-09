import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IdentityWrapper } from './components/wrappers/IdentityWrapper';
import HomePage from './pages/home-page';

export default function App() {
  return (
    <IdentityWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </IdentityWrapper>
  );
}
