import AnoAI from "../components/ui/animated-shader-background";

const DemoOne = () => {
  return (
    <div className="w-full h-screen bg-black">
      <AnoAI/>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <h1 className="text-4xl font-bold">VeritasID</h1>
        <p className="mt-4 text-xl">Animated Shader Background Demo</p>
      </div>
    </div>
  );
};

export { DemoOne };