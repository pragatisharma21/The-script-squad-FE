import Hero from "@/components/custom/Hero";
import Navbar from "@/components/custom/Navbar";

const Home = () => {
  return (
    <div>
      <section>
        <div className="mx-10 pt-6">
          <Navbar />
        </div>
        <Hero />
      </section>
    </div>
  );
};

export default Home;
