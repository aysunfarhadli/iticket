import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Protected from './components/Protected';

import Home from './pages/Home';
import Events from './pages/Events';
import EventDetails from './pages/EventDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import MyTickets from './pages/MyTickets';
import MyOrders from './pages/MyOrders';
import Profile from './pages/Profile';
import InvoicePage from './pages/InvoicePage';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import AdminEvents from './pages/admin/Events';
import AdminOrders from './pages/admin/Orders';
import AdminUsers from './pages/admin/Users';
import AdminCategories from './pages/admin/Categories';
import AdminVenues from './pages/admin/Venues';
import AdminCities from './pages/admin/Cities';

export default function App() {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
          <Route path="/orders/:id/success" element={<Protected><OrderSuccess /></Protected>} />
          <Route path="/orders/:id/invoice" element={<Protected><InvoicePage /></Protected>} />
          <Route path="/my-tickets" element={<Protected><MyTickets /></Protected>} />
          <Route path="/my-orders" element={<Protected><MyOrders /></Protected>} />
          <Route path="/profile" element={<Protected><Profile /></Protected>} />

          <Route path="/admin" element={<Protected admin><AdminLayout /></Protected>}>
            <Route index element={<AdminDashboard />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="venues" element={<AdminVenues />} />
            <Route path="cities" element={<AdminCities />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
