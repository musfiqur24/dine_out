import React from 'react';

export default function ReportRow({ order, onDeliver, onDelete }) {
  return (
    <tr className="border-t border-gray-700">
      <td className="py-3 align-top">{order.id}</td>
      <td className="py-3 align-top">{order.customerName}</td>
      <td className="py-3 align-top">
        {order.items.map(i => (
          <div key={i.id} className="text-xs">{i.name} x{i.quantity}</div>
        ))}
      </td>
      <td className="py-3 align-top">{order.amount}</td>
      <td className="py-3 align-top"><span className={order.status === 'PENDING' ? 'text-red-500' : 'text-green-500'}>{order.status}</span></td>
      <td className="py-3 align-top">
        <button onClick={() => onDelete(order.id)} className="bg-gray-800 hover:bg-red-600 text-xs px-3 py-1 rounded-full mr-1 transition-colors duration-300">Delete</button>
        {order.status === 'PENDING' && (
          <button onClick={() => onDeliver(order.id)} className="bg-gray-800 hover:bg-green-600 text-xs px-3 py-1 rounded-full transition-colors duration-300">DELIVER</button>
        )}
      </td>
    </tr>
  );
}
