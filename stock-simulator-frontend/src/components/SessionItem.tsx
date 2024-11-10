import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface SessionItemProps {
    name: string;
    onDelete: () => void;
}

const SessionItem: React.FC<SessionItemProps> = ({ name, onDelete }) => {
  return (
    <div className="flex justify-between items-center bg-gray-400 text-white p-2 rounded mb-2">
        <span>{name}</span>
      <button onClick={onDelete} className="text-red-500 hover:text-red-700 focus:outline-none">
        <FontAwesomeIcon icon={faTrash} />
      </button>
    </div>
  );
}

export default SessionItem;