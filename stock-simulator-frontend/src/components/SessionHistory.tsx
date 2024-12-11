import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faSquare } from "@fortawesome/free-solid-svg-icons";

interface session {
        name: string;
        startAmount: number;
        targetAmount: number;
        finishingFunds: number;
        endDate: string;
    }

interface SessionHistoryProps {
    session: session;
    index: number;
}

const SessionHistory: React.FC<SessionHistoryProps> = ({ session, index }) => {
    // console.log("Session history", session);
    const profit = session.finishingFunds - session.startAmount;
    const profitPercentage = (profit / session.startAmount) * 100;

    let profitIcon = faSquare;
    let profitColor = "text-blue-500";

    if (profit > 0) {
        profitIcon = faArrowUp;
        profitColor = "text-green-500 font-bold";
    } else if (profit < 0) {
        profitIcon = faArrowDown;
        profitColor = "text-red-500 font-bold";
    }
    return (
        <div
              key={index}
              className="bg-white shadow rounded-lg p-4 border border-gray-200"
            >
              <h3 className="text-xl font-semibold">{session.name}</h3>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-gray-700">
                  <span>Starting Funds:</span>
                  <span>${session.startAmount}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Target Funds:</span>
                  <span>${session.targetAmount}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Finishing Funds:</span>
                  <span>${session.finishingFunds.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-700">
                    <span>Profit:</span>
                    <span className={`flex items-center ${profitColor}`}>
                        <FontAwesomeIcon icon={profitIcon} className="mr-1" />
                        {profitPercentage.toFixed(2)}%
                    </span>
                </div>
                {/* <div className="mt-4">
                    <h2 className="text-3xl font-bold">{session.score}%</h2>
                </div> */}
              </div>
            </div>
    )
}

export default SessionHistory;