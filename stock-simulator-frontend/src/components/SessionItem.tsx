import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface SessionItemProps {
  name: string;
  onDelete: () => void;
}

const SessionItem: React.FC<SessionItemProps> = ({ name, onDelete }) => {
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Prevents the Link from being triggered when clicking the delete button
    event.preventDefault();
    onDelete();
  };

  return (
    <Link to="/session" className="block hover:bg-gray-200">
      <div className="flex justify-between items-center bg-gray-400 text-white p-2 rounded mb-2">
        <span>{name}</span>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </Link>
  );
};

export default SessionItem;
