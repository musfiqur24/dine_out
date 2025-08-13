import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CreateOrderForm from './components/CreateOrderForm';
import OrderSummary from './components/OrderSummary';
import OrderReports from './components/OrderReports';
import './index.css';

let orderIdCounter = 100;

export default function App() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('All');

  const placeOrder = ({ customerName, items, amount }) => {
    const newOrder = {
      id: orderIdCounter++,
      customerName,
      items,
      amount,
      status: 'PENDING',
      createdAt: Date.now(),
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const deliverOrder = (id) => {
    setOrders(prev =>
      prev.map(o => (o.id === id ? { ...o, status: 'DELIVERED' } : o))
    );
  };

  const deleteOrder = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
  };

  // Inline count calculation
  const total = orders.length;
  const pending = orders.filter(o => o.status === 'PENDING').length;
  const delivered = orders.filter(o => o.status === 'DELIVERED').length;

  return (
    <div className="container mx-auto px-4 h-screen flex flex-col text-white bg-background">
      <Navbar />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 flex-grow">
        <CreateOrderForm onPlaceOrder={placeOrder} />

        <div className="md:col-span-2 h-[calc(100vh_-_130px)] overflow-auto">
          <OrderSummary total={total} pending={pending} delivered={delivered} />

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Order Reports</h2>
            <div>
              <select
                value={filter}
                onChange={e => setFilter(e.target.value)}
                className="bg-zinc-900 accent-orange-600 border-none outline-none rounded-sm px-2 py-1"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Delivered</option>
              </select>
            </div>
          </div>

          <OrderReports
            orders={orders}
            onDeliver={deliverOrder}
            onDelete={deleteOrder}
            filter={filter}
          />
        </div>
      </div>
    </div>
  );
}
