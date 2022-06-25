import Navbar from './Navbar';
import ContactIcons from './ContactIcons';


const PageLayout = ({ children }) => {
  return (
    <div className='grid grid-rows-page min-h-screen'>
        <Navbar />
        <div className='bg-orange-300'>
            {children}
        </div>
        <footer className='p-4 text-center bg-orange-500  text-xl'>
          © 2022 All rights reserved.
        </footer>
    </div>
  )
}

export default PageLayout