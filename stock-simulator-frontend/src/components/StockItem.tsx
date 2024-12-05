import React from "react";

interface StockItemProps {
  symbol: string;
  name: string;
  price: number;
  changePercentage: number;
  onSelect: () => void;
}

const StockItem: React.FC<StockItemProps> = ({ 
  symbol, 
  name, 
  price, 
  changePercentage,
  onSelect 
}) => {
  const isPositive = changePercentage >= 0;

  return (
    <div 
      onClick={onSelect}
      className="flex items-center justify-between p-4 bg-gray-100 rounded shadow hover:bg-gray-200 transition-colors duration-150 cursor-pointer"
    >
      <div className="flex flex-col">
        <span className="font-semibold text-gray-800">{name}</span>
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
