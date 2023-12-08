import { Global, css } from '@emotion/react';
import { ReactNode } from 'react';
import { Navigate, Routes as ReactRouterRoutes, Route } from 'react-router-dom';
import { CreateFormPage } from './features/counter/Counter';

// export default function App() {
//   return (
//     <>
//       <Global
//         styles={css`
//           h1,
//           h2,
//           h3,
//           h4,
//           h5,
//           h6 {
//             font-size: 1em;
//             font-weight: normal;
//             margin: 0; /* or ‘0 0 1em’ if you’re so inclined */
//           }
//         `}
//       />
//       <Layout>
//         <ReactRouterRoutes>
//           <Route path="*" element={<Navigate replace to="/" />} />
//           <Route path="/" element={<CreateFormPage />} />
//         </ReactRouterRoutes>
//       </Layout>
//     </>
//   );
// }
export default function App() {
  // return <div>hello how are you</div>;
  // return <Counter />;
  return <CreateFormPage />;
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
