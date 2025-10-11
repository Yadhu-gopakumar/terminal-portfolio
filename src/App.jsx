
import { Appbar } from './components/appbar/appbar'
import { Content } from './components/content/content'
import { Footer } from './components/footer/footer'

function App() {


  return (
    <div className='flex flex-col item-center justify-between h-screen'>
     <Appbar/>
     <Content/>
     <Footer/>
    </div>
  )
}

export default App
