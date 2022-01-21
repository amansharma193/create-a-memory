import {Container} from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import { HashRouter , Routes, Route } from "react-router-dom";
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
const App = () => {
  return (
    <HashRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes >
          <Route path="/" exact element={<Home />} />
          <Route path="/auth" exact element={<Auth />} />
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
