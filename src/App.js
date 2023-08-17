import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';

import Sections from './components/section';
import Price from './components/price';
import Car from './components/cars';

import Login from './components/login';
import Reservation from './components/reservation';
import Agent from './components/agent';
import AgentReservation from './components/agentReservation';
import Employee from './components/employee';
import AddAgent from './components/add/addAgent';
import EditAgent from './components/edit/editAgent';
import AddReservation from './components/add/addReservation';
import EditReservation from './components/edit/editReservation';
import AddAgentReservation from './components/add/addAgentReservation';
import AddPrice from './components/add/addPrice';
import EditPrice from './components/edit/editPrice';
import PriceListBySection from './components/list/priceListBySection';
import AddCar from './components/add/addCar';
import AddEmployee from './components/add/addEmployee';
import EditEmployee from './components/edit/editEmployee';
import EditCar from './components/edit/editCar';
import AddSection from './components/add/addSection';
import EditSection from './components/edit/editSection';
import CarDrivers from './components/list/carDrivers';
import GetAgentPrice from './components/list/getAgentPrice';
import Color from './components/color';
import AddColor from './components/add/addColor';
import EditColor from './components/edit/editColor';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="login" element={<Login />} />

      {/* Price Paths */}
      <Route path="prices" element={<Price />} />
      <Route path="addPrice" element={<AddPrice />} />
      <Route path="editPrice" element={<EditPrice />} />
      <Route path="priceList" element={<PriceListBySection />} />
      {/* Price Paths End */}

      {/* Reservation Paths */}
      <Route path="reservations" element={<Reservation />} />
      <Route path="addReservation" element={<AddReservation />} />
      <Route path="editReservation" element={<EditReservation />} />
      {/* Agent Paths End */}

      {/* Section Paths*/}
      <Route path="sections" element={<Sections />} />
      <Route path="addSection" element={<AddSection />} />
      <Route path="editSection" element={<EditSection />} />
      {/* Section Paths End */}


      {/* Car Paths */}
      <Route path="cars" element={<Car />} />
      <Route path="addCar" element={<AddCar />} />
      <Route path="editCar" element={<EditCar />} />
      <Route path="carDrivers" element={<CarDrivers />} />
      {/* Car Paths End */}

      {/* Employee Paths */}
      <Route path="employees" element={<Employee />} />
      <Route path="addEmployee" element={<AddEmployee />} />
      <Route path="editEmployee" element={<EditEmployee />} />
      {/* Employee Paths End */}

      {/* Agent Paths */}
      <Route path="agents" element={<Agent />} />
      <Route path="addAgent" element={<AddAgent />} />
      <Route path="editAgent" element={<EditAgent />} />
      <Route path="addAgentPrices" element={<GetAgentPrice />} />
      {/* Agent Paths End*/}

      {/* Agent Reservation Paths */}
      <Route path="agentReservation" element={<AgentReservation />} />
      <Route path="addAgentReservation" element={<AddAgentReservation />} />
      {/* Agent Reservation Paths End */}

      {/* Color Paths */}
      <Route path="colors" element={<Color />} />
      <Route path="addColor" element={<AddColor />} />
      <Route path="editColor" element={<EditColor />} />
      {/* Color Paths End */}
    </Routes>
  );
}

export default App;
