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

const router=createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, 
        loader: () => fetch("http://localhost:3000/artsHome"),
        Component: Home },
      { path: 'explore',
        loader: () => fetch("http://localhost:3000/arts"),
        Component: ExploreArtworks },
      { path: 'add', element: <PrivateRoute><AddArtwork></AddArtwork></PrivateRoute> }, 
      { path: 'gallery', element: <PrivateRoute><MyGallery></MyGallery></PrivateRoute>}, 
      { path: 'favorites', element: <PrivateRoute><MyFavorites></MyFavorites></PrivateRoute> }, 
      { path: 'login', Component: Login },
      { path: 'reg', Component: Register },
      { path: 'artDetail/:id', 
        loader: ({params}) => fetch(`http://localhost:3000/arts/${params.id}`), 
        element: <PrivateRoute><ArtDetails></ArtDetails></PrivateRoute> },
      { path: 'artistInfo/:id', 
        loader: ({params}) => fetch(`http://localhost:3000/arts/${params.id}`),
        element: <PrivateRoute><ArtistInfo></ArtistInfo></PrivateRoute> },
      { path: 'editArt/:id', 
        loader: ({params}) => fetch(`http://localhost:3000/arts/${params.id}`),
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
