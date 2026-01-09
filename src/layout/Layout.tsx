import React from 'react'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'
import Onboarding from '../components/Modals/onboarding/Onboarding'
import Signin from '../components/Modals/Signin'
import EditProfile from '../components/Modals/onboarding/EditPorfile'
import Footer from '../common/Footer'

const Layout = () => {
    return (
        <div className="h-screen flex flex-col">
            <Header />
            
            <main className="flex-1 pb-5 px-4">
                <Outlet />
            </main>
            <Footer />

            {/* Modal */}
            <Signin />
            <Onboarding />
            <EditProfile />
        </div>
    )
}

export default Layout