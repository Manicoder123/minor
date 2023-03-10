import './App.css';
import Home from './Home/Home';
import About from './About/About';
import Contact from './Contact/Contact';
import StudentLogin from './Home/StudentLogin/StudentLogin';
import FacultyLogin from './Home/FacultyLogin/FacultyLogin';
import AdminLogin from './Home/AdminLogin/AdminLogin';
import Admin from '../src/Home/AdminLogin/Admin/Admin';

import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
          <Routes>
                 <Route exact path='/' element={< Home />}></Route>
                 <Route exact path='/about' element={< About />}></Route>
                 <Route exact path='/contact' element={< Contact />}></Route>
                 <Route exact path='/studentlogin' element={<StudentLogin />}></Route>
                 <Route exact path='/facultylogin' element={< FacultyLogin />}></Route>
                 <Route exact path='/adminlogin' element={< AdminLogin />}></Route>
                 <Route exact path='/admin' element={< Admin />}></Route>
          </Routes>
    </Router>
  );
}

export default App;
