import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Countdown from '../components/Countdown';
import About from '../components/About';
import Heritage from '../components/Heritage';
import Events from '../components/Events';
import Gallery from '../components/Gallery';
import Luminaries from '../components/Luminaries';
import Committee from '../components/Committee';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <Hero />
        <Countdown />
        <About />
        <Heritage />
        <Events />
        <Gallery />
        <Luminaries />
        <Committee />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
