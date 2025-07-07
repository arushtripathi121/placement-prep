import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LandingPage from '../pages/LandingPage'
import Resume from '../pages/Resume'

const AppRouter = () => {

    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <LandingPage />
        },
        {
            path: '/resumeusinggithub',
            element: <Resume />
        }
    ])

    return (
        <RouterProvider router={appRouter}></RouterProvider>
    )
}

export default AppRouter
