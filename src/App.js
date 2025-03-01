import './App.css';

import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { Navbar } from './components/ConstantComponents'

import HomePage from './pages/HomePage'



function App() {
  return (
    <>
      <Router position="relative">

        <Navbar/>
        <Routes>
          <Route path="/" exact element={<HomePage/>}/>
          {/* <Route path="/products" exact element={<ProductsPage/>}/>

          <Route path='*' element={<NotFoundPage/>}/> */}
        </Routes>


      </Router>

    </>
  );
}

export default App;
