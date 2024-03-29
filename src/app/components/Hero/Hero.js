import Image from "next/image";
import Right from "../icons/Right";

export default function Hero() {
    return(
        <section className="hero mt-8">
          <div className="py-8">
            <h1 className="text-4xl font-semibold leading-normal">Everything <br/> is better <br/> with a&nbsp; <span className="text-primary">Pizza</span></h1>
            <p className="my-4 text-gray-500">
              Pizza is the missing piece that makes every day
              complete, a simple yet delicious joy in life.
            </p>
            <div className="flex gap-4 text-sm">
              <button className="bg-primary flex gap-2 items-center rounded-full px-4 py-2 text-white font-semibold">Order Now <Right/></button>
              <button className="flex gap-2 border-0 items-center py-2 text-gray-600 font-semibold">Learn More <Right/></button>
            </div>
          </div>
          <div className="relative">
            <Image src={'/pizza.png'} alt="pizza" objectFit={'contain'} layout={'fill'}/>
          </div>
        </section>
    )
}