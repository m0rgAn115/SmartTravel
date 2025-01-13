import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { createContext, useState, useEffect } from 'react';
import Dashbord from './pages/Dashbord';
import DestinationCreate from './pages/Destinations/destinationCreate';
import DestinationEdit from './pages/Destinations/destinationEdit';
import DestinationView from './pages/Destinations/destinationView';
import DestinationList from './pages/Destinations/destinationList';
import UserList from './pages/Users/userList';
import ReservationList from './pages/Reservations/reservationList';
import axios from 'axios';

export const MyContext = createContext();

function App() {
  const [paquetes, setPaquetes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [reservaciones, setReservaciones] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9999/paquetes')
      .then(response => setPaquetes(response.data))
      .catch(error => console.error("Error al obtener los paquetes:", error));

    axios.get('http://localhost:9999/usuarios')
      .then(response => setUsuarios(response.data))
      .catch(error => console.error("Error al obtener los usuarios:", error));
    
    axios.get('http://localhost:9999/reservaciones')
    .then(response => setReservaciones(response.data))
    .catch(error => console.error("Error al obtener las reservaciones:", error));
  }, []);

  const values = {
    paquetes,
    setPaquetes,
    usuarios,
    setUsuarios,
    reservaciones,
    setReservaciones
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          <section className='main flex'>
            <div className='sidebarWrapper w-[15%]'>
              <Sidebar />
            </div>

            <div className='content-Right w-[85%] px-3'>
              <Routes>
                <Route path='/' element={<Dashbord />} />
                <Route
                  path='/destination/list'
                  element={<DestinationList />}
                />
                <Route
                  path='/destination/create'
                  element={<DestinationCreate />}
                />
                <Route
                  path='/destination/edit/:id'
                  element={<DestinationEdit />}
                />
                <Route
                  path='/destination/view/:id'
                  element={<DestinationView />}
                />
                <Route
                  path='/users/list'
                  element={<UserList />}
                />
                <Route
                  path='/reservations/list'
                  element={<ReservationList />}
                />
              </Routes>
            </div>
          </section>
        </MyContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
