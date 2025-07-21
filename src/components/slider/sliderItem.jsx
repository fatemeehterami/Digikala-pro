import { useNavigate } from 'react-router-dom';
export default function SliderItem({  src , alt , name }) {
  const navigate = useNavigate();
  return (
    <div
      aria-label={`selected-${alt}`}
      className="flex flex-col h-auto lg:rounded-none px-1 lg:px-0 rounded-2xl justify-start items-start gap-3 cursor-pointer  relative focus:outline-none w-full transition-transform duration-200"
    >
      <a className="decoration-0 w-full "
      onClick={() => {
        navigate(`/search/${encodeURIComponent(name)}`);
     }}>
        <img
          className="w-full lg:h-full h-[200px] object-cover lg:rounded-none rounded-2xl"
          src={src}
          alt={alt}
        />
      </a>
    </div>
  );
}
