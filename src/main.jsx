import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import './index.css'
import Root from './assets/Components/Root.jsx';
import Home from './assets/Components/Home.jsx';
import ExploreArtworks from './assets/Components/ExploreArtworks.jsx';
import PrivateRoute from './assets/Components/PrivateRoute.jsx';
import AddArtwork from './assets/Components/AddArtwork.jsx';
import MyGallery from './assets/Components/MyGallery.jsx';
import MyFavorites from './assets/Components/MyFavorites.jsx';
import ErrorLayout from './assets/Components/ErrorLayout/ErrorLayout.jsx';
import Login from './assets/Components/Login.jsx';
import Register from './assets/Components/Register.jsx';
import AuthProvider from './assets/Components/AuthProvider.jsx';
import ArtDetails from './assets/Components/ArtDetails.jsx';
import ArtistInfo from './assets/Components/ArtistInfo.jsx';
import EditArt from './assets/Components/EditArt.jsx';
import ServerError from './assets/Components/ErrorLayout/ServerError.jsx';
import About from './assets/Components/About.jsx';

const router=createBrowserRouter([
  {
    path: "/",
    Component: Root,
    errorElement: <ServerError></ServerError>,
    children: [
      { index: true, 
        loader: () => fetch("https://artify-server-side.onrender.com/artsHome"),
        Component: Home },
      { path: 'about', Component: About},
      { path: 'explore',
        loader: () => fetch("https://artify-server-side.onrender.com/arts"),
        Component: ExploreArtworks },
      { path: 'add', element: <PrivateRoute><AddArtwork></AddArtwork></PrivateRoute> }, 
      { path: 'gallery', element: <PrivateRoute><MyGallery></MyGallery></PrivateRoute>}, 
      { path: 'favorites', 
        loader: () => fetch('https://artify-server-side.onrender.com/favorites') ,
        element: <PrivateRoute><MyFavorites></MyFavorites></PrivateRoute> }, 
      { path: 'login', Component: Login },
      { path: 'reg', Component: Register },
      { path: 'artDetail/:id', 
        loader: ({params}) => fetch(`https://artify-server-side.onrender.com/arts/${params.id}`), 
        element: <PrivateRoute><ArtDetails></ArtDetails></PrivateRoute> },
      { path: 'artistInfo/:id', 
        loader: ({params}) => fetch(`https://artify-server-side.onrender.com/arts/${params.id}`),
        element: <PrivateRoute><ArtistInfo></ArtistInfo></PrivateRoute> },
      { path: 'editArt/:id', 
        loader: ({params}) => fetch(`https://artify-server-side.onrender.com/arts/${params.id}`),
        element: <PrivateRoute><EditArt></EditArt></PrivateRoute> },
      
    ], 
  },

    { path: '*', Component: ErrorLayout },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
          <RouterProvider router={router}></RouterProvider>
      </AuthProvider> 
  </StrictMode>,
)