import React from "react";

export default function FoodItemCard({
  item,
  quantity,
  onIncrement,
  onDecrement,
}) {
  return (
    <div className="bg-gray-700 bg-opacity-30 rounded-md p-3 mb-3 flex justify-between items-center hover:bg-opacity-40 transition-all duration-300">
      <div className="flex items-center">
        <div className="w-12 h-12 flex items-center justify-center mr-3">
          <img src={item.image} alt={item.name} className="w-10 h-10" />
        </div>
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-xs text-gray-400">BDT {item.price}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onDecrement(item.id)}
          className="w-8 h-8 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-300 text-red-400 font-bold"
        >
          −
        </button>
        <div className="min-w-[28px] text-center">{quantity || 0}</div>
        <button
          onClick={() => onIncrement(item.id)}
          className="w-8 h-8 bg-gray-800 hover:bg-primary rounded-full flex items-center justify-center transition-colors duration-300 text-green-400 font-bold"
        >
          +
        </button>
      </div>
    </div>
  );
}
