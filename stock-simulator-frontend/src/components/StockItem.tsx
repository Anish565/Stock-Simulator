import React from "react";

interface StockItemProps {
  name: string;
  price: number;
  changePercentage: number;
}

const StockItem: React.FC<StockItemProps> = ({ name, price, changePercentage }) => {
  const isPositive = changePercentage >= 0;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded shadow">
      <div className="flex flex-col">
        <span className="font-semibold">{name}</span>
        <span className="text-gray-600">${price.toFixed(2)}</span>
      </div>
      <span className={`text-lg font-bold ${isPositive ? "text-green-500" : "text-red-500"}`}>
        {isPositive ? "+" : ""}
        {changePercentage.toFixed(2)}%
      </span>
    </div>
  );
};

export default StockItem;
