// import React from "react";

export default function SliderItem({  src , alt , url }) {


//   useEffect(() => {
//     const getDeeplink = async () => {
//       try {
//         let modifiedUrl = url;
//         if (modifiedUrl.startsWith("app://afarinak.com/")) {
//             modifiedUrl = modifiedUrl.replace("app://afarinak.com/", "");
//         }
//         const data = await fetchDeepLink(modifiedUrl);
//         setDeeplink(data.results || []);
//       } catch (err) {
//         console.error(err);
//       }
//     };
//     getDeeplink();
//   }, []);

//   const handleClick = () => {
//     navigate(`/detail/${url}`);
//   };

  return (
    <div
      aria-label={`selected-${alt}`}
    //   onClick={handleClick}
      className="flex flex-col h-auto justify-start items-start gap-3 cursor-pointer  relative focus:outline-none w-full h-[32vw] transition-transform duration-200"
    >
      <a href={url} className="decoration-0 w-full">
        <img
          className="w-full h-full object-cover"
          src={src}
          alt={alt}
        />
      </a>
    </div>
  );
}
