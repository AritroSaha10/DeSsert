import Navbar from './Navbar';
import ContactIcons from './ContactIcons';


const PageLayout = ({ children }) => {
  return (
    <div className='grid grid-rows-page min-h-screen'>
        <Navbar />
        <div className='bg-orange-300'>
            {children}
        </div>
        <footer className='p-4 border-t border-t-zinc-800 text-center font-bold bg-orange-500 text-orange-900 text-5xl'>Contacts
          <ContactIcons />
        </footer>
    </div>
  )
}

export default PageLayout