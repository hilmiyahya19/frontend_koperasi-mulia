import Hero from "../../components/user/Hero/Hero"
// import Promo from "../../components/user/Promo/Promo"
import Product from "../../components/user/Product/Product"
import Service from "../../components/user/Service/Service"
import Article from "../../components/user/Article/Article"
import Activity from "../../components/user/Activity/Activity"
import Contact from "../../components/user/Contact/Contact"

function Home() {
  return (
    <div>
      <Hero/>
      {/* <Promo/> */}
      <Product/>
      <Service/>
      <Article/>
      <Activity/>
      <Contact/>
    </div>
  )
}

export default Home;