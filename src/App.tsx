import { Global, css } from '@emotion/react';
import { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CreateFormPage from './pages/CreateFormPage';
import PreviewFormPage from './pages/PreviewFormPage';
import ResultPage from './pages/ResultPage';

export default function App() {
  return (
    <Router>
      <Global
        styles={css`
          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            font-size: 1em;
            font-weight: normal;
            margin: 0; /* or ‘0 0 1em’ if you’re so inclined */
          }
        `}
      />
      <Layout>
        <Routes>
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route path="/" element={<CreateFormPage />} />
          <Route path="/preview" element={<PreviewFormPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div
      css={css`
        max-width: 100%;
        width: 100%;
        padding: 0;
        margin: 0;
        height: auto;
      `}
    >
      {children}
    </div>
  );
}
