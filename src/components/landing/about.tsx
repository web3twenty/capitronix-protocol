import Image from "next/image";

export default function About() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 max-w-6xl mx-auto p-10">
      <div className="border-2 rounded-lg border-white p-[.5px] overflow-hidden">
        <Image
          src="/landing-about.jpg"
          alt="About"
          width={500}
          height={200}
          className="w-full rounded-lg h-70"
        />
      </div>
      <div className="p-10">
        <h2 className="text-[#11B97E] text-md font-bold">About Web3Twenty</h2>
        <p className="text-white font-bold text-3xl">
          Building the infrastructure
        </p>
        <p className="text-[#CFCFCF] mt-3">
          Building the infrastructure for the next generation of Web3
          applications on Binance Smart Chain, combining cutting-edge blockchain
          technology with user-friendly solutions.
        </p>
      </div>
    </div>
  );
}
