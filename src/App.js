import './App.css';
import { createBrowserRouter, RouterProvider, } from "react-router-dom"
import routerArray from './router';
import FullScreenLoaderSpinner from './reusable/FullScreenLoaderSpinner';
import { useSelector } from 'react-redux';



const router = createBrowserRouter(routerArray);


function App() {

  const fullScreenLoader = useSelector(state => state.fullScreenLoader)



  return (<>
    <RouterProvider router={router} />
    {fullScreenLoader && <FullScreenLoaderSpinner />}

  </>
  );
}

export default App;
