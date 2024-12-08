import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface SessionItemProps {
  name: string;
  onDelete: () => void;
  sessionId: string;
}

const SessionItem: React.FC<SessionItemProps> = ({ name, onDelete, sessionId }) => {
  const handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    onDelete();
  };

  return (
    <Link to={`/session/${sessionId}`} className="block transition-all duration-200">
      <div className="group relative flex items-center justify-between rounded-lg bg-gradient-to-r from-slate-800 to-slate-700 p-4 shadow-lg transition-all duration-200 hover:from-slate-700 hover:to-slate-600 hover:shadow-xl">
        <span className="font-medium text-slate-100 transition-colors duration-200 group-hover:text-white">
          {name}
        </span>
        <button
          onClick={handleDelete}
          className="rounded-full p-2 text-slate-400 transition-all duration-200 hover:bg-slate-600 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-800"
          aria-label="Delete session"
        >
          <FontAwesomeIcon icon={faTrash} className="h-4 w-4" />
        </button>
      </div>
    </Link>
  );
};

export default SessionItem;
