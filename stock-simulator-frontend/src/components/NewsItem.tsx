import React from "react";

interface NewsItemProps {
  headline: string;
  imageUrl?: string; // Optional prop
  link: string;
}

const NewsItem: React.FC<NewsItemProps> = ({ headline, imageUrl, link }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="p-4 bg-white rounded shadow flex space-x-4 hover:bg-gray-100 transition-colors">
      {imageUrl && (
        <img src={imageUrl} alt="News" className="w-16 h-16 object-cover rounded" />
      )}
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{headline}</h3>
      </div>
    </a>
  );
};

export default NewsItem;
