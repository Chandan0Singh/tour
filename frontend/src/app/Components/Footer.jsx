import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { ArrowRight, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    const whatsappNumber = "9190450 89285";
  return (
    <footer className="tour-footer">
      <section className="tour-footer__cta">
        <div className="tour-container tour-footer__cta-inner">
          <div>
            <h2>Ready for Your Next Adventure?</h2>
            <p>Let&apos;s plan your perfect trip to the Himalayas.</p>
          </div>
          <div className="tour-footer__actions">
            <Link href="/tours" className="tour-button tour-button--green">
              Book Your Trip Now <ArrowRight size={15} />
            </Link>
            <a href={`https://wa.me/${whatsappNumber}?text=Hi`} className="tour-button tour-button--light">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
      <div className="tour-footer__main">
        <div className="tour-container tour-footer__grid">
          <div className="tour-footer__brand">
            <h2>TourTrek</h2>
            <p>
              Explore. Experience. Evolve.
              <br />
              Curated treks, tours and adventure experiences in Uttarakhand.
            </p>
            <div className="tour-footer__social">
              <a href="https://www.facebook.com/share/1Esk7VdqGN/" aria-label="Facebook">
                <FaFacebookF size={13} />
              </a>
              <a href="https://www.instagram.com/laviadventure?igsi=cTMwOG9iNDZncnpx" aria-label="Instagram">
                <FaInstagram size={13} />
              </a>
              <a href="https://youtube.com/@jaynegi0311?si=-Jm2jVmTIiNXU5du" aria-label="YouTube">
                <FaYoutube size={13} />
              </a>
            </div>
          </div>
          <div>
            <h3>Quick Links</h3>
            <Link href="/">Home</Link>
            <Link href="/treks">Treks</Link>
            <Link href="/tours">Tours</Link>
            <Link href="/camping">Camping</Link>
            <Link href="/blogs">Blogs</Link>
          </div>
          <div>
            <h3>Popular Treks</h3>
            <Link href="#">Kedarkantha Trek</Link>
            <Link href="#">Valley of Flowers</Link>
            <Link href="#">Roopkund Trek</Link>
            <Link href="#">Har Ki Dun Trek</Link>
            <Link href="#">Kuari Pass Trek</Link>
          </div>
          <div>
            <h3>Support</h3>
            <p>
              <Phone size={12} /> +91 12345 67890
            </p>
            <p>
              <Mail size={12} /> code.chandansingh@gamil.com
            </p>
            <p>
              <MapPin size={12} /> Dehradun, Uttarakhand
            </p>
            <Link href="/contact">Contact Us</Link>
          </div>
          <div>
            <h3>Company</h3>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="#">Terms & Conditions</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Refund Policy</Link>
          </div>
        </div>
        <div className="tour-container tour-footer__bottom">
          © {new Date().getFullYear()} TourTrek. All Rights Reserved.
          <span>Made for mountain memories.</span>
        </div>
      </div>
    </footer>
  );
}