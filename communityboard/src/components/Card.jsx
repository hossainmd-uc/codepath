
const Card = (props) => {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 w-64 flex flex-col items-center space-y-3">
        <img className={props.class || "w-32 h-32"} src={props.src} alt="logo" />
        <h3 className="text-lg font-semibold">React</h3>
        <h4 className="text-gray-600">{props.diff}</h4>
        <a href={props.href} target="_blank" rel="noopener noreferrer">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
            View
          </button>
        </a>
      </div>
    );
  };

export default Card;