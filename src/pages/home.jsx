import Slider from "../components/slider/slider";
import { useEffect,useState } from "react";
import { fetchHomeItem } from "../services/home";
import Box from "../components/boxes/box";
import HomeRowSections from "../components/rows/row";
import BrandBox from "../components/homeSilder/brandBox";
import AdvFour from "../components/advertisment/advFour";
import AdvTwo from "../components/advertisment/advTwo";

export default function Home() {
  const [boxRow ,setboxRow] =useState([])
  const [boxCol ,setboxCol] =useState([])
  const [homes, setHomes] = useState([]);

  useEffect(() => {
    const getHomeItem = async () => {
        try {
          const data = await fetchHomeItem();
          setboxRow(data.result?.trending)
          setboxCol(data.result?.selling_and_sales)
          const sections = [
            data.result?.home_1,
            data.result?.home_2,
            data.result?.home_3,
            data.result?.home_4,
            data.result?.home_5,
            data.result?.home_6,
            data.result?.home_7,
            data.result?.home_8,
          ].filter(Boolean);
  
          setHomes(sections);
        } catch (err) {
            console.error(err)
        }
    }
    getHomeItem()
}, [])
  return (
    <>
      <Slider />
      <AdvFour/>
      <BrandBox/>
      <AdvTwo/>
      {homes.length >= 4 && (
        <HomeRowSections sections={homes.slice(0, 4)} />
      )}
      {boxCol?.products && (
        <Box title={boxCol?.title} icon="discount" data={boxCol?.products}  direction="col"/>
      )}
      {homes.length >= 8 && (
        <HomeRowSections sections={homes.slice(4, 8)} />
      )}
      {boxRow?.products && (
        <Box title={boxRow?.title} icon="searchTrend" data={boxRow?.products}  direction="row"/>
      )}
    </>
  );
}

