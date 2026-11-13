import React, { useState, useEffect } from "react";

const welcomePoll = [
  {
    id: 1,
    title: "Your mood today",
    question: "If your mood today were a movie, it would be:",
    options: ["Comedy", "Drama", "Action", "Horror"],
  },
];

const WelcomePoll = ({
  isModalOpen,
  setIsModalOpen,
  isChecked,
  setIsChecked,
  pollTitles,
}) => {
  const [votes, setVotes] = useState({
    Comedy: 0,
    Drama: 0,
    Action: 0,
    Horror: 0,
  });
  const [hasVoted, setHasVoted] = useState(false);

  // 1. We read the data from localStorage when the component loads.
  useEffect(() => {
    const savedVotes = localStorage.getItem("welcomePollVotes");
    const userVoted = localStorage.getItem("hasVotedWelcomePoll");

    if (savedVotes) {
      setVotes(JSON.parse(savedVotes));
    }

    if (userVoted === "true") {
      setHasVoted(true);
      // If they have already voted in the past, we automatically close the modal.
      // setIsModalOpen(false);
    }
  }, [setIsModalOpen]);

  //If the modal is closed, we don't render anything (this way, the welcome page behind it will be visible)
  if (!isModalOpen) return null;

  // 2. The function that records the vote
  const handleVote = (e) => {
    e.preventDefault();
    if (!isChecked || hasVoted) return;

    const updatedVotes = {
      ...votes,
      [isChecked]: (votes[isChecked] || 0) + 1,
    };

    setVotes(updatedVotes);
    setHasVoted(true);

    // We save to localStorage so that they cannot vote again.
    localStorage.setItem("welcomePollVotes", JSON.stringify(updatedVotes));
    localStorage.setItem("hasVotedWelcomePoll", "true");
  };

  // We calculate the total number of votes in order to display the percentages.
  const totalVotes = Object.values(votes).reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Overlay background */}
      <div
        onClick={() => setIsModalOpen(false)}
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
      ></div>

      {/* Modal Card - Responsive (full width on mobile, max-width: md on larger screens) */}
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all bg-white px-5 py-6 sm:px-8 sm:py-8 rounded-2xl shadow-[inset_0_0_10px_rgba(79,70,230,0.5)]">
        {/* Modal close button */}
        <button
          onClick={() => setIsModalOpen(false)}
          aria-label="Close modal"
          className="absolute top-4 right-4 p-2 text-sky-700 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all duration-200 cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div>
          <h1
            className={`${pollTitles} mt-6 sm:mt-8 text-2xl sm:text-3xl text-shadow-lg text-shadow-indigo-950`}
          >
            {welcomePoll[0].title}
          </h1>
          <p className="text-base sm:text-lg mb-5 font-[Poppins] text-sky-950 font-medium mt-3 tracking-wider">
            {welcomePoll[0].question}
          </p>
        </div>

        {/* 3. Conditional display: Voting form OR Results */}
        {!hasVoted ? (
          <form onSubmit={handleVote}>
            {welcomePoll[0].options.map((option, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 mb-3 sm:mb-4 font-[Poppins] text-sky-700 text-base sm:text-lg font-medium tracking-wider"
              >
                <label className="flex items-center cursor-pointer group p-2 rounded-xl hover:bg-sky-50 transition-colors">
                  <input
                    type="radio"
                    name="mood"
                    value={option}
                    checked={isChecked === option}
                    onChange={(e) => setIsChecked(e.target.value)}
                    className="sr-only peer"
                  />
                  {/* Cerculețul custom */}
                  <div className="h-6 w-6 shrink-0 flex items-center justify-center border-2 border-sky-500 mr-3 sm:mr-4 rounded-full group-hover:border-pink-500 peer-checked:bg-pink-400 peer-checked:border-pink-500 transition-all duration-200">
                    {isChecked === option && (
                      <i className="fa-solid fa-check text-white text-[12px]"></i>
                    )}
                  </div>
                  <span className="select-none">{option}</span>
                </label>
              </div>
            ))}

            {/* Functional and stylized Vote button */}
            <button
              type="submit"
              disabled={!isChecked}
              className={`w-full py-3 px-6 mt-2 mb-2 font-extrabold rounded-xl border-2 transition-all duration-300 ${
                isChecked
                  ? "text-sky-700 bg-white/40 border-sky-700 hover:bg-pink-500 hover:border-pink-500 hover:text-white hover:shadow-md cursor-pointer"
                  : "text-gray-400 bg-gray-100 border-gray-300 cursor-not-allowed opacity-70"
              }`}
            >
              Vote
            </button>
          </form>
        ) : (
          /*Voting results */
          <div className="font-[Poppins] space-y-4 my-4 ">
            <p className="text-sm text-pink-600 font-semibold">
              Thank you for voting! Here are the results so far:
            </p>
            {welcomePoll[0].options.map((option, index) => {
              const count = votes[option] || 0;
              const percentage =
                totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
              const isUserChoice = isChecked === option;

              return (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm sm:text-base font-medium text-sky-900">
                    <span className="flex items-center gap-2">
                      {option}
                      {isUserChoice && (
                        <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-semibold">
                          Your vote
                        </span>
                      )}
                    </span>
                    <span className="text-sky-700 font-bold">
                      {percentage}% ({count})
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-sky-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isUserChoice ? "bg-pink-500" : "bg-sky-500"
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-3 px-6 mt-6 text-white font-bold bg-sky-700 rounded-xl hover:bg-pink-500 transition-all duration-300 cursor-pointer"
            >
              Continue to Welcome Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomePoll;
