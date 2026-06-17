import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';
import { siteContent } from '../lib/siteContent';

const LessonPlansSection: React.FC = () => {
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
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('[data-reveal]');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="lesson-plans"
      ref={sectionRef}
      className="bg-background py-20 md:py-32"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="text-center mb-16" data-reveal>
          <div className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
            {siteContent.lessonPlans.overline}
          </div>
          <h2
            className="font-serif text-4xl md:text-6xl font-semibold text-charcoal mb-4"
            style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}
          >
            {siteContent.lessonPlans.heading}
          </h2>
          <p className="text-base md:text-lg text-text-muted max-w-2xl mx-auto">
            {siteContent.lessonPlans.subtext}
          </p>
        </div>

        {/* Lesson Plan Cards */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {siteContent.lessonPlans.plans.map((plan, index) => (
            <div
              key={index}
              data-reveal
              style={{ transitionDelay: `${index * 0.1}s` }}
              className={`bg-surface rounded-2xl p-8 md:p-10 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 relative ${
                plan.featured ? 'ring-2 ring-primary' : ''
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-medium tracking-wider">
                  人気
                </div>
              )}

              {/* Card Header */}
              <div className="mb-6">
                <h3 className="font-serif text-2xl md:text-3xl font-semibold text-charcoal mb-2"
                    style={{ lineHeight: '1.3' }}>
                  {plan.name}
                </h3>
                <p className="text-sm text-text-muted tracking-wider mb-4">
                  {plan.subtitle}
                </p>
                <p className="text-base text-charcoal mb-6" style={{ lineHeight: '1.7' }}>
                  {plan.description}
                </p>
              </div>

              {/* Duration & Price */}
              <div className="mb-6 pb-6 border-b border-border">
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm text-text-muted">{plan.duration}</span>
                </div>
                <div className="text-3xl font-bold text-primary">
                  {plan.price}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-primary" strokeWidth={3} />
                    </div>
                    <span className="text-sm text-charcoal" style={{ lineHeight: '1.6' }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LessonPlansSection;
