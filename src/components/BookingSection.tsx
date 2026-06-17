import React, { useEffect, useRef } from 'react';
import { MessageCircle, Mail, Phone } from 'lucide-react';
import { siteContent } from '../lib/siteContent';

const BookingSection: React.FC = () => {
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
      { threshold: 0.3 }
    );

    const elements = sectionRef.current?.querySelectorAll('[data-reveal]');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleWhatsApp = () => {
    const message = encodeURIComponent('体験レッスンについて問い合わせをしたいです。');
    window.open(`https://wa.me/${siteContent.booking.whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <section
      id="booking"
      ref={sectionRef}
      className="bg-surface py-20 md:py-32"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        {/* Section Header */}
        <div className="mb-12" data-reveal>
          <div className="text-sm uppercase tracking-widest text-primary font-medium mb-3">
            {siteContent.booking.overline}
          </div>
          <h2
            className="font-serif text-4xl md:text-6xl font-semibold text-charcoal mb-6"
            style={{ letterSpacing: '-0.02em', lineHeight: '1.1' }}
          >
            {siteContent.booking.heading.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < siteContent.booking.heading.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>
          <p
            className="text-base md:text-lg text-charcoal max-w-2xl mx-auto mb-4"
            style={{ lineHeight: '1.8' }}
          >
            {siteContent.booking.description.split('\n').map((line, i) => (
              <React.Fragment key={i}>
                {line}
                {i < siteContent.booking.description.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
          <p className="text-sm text-text-muted">
            {siteContent.booking.note}
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12" data-reveal style={{ transitionDelay: '0.1s' }}>
          {/* WhatsApp */}
          <button
            onClick={handleWhatsApp}
            className="bg-white p-6 rounded-2xl border border-border hover:border-primary hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
              <MessageCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-charcoal mb-1">WhatsApp</h3>
            <p className="text-sm text-text-muted">チャットで予約</p>
          </button>

          {/* Phone */}
          <a
            href={`tel:${siteContent.footer.contact.phone}`}
            className="bg-white p-6 rounded-2xl border border-border hover:border-primary hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-charcoal mb-1">お電話</h3>
            <p className="text-sm text-text-muted">{siteContent.footer.contact.phone}</p>
          </a>

          {/* Email */}
          <a
            href={`mailto:${siteContent.footer.contact.email}`}
            className="bg-white p-6 rounded-2xl border border-border hover:border-primary hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold text-charcoal mb-1">メール</h3>
            <p className="text-sm text-text-muted">お問い合わせ</p>
          </a>
        </div>

        {/* Primary CTA */}
        <div data-reveal style={{ transitionDelay: '0.2s' }}>
          <button
            onClick={handleWhatsApp}
            className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-full font-medium text-base shadow-lg hover:bg-accent hover:shadow-xl transition-all duration-300 hover:scale-105"
            style={{ letterSpacing: '0.5px' }}
          >
            <MessageCircle className="w-5 h-5" />
            {siteContent.booking.cta}
          </button>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
