import React, { useEffect, useRef } from 'react';
import { siteContent } from '../lib/siteContent';

const PhilosophySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-reveal');
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = sectionRef.current?.querySelectorAll('[data-reveal]');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="bg-surface py-20 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16" data-reveal>
          <div className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
            {siteContent.philosophy.overline}
          </div>
          <h2
            className="font-serif text-4xl md:text-6xl font-semibold text-charcoal mb-4"
            style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}
          >
            {siteContent.philosophy.heading}
          </h2>
          <div className="w-16 h-1 bg-primary mt-4"></div>
        </div>

        {/* Two-column Grid */}
        <div className="grid md:grid-cols-5 gap-12 items-start">
          {/* Left Column - Main Content */}
          <div className="md:col-span-3 space-y-6" data-reveal style={{ transitionDelay: '0.1s' }}>
            {siteContent.philosophy.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-base md:text-lg text-charcoal"
                style={{ lineHeight: '1.8' }}
              >
                {paragraph.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < paragraph.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </p>
            ))}
          </div>

          {/* Right Column - Pull Quote */}
          <div className="md:col-span-2" data-reveal style={{ transitionDelay: '0.25s' }}>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
              <div className="w-12 h-1 bg-primary mb-6"></div>
              <blockquote className="font-serif italic text-2xl text-charcoal mb-4"
                          style={{ lineHeight: '1.5' }}>
                {siteContent.philosophy.pullQuote.text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < siteContent.philosophy.pullQuote.text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </blockquote>
              <p className="text-sm text-text-muted font-medium">
                {siteContent.philosophy.pullQuote.attribution}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhilosophySection;
