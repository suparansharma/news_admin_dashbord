import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useRouter } from "next/router";
import { useState } from 'react';
import { Slide, ToastContainer } from "react-toastify";
import UserContext from './../components/context/userContext';
import 'react-toastify/dist/ReactToastify.css';
import Login from '../pages/user/login';
import '../styles/globals.css';
import Layout from '/components/Layout';
const MyApp = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  if (typeof window !== "undefined") {
    const token = localStorage.getItem('user');
    if (!token) {
      return (
        <>
          <Login />
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            closeOnClick
            pauseOnHover
            transition={Slide}
          />

        </>
      );
    }
  }

  return (
    <>
    <UserContext.Provider>
        <Layout>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
          <Component {...pageProps} />
         
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            draggable={false}
            closeOnClick
            pauseOnHover
            transition={Slide}
          />
          </Hydrate>
           <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </Layout>
        </UserContext.Provider>
    </>
  );
};
export default MyApp;