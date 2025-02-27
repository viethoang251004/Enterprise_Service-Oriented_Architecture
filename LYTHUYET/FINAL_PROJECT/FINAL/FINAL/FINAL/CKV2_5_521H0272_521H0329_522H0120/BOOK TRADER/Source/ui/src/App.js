import SignUp from "./components/forms/signup.seller.form";
import Login from "./components/forms/login.seller.form";
import Profile from "./components/settings.seller"
import Layout from "./components/layout";
import Dashboard from "./components/dashboard.seller";
import Book from "./components/book/book.seller";
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path='/seller' element={ <Layout /> }>
            <Route index element={ <Dashboard /> }/>
            <Route index path='settings' element={ <Profile /> }/>
            <Route index path='books' element={ <Book /> }/>
          </Route>
          <Route path='/' element={ <Login /> }/>
          <Route path='/signup' element={ <SignUp /> }/>
        </Routes>
        
      </BrowserRouter>

  )
}

export default App;
