import React, { useEffect, useRef } from 'react';
import { siteContent } from '../lib/siteContent';

const InstructorSection: React.FC = () => {
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
      id="instructor"
      ref={sectionRef}
      className="bg-background py-20 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-16" data-reveal>
          <div className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
            {siteContent.instructor.overline}
          </div>
          <h2
            className="font-serif text-4xl md:text-6xl font-semibold text-charcoal max-w-3xl"
            style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}
          >
            {siteContent.instructor.heading.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < siteContent.instructor.heading.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
        </div>

        {/* Instructor Profile */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left - Photo */}
          <div data-reveal style={{ transitionDelay: '0.1s' }}>
            <div className="relative">
              <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={siteContent.instructor.image}
                  alt={siteContent.instructor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative accent */}
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-2xl -z-10"></div>
            </div>
          </div>

          {/* Right - Bio */}
          <div className="space-y-8" data-reveal style={{ transitionDelay: '0.25s' }}>
            {/* Name */}
            <div>
              <h3 className="font-serif text-3xl md:text-4xl font-semibold text-charcoal mb-2">
                <span className="text-primary">{siteContent.instructor.name}</span>
              </h3>
              <p className="text-base text-text-muted tracking-wider">
                {siteContent.instructor.nameEn}
              </p>
            </div>

            {/* Credentials */}
            <div className="bg-surface p-6 rounded-2xl border border-border">
              <ul className="space-y-3">
                {siteContent.instructor.credentials.map((credential, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-charcoal"
                    style={{ lineHeight: '1.6' }}
                  >
                    <span className="text-primary mt-1">•</span>
                    <span>{credential}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bio */}
            <div className="space-y-4">
              {siteContent.instructor.bio.split('\n\n').map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base text-charcoal"
                  style={{ lineHeight: '1.8' }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructorSection;
