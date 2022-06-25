import PageLayout from '../components/PageLayout'
import '../styles/globals.css'
import UserAuthProvider from '../lib/UserContext'
import UserKeyProvider from '../lib/UserKeyContext'

function MyApp({ Component, pageProps }) {
  return (
    <UserAuthProvider>
      <UserKeyProvider>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </UserKeyProvider>
    </UserAuthProvider>
  )
}

export default MyApp
