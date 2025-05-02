import Navbar from '../components/user/Navbar/Navbar';
import Footer from '../components/user/Footer/Footer';
import { Outlet } from 'react-router-dom';

function UserLayout() {
    return (
        <>
            <Navbar/>
                <main>
                    <Outlet/>
                </main>
            <Footer/>
        </>
    )
}

export default UserLayout;