const advs = [
    { id: 1, src: "adv/4.webp", alt: "تبلیغات",url:"" },
    { id: 2, src: "adv/3.gif", alt: "تبلیغات", url:""},
    { id: 3, src: "adv/2.webp", alt: "تبلیغات",url:""},
    { id: 4, src: "adv/1.webp", alt: "تبلیغات", url:""},
  ];

export default function AdvFour() {
    return(
        <div className="max-w-screen-xl my-8 flex  mx-auto w-full">
            <div className="lg:flex justify-center items-center gap-4 grid grid-cols-2 lg:px-0 px-2">
                {advs.map((item, index) => (
                    <div className="lg:w-1/4" key={index}>
                        <img className="rounded-2xl w-full"  src={item.src} alt={item.alt} />
                    </div>
                ))}
            </div>
        </div>
    )
}