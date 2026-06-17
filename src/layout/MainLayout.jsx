
import Footer from '../shared/footer/Footer';
import Navbar from '../shared/navbar/Navbar';
import { Outlet } from 'react-router';


const MainLayout = () => {
    return (
        <div >
            <div className='w-[95%] container mx-auto'>
                <Navbar></Navbar>
            </div>
            <Outlet></Outlet>
           <div className='w-[95%] container mx-auto'>
             <Footer></Footer>
           </div>
        </div>
    );
};

export default MainLayout;