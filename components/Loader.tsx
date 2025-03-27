
const Loader: React.FC = () => {
  return (
    <svg className="w-24 h-24" viewBox="0 0 240 240">
      <circle
        className="animate-ringA stroke-red-600"
        cx="120"
        cy="120"
        r="105"
        fill="none"
        strokeWidth="20"
        strokeDasharray="0 660"
        strokeDashoffset="-330"
        strokeLinecap="round"
      />
      <circle
        className="animate-ringB stroke-orange-500"
        cx="120"
        cy="120"
        r="35"
        fill="none"
        strokeWidth="20"
        strokeDasharray="0 220"
        strokeDashoffset="-110"
        strokeLinecap="round"
      />
      <circle
        className="animate-ringC stroke-blue-600"
        cx="85"
        cy="120"
        r="70"
        fill="none"
        strokeWidth="20"
        strokeDasharray="0 440"
        strokeLinecap="round"
      />
      <circle
        className="animate-ringD stroke-pink-600"
        cx="155"
        cy="120"
        r="70"
        fill="none"
        strokeWidth="20"
        strokeDasharray="0 440"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default Loader;