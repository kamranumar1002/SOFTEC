import './App.css'
import Home from './Home'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from './Login'
import Signup from './Signup'
import Clientfeed from './Clientfeed'
import CreatorFeed from './Creatorfeed'
import Messages from './Messages'
import Chat from './Chat'
import CreatorProfile from './CreatorProfile'
import ViewRequests from './ViewRequests'
import CatalogManager from './CatalogManager'
import ViewCreatorReview from './ViewCreatorReview'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import Header from './Header';
import Footer from './Footer';
import ClientProfile from './ClientProfile';

function App() {
  
  return (
    <>
    <Router>
      <Header />
      <main>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/Signup' element={<Signup/>}></Route>
      <Route path='/Contactus' element={<ContactUs/>}></Route>
      <Route path='/Aboutus' element={<AboutUs/>}></Route>
      <Route path='/clientfeed' element={<Clientfeed/>}></Route>
      <Route path='/creatorfeed' element={<CreatorFeed/>}></Route>
      <Route path='/messages' element={<Messages/>}></Route>
      <Route path='/chat/:id' element={<Chat/>}></Route>
      <Route path='/creatorProfile/:id' element={<CreatorProfile/>}></Route>
      <Route path='/requests' element={<ViewRequests/>}></Route>
      <Route path='/catalogManager' element={<CatalogManager/>}></Route>
      <Route path='/creatorReview' element={<ViewCreatorReview/>}></Route>
      <Route path='/client-profile/:id' element={<ClientProfile/>}></Route>
      </Routes>
      </main>

      <Footer />
      
    </Router>
   
    </>
  )
}

export default App
