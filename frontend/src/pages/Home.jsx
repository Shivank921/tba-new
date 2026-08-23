import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Countdown from '../components/Countdown';
import About from '../components/About';
import Pillars from '../components/Pillars';
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
        <Pillars />
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
