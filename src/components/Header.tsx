import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: 'Philosophy', id: 'philosophy' },
    { label: 'Lesson Plans', id: 'lesson-plans' },
    { label: 'Instructor', id: 'instructor' },
    { label: 'Contact', id: 'booking' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex flex-col leading-none group"
            >
              <span
                className={`font-serif font-bold text-2xl transition-colors ${
                  isScrolled ? 'text-charcoal' : 'text-white'
                }`}
              >
                Happy Piano
              </span>
              <span
                className={`text-xs tracking-wider transition-colors ${
                  isScrolled ? 'text-text-muted' : 'text-white/70'
                }`}
              >
                大人のためのピアノ教室
              </span>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                    isScrolled ? 'text-charcoal' : 'text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('booking')}
                className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-medium tracking-wide hover:bg-accent transition-all duration-300 hover:scale-105 shadow-md"
              >
                体験レッスン予約
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 transition-colors ${
                isScrolled ? 'text-charcoal' : 'text-white'
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Modal Overlay with 30% transparency */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="absolute top-20 left-0 right-0 px-6 py-8"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-lg font-medium transition-colors py-2 ${
                    isScrolled ? 'text-charcoal' : 'text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('booking')}
                className="bg-primary text-white px-6 py-3 rounded-full text-sm font-medium tracking-wide hover:bg-accent transition-all duration-300 mt-2 text-center shadow-lg"
              >
                体験レッスン予約
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
