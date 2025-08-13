import React from "react";
import ReportRow from "./ReportRow";

export default function OrderReports({ orders, onDeliver, onDelete, filter }) {
  let filtered = orders;
  if (filter !== "All") {
    filtered = orders.filter((order) =>
      filter === "Pending"
        ? order.status === "PENDING"
        : order.status === "DELIVERED"
    );
  }

  return (
    <div>
      <div className="flex justify-between"></div>
      <div className="bg-cardbg rounded-lg p-4">
        <div className="reports-container">
          <table className="min-w-full">
            <thead>
              <tr className="text-left text-sm">
                <th className="pb-3 font-medium">ID</th>
                <th className="pb-3 font-medium">Customer Name</th>
                <th className="pb-3 font-medium">Items</th>
                <th className="pb-3 font-medium">Amount</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filtered.map((order) => (
                <ReportRow
                  key={order.id}
                  order={order}
                  onDeliver={onDeliver}
                  onDelete={onDelete}
                />
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-400">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
