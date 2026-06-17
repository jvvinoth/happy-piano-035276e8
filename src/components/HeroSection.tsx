import React, { useEffect, useRef } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { siteContent } from '../lib/siteContent';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('philosophy');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      const offset = 80;
      const elementPosition = bookingSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div
        ref={heroRef}
        className="absolute inset-0 bg-cover will-change-transform bg-[65%_center] md:bg-[30%_center]"
        style={{
          backgroundImage: `url(${siteContent.hero.backgroundImage})`,
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(42,42,42,0.6) 0%, rgba(42,42,42,0.2) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 w-full">
        <div className="max-w-3xl animate-fade-in">
          {/* Overline Badge */}
          <div className="inline-block px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white/90 text-sm font-medium mb-6">
            {siteContent.hero.overlineBadge}
          </div>

          {/* Headline */}
          <h1 className="font-serif text-6xl md:text-8xl font-bold text-white mb-6"
              style={{ letterSpacing: '-0.03em', lineHeight: '1.05' }}>
            {siteContent.hero.headline}
          </h1>

          {/* Subtext */}
          <p className="text-lg md:text-xl text-white/80 max-w-xl mb-10"
             style={{ lineHeight: '1.7' }}>
            {siteContent.hero.subtext.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < siteContent.hero.subtext.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>

          {/* CTA Button */}
          <button
            onClick={scrollToBooking}
            className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-full font-medium text-base shadow-lg hover:bg-accent hover:shadow-xl transition-all duration-300 hover:scale-105"
            style={{ letterSpacing: '0.5px' }}
          >
            {siteContent.hero.cta}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors cursor-pointer group"
        aria-label="Scroll down"
      >
        <span className="text-sm tracking-wider">{siteContent.hero.scrollText}</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  );
};

export default HeroSection;
