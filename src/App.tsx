import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PhilosophySection from './components/PhilosophySection';
import LessonPlansSection from './components/LessonPlansSection';
import InstructorSection from './components/InstructorSection';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PhilosophySection />
        <LessonPlansSection />
        <InstructorSection />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
