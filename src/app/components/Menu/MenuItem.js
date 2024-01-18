export default function MenuItem() {
    return (
        <div className="bg-gray-300 text-center p-4 rounded-lg mt-10 hover:shadow-black/50 hover:shadow-md hover:bg-white transition-all group ">
            <div className="text-center">
                <img src="/pizza.png" alt="pizza" className="max-h-auto max-h-24 block mx-auto"/>
            </div>
            <h4 className="font-semibold my-2 text-xl">Pepperoni Pizza</h4>
            <p className="text-gray-500 text-sm">lorem ipsum dolor amet sit, consectetur elit</p>
            <button className="bg-primary rounded-full mt-4 px-6 py-2 text-white font-semibold">Add To Cart $12</button>
        </div>
    );
}