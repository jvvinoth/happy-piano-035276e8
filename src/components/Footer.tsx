import React from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';
import { siteContent } from '../lib/siteContent';

const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Studio Info */}
          <div>
            <h3 className="font-serif text-2xl font-bold text-charcoal mb-2">
              {siteContent.footer.studioName}
            </h3>
            <p className="text-sm text-text-muted mb-6">
              {siteContent.footer.tagline}
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href={siteContent.footer.social.instagram}
                className="w-10 h-10 rounded-full bg-charcoal/5 hover:bg-primary/10 flex items-center justify-center transition-colors group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
              </a>
              <a
                href={siteContent.footer.social.facebook}
                className="w-10 h-10 rounded-full bg-charcoal/5 hover:bg-primary/10 flex items-center justify-center transition-colors group"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
              </a>
              <a
                href={siteContent.footer.social.twitter}
                className="w-10 h-10 rounded-full bg-charcoal/5 hover:bg-primary/10 flex items-center justify-center transition-colors group"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-charcoal mb-6 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-sm text-charcoal" style={{ lineHeight: '1.7' }}>
                  {siteContent.footer.contact.address.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      {i < siteContent.footer.contact.address.split('\n').length - 1 && <br />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href={`tel:${siteContent.footer.contact.phone}`}
                  className="text-sm text-charcoal hover:text-primary transition-colors"
                >
                  {siteContent.footer.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href={`mailto:${siteContent.footer.contact.email}`}
                  className="text-sm text-charcoal hover:text-primary transition-colors"
                >
                  {siteContent.footer.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-semibold text-charcoal mb-6 text-sm uppercase tracking-wider">
              Hours
            </h4>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-charcoal" style={{ lineHeight: '1.7' }}>
                {siteContent.footer.contact.hours.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < siteContent.footer.contact.hours.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-text-muted text-center">
            {siteContent.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
