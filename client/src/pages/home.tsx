import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Menu,
  X,
  ArrowRight,
  Quote,
  Users,
} from "lucide-react";

import oxfordSkylineImg from "@assets/Website Hero Image_1757322430079.jpg";
import benSchubertImg from "@/assets/ben-schubert.jpg";
import kittyMcWilliamImg from "@/assets/kitty-mcwilliam.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector("nav");
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add("backdrop-blur-md");
        } else {
          navbar.classList.remove("backdrop-blur-md");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased decorative-pattern">

      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-border z-50">
        <div className="w-full px-0">
          <div className="flex justify-between items-center py-4">
            <div className="flex-shrink-0 pl-2">
              <h1 className="text-lg font-semibold text-primary text-left">
                The Oxford Coaching Partnership
              </h1>
            </div>

            <div className="hidden md:flex space-x-8">
              <button onClick={() => scrollToSection("about")} className="hover:text-primary">
                About
              </button>
              <button onClick={() => scrollToSection("services")} className="hover:text-primary">
                Services
              </button>
              <button onClick={() => scrollToSection("testimonials")} className="hover:text-primary">
                Testimonials
              </button>
              <button onClick={() => scrollToSection("contact")} className="hover:text-primary">
                Contact
              </button>
            </div>

            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                <button onClick={() => scrollToSection("about")} className="py-2 text-left">
                  About
                </button>
                <button onClick={() => scrollToSection("services")} className="py-2 text-left">
                  Services
                </button>
                <button onClick={() => scrollToSection("testimonials")} className="py-2 text-left">
                  Testimonials
                </button>
                <button onClick={() => scrollToSection("contact")} className="py-2 text-left">
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[420px] md:h-[550px] lg:h-[600px] flex items-center justify-center text-center -mt-20">
        <div
          className="absolute inset-0 bg-contain bg-center bg-no-repeat border-b-4 border-amber-500"
          style={{ backgroundImage: `url(${oxfordSkylineImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">
            The Oxford <span className="text-white">Coaching</span> Partnership
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
            EMPOWERING PEOPLE TO LEAD WITH CLARITY, CONFIDENCE, AND PURPOSE.
          </p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="pt-2 pb-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">Who We Are</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are a team that specialises in coaching, mentoring, and organisational development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto mt-16 px-4">
          <Card className="hover:shadow-lg">
            <CardContent className="p-8">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-accent">
                <img src={benSchubertImg} alt="Ben Schubert" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-primary mb-4 text-center">
                Dr Ben Schubert
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I believe everyone deserves to be successful and fulfilled in their work...
              </p>
              <div className="text-center">
                <button className="text-primary inline-flex items-center gap-1">
                  See the full coaching profile <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg">
            <CardContent className="p-8">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-accent">
                <img src={kittyMcWilliamImg} alt="Kitty McWilliam" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-serif font-semibold text-primary mb-4 text-center">
                Kitty McWilliam
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                I combine experience from diverse sectors, including healthcare and global business...
              </p>
              <div className="text-center">
                <button className="text-primary inline-flex items-center gap-1">
                  See the full coaching profile <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 bg-cream-blue">
        <div className="max-w-6xl mx-auto px-4">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6">What We Offer</h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive coaching solutions tailored to your leadership journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">

            <Card className="hover:shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Users className="text-primary w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
                  Executive Coaching
                </h3>
                <p className="text-muted-foreground">
                  We offer online and in-person coaching for leaders navigating complex challenges.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-secondary" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L5 8.3V13h2V9.6l1.8-.7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
                  Walking Coaching
                </h3>
                <p className="text-muted-foreground">
                  Some people think better when walking — we coach while moving together.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
                  Training & Facilitation
                </h3>
                <p className="text-muted-foreground">
                  Workshops and programmes tailored to organisations’ needs.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-semibold text-primary mb-4">
                  Interview Coaching
                </h3>
                <p className="text-muted-foreground">
                  Guidance for job applications, CVs, and interview preparation.
                </p>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20">
        <div className="max-w-6xl mx-auto px-4">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-6">What Our Clients Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Transformative coaching experiences that drive real results
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>

                <CarouselItem>
                  <Card>
                    <CardContent className="p-8">
                      <Quote className="text-secondary w-8 h-8 mb-4" />
                      <p className="italic text-muted-foreground mb-6">
                        "They supported me through a tough job search..."
                      </p>
                      <div className="text-center">
                        <p className="font-semibold">L&D Manager</p>
                        <p className="text-sm text-muted-foreground">Football Association</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                <CarouselItem>
                  <Card>
                    <CardContent className="p-8">
                      <Quote className="text-secondary w-8 h-8 mb-4" />
                      <p className="italic text-muted-foreground mb-6">
                        "The coaching gave me the chance to step back..."
                      </p>
                      <div className="text-center">
                        <p className="font-semibold">Global Leader</p>
                        <p className="text-sm text-muted-foreground">Deloitte</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                <CarouselItem>
                  <Card>
                    <CardContent className="p-8">
                      <Quote className="text-secondary w-8 h-8 mb-4" />
                      <p className="italic text-muted-foreground mb-6">
                        "What stood out was the ability to cut through complex challenges..."
                      </p>
                      <div className="text-center">
                        <p className="font-semibold">CEO</p>
                        <p className="text-sm text-muted-foreground">UK Startup</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

                <CarouselItem>
                  <Card>
                    <CardContent className="p-8">
                      <Quote className="text-secondary w-8 h-8 mb-4" />
                      <p className="italic text-muted-foreground mb-6">
                        "The workshop design felt bespoke to our needs..."
                      </p>
                      <div className="text-center">
                        <p className="font-semibold">Head of Department</p>
                        <p className="text-sm text-muted-foreground">University of Oxford</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>

              </CarouselContent>

              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </section>

      {/* HOW TO WORK WITH US */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold mb-6">How to Work With Us</h2>
          <p className="text-xl mb-8">
            Contact Ben or Kitty to arrange a free discovery session.
          </p>
        </div>
      </section>

      {/* FOOTER PLACEHOLDER */}
      <footer id="contact" className="py-16 bg-muted/30 border-t border-border">
        {/* Add footer content later */}
      </footer>
    </div>
  );
}
