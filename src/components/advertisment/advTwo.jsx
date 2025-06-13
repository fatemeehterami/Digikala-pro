const advs = [
    { id: 1, src: "adv/5.webp", alt: "تبلیغات",url:""},
    { id: 2, src: "adv/6.webp", alt: "تبلیغات", url:""},
  ];

export default function AdvTwo() {
    return(
        <div className="max-w-screen-xl my-8 flex mx-auto w-full">
            <div className="lg:flex justify-center items-center gap-4 grid grid-cols-1 px-2 lg:px-0 w-full">
                {advs.map((item, index) => (
                    <div className="lg:w-2/4" key={index}>
                        <img className="rounded-2xl w-full"  src={item.src} alt={item.alt} />
                    </div>
                ))}
            </div>
        </div>
    )
}