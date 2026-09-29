import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Interlude from './components/Interlude';
import FieldReport from './components/FieldReport';
import Skills from './components/Skills';
import Credentials from './components/Credentials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import useScrollEffects from './hooks/useScrollEffects';

function App() {
  useScrollEffects();

  return (
    <>
      <div className="scroll-progress" aria-hidden="true" />
      <Navbar />
      <Hero />
      {/* Everything after the hero slides up over it while it stays pinned. */}
      <main className="page">
        <About />
        <Projects />
        <Interlude />
        <FieldReport />
        <Skills />
        <Credentials />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
