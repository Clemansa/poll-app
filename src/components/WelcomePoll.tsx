import React from "react";

const welcomePoll = [
  {
    id: 1,
    title: "Your mood today",
    question: "If your mood today were a movie,it would be:",
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
  // functions

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay background */}
      <div className="absolute inset-0 bg-inherit "></div>

      {/*Modal Card */}
      <div className="relative w-full max-w-md transform transition-all bg-white px-8 py-6 rounded-2xl shadow-[inset_0_0_10px_rgba(79,70,230,0.5)]">
        {/* Modal close button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-sky-700 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-all duration-200"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {/* Header */}
        <div>
          <h1
            className={`${pollTitles}  mt-10 text-shadow-lg text-shadow-indigo-950`}
          >
            {welcomePoll[0].title}
          </h1>
          <p className="text-6 mb-5 font-[Poppins] text-sky-950  font-medium  mt-4 tracking-wider">
            {welcomePoll[0].question}
          </p>
        </div>

        {/* Form */}

        <form>
          {welcomePoll[0].options.map((option, index) => (
            <div
              key={index}
              className="flex flex-col gap-2  mb-4 font-[Poppins] text-sky-700 text-5 font-medium tracking-wider"
            >
              <label className="flex items-center  text-5 font-medium   tracking-wider">
                <input
                  onClick={() => setIsChecked(!isChecked)}
                  type="radio"
                  name="mood"
                  value={option}
                  checked={isChecked === option}
                  onChange={(e) => setIsChecked(e.target.value)}
                  className="mr-2 sr-only peer"
                ></input>
                {/* the square like logo */}
                <div className="h-6 w-6 flex items-center justify-center border-2 border-sky-500 mr-4 rounded-full group-hover:border-pink-500  peer-checked:bg-pink-300 peer-checked:border-sky-400 transition-all duration-200">
                  {isChecked === option ? (
                    <i className="fa-solid fa-check text-white text-[12px]"></i>
                  ) : null}
                </div>
                {option}
              </label>
            </div>
          ))}
        </form>

        {/* Submit button */}
        <button className="w-full py-3 px-6 mb-4 text-sky-700 font-extrabold bg-white/40 backdrop-blur-sm border-2 border-sky-700 rounded-xl hover:bg-pink-500 hover:text-white hover:shadow-md transition-all duration-300">
          Vote
        </button>
      </div>
    </div>
  );
};

export default WelcomePoll;

// TO DO :
// 1.BUTONUL DE INCHIDERE AL MODALULUI SA FUNCTYIONEZE PLUS STILIZAT
// 2. BUTONUL DE VOTE SA FIE FUNCTIONAL PLUS STILIZAT
// 3.DUPA CE SE DA VOTE SA APARA REZULTATELE VOTURILOR DE PANA ACUM
// 4. SA SE POATA VOTA DOAR O DATA SI SA NU MAI APARA MODALUL
// 5.DUPA CE INCHIDEM MODALUL SA NU MAI APARA PANA LA URMATOAREA INTRARE IN PAGINA
// 6.DUPA CE SE INCHIDE MODALUL SA APARA PAGINA DE BUN VENIT
// DE FACUT RESPONSIVE DESIGN PENTRU MODAL SO PAGINA D EBUN VENIT
