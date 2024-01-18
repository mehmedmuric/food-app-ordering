import Header from "./components/Header/Header.js";
import Hero from "./components/Hero/Hero.js";
import HomeMenu from "./components/HomeMenu/HomeMenu.js";
import SectionHeaders from "./components/SectionHeader/SectionHeaders.js";

export default function Home() {
  return (
    <>
     <Header />
     <Hero/>
     <HomeMenu/>
     <section className="my-16 text-center">
        <SectionHeaders subHeader={'Our Story'} mainHeader={'About Us'}/>
        <div className="text-gray-500 max-w-2xl mx-auto mt-4 flex flex-col gap-4">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
        </div>
     </section>
     <section className="text-center my-8">
      <SectionHeaders subHeader={"Mehmed Muric"} mainHeader={'Contact Us'}/>
      <div className="mt-6">
        <a className="text-4xl underline text-gray-500" href="tel:+381621753220">+381 62 175 3220</a>
      </div>
     </section>
     <footer className="border-t p-8 text-center text-gray-500 font-semibold">
        &copy; 2024 All rights reserved Mehmed Muric
     </footer>
    </>
  )
}
