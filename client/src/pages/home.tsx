import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { Menu, X, ArrowRight, Quote, Users, MapPin, Phone, Mail, Linkedin, Twitter } from "lucide-react";
import oxfordSkylineImg from "@/assets/oxford-skyline-hero.jpg";
import benSchubertImg from "@/assets/ben-schubert.jpg";
import kittyMcWilliamImg from "@/assets/kitty-mcwilliam.jpg";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z.string().min(10, "Please provide more details about your coaching needs"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('nav');
      if (navbar) {
        if (window.scrollY > 50) {
          navbar.classList.add('backdrop-blur-md');
        } else {
          navbar.classList.remove('backdrop-blur-md');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased decorative-pattern">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-border z-50">
        <div className="w-full px-0">
          <div className="flex justify-between items-center py-4">
            <div className="flex-shrink-0 pl-2">
              <h1 className="text-lg font-semibold text-primary text-left" style={{ fontFamily: 'Montserrat, sans-serif' }}>The Oxford Coaching Partnership</h1>
            </div>
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="nav-about"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')} 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="nav-services"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')} 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="nav-testimonials"
              >
                Testimonials
              </button>
              <button 
                onClick={() => scrollToSection('contact')} 
                className="text-foreground hover:text-primary transition-colors"
                data-testid="nav-contact"
              >
                Contact
              </button>
            </div>
            <button 
              className="md:hidden p-2" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X className="text-primary" /> : <Menu className="text-primary" />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={() => scrollToSection('about')} 
                  className="text-left text-foreground hover:text-primary transition-colors py-2"
                  data-testid="nav-mobile-about"
                >
                  About
                </button>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="text-left text-foreground hover:text-primary transition-colors py-2"
                  data-testid="nav-mobile-services"
                >
                  Services
                </button>
                <button 
                  onClick={() => scrollToSection('testimonials')} 
                  className="text-left text-foreground hover:text-primary transition-colors py-2"
                  data-testid="nav-mobile-testimonials"
                >
                  Testimonials
                </button>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-left text-foreground hover:text-primary transition-colors py-2"
                  data-testid="nav-mobile-contact"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Banner */}
      <section className="relative h-[420px] md:h-[550px] lg:h-[600px] flex items-center justify-center text-center -mt-20 bg-background">
        <div 
          className="absolute inset-0 bg-contain bg-center bg-no-repeat border-b-4 border-amber-500" 
          style={{
            backgroundImage: `url(${oxfordSkylineImg})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent from-80% via-background/5 via-92% via-background/20 via-96% to-background"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-100/30 via-blue-50/50 to-white"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 text-balance text-center" data-testid="text-hero-title">
            The Oxford <span className="text-white">Coaching</span> Partnership
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-tagline">
            EMPOWERING PEOPLE TO LEAD WITH CLARITY, CONFIDENCE, AND PURPOSE.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section id="about" className="pt-2 pb-20 bg-background fleur-pattern-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block border-2 border-light-gold px-8 py-4 mb-6">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary m-0" data-testid="text-about-title">Who We Are</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-about-description">
              We are a team that specialises in coaching, mentoring, and organisational development.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* Dr Ben Schubert */}
            <Card className="hover:shadow-lg transition-shadow" data-testid="card-coach-ben">
              <CardContent className="p-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-muted border-4 border-accent">
                  <img 
                    src={benSchubertImg} 
                    alt="Dr Ben Schubert" 
                    className="w-full h-full object-cover"
                    data-testid="img-coach-ben"
                  />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-primary mb-4 text-center" data-testid="text-coach-ben-name">
                  Dr Ben Schubert
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6" data-testid="text-coach-ben-bio">
                  I believe everyone deserves to be successful and fulfilled in their work. I work with leaders at pivotal moments in their professional lives, whether they are navigating career transitions, managing complex organisational challenges, or seeking alignment between their career and personal life. Through coaching, I help my clients unlock clarity, resilience, and direction.
                </p>
                <div className="text-center">
                  <button className="text-primary hover:text-secondary font-medium transition-colors border-b border-transparent hover:border-primary inline-flex items-center gap-1" data-testid="button-ben-profile">
                    See the full coaching profile here <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
            
            {/* Kitty McWilliam */}
            <Card className="hover:shadow-lg transition-shadow" data-testid="card-coach-kitty">
              <CardContent className="p-8">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-muted border-4 border-accent">
                  <img 
                    src={kittyMcWilliamImg} 
                    alt="Kitty McWilliam" 
                    className="w-full h-full object-cover object-[center_90%]"
                    data-testid="img-coach-kitty"
                  />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-primary mb-4 text-center" data-testid="text-coach-kitty-name">
                  Kitty McWilliam
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6" data-testid="text-coach-kitty-bio">
                  I combine experience from diverse sectors, including higher education, healthcare, and global business, with a passion for enabling people to flourish. I believe that when people feel supported and empowered, they not only grow as individuals but also strengthen the teams and organisations around them.
                </p>
                <div className="text-center">
                  <button className="text-primary hover:text-secondary font-medium transition-colors border-b border-transparent hover:border-primary inline-flex items-center gap-1" data-testid="button-kitty-profile">
                    See the full coaching profile here <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section id="services" className="py-20 bg-cream-blue services-pattern">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block border-2 border-light-gold px-8 py-4 mb-6">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary m-0" data-testid="text-services-title">What We Offer</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-services-description">
              Comprehensive coaching solutions tailored to your leadership journey
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {/* Executive Coaching */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1" data-testid="card-service-executive">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <Users className="text-2xl text-primary w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-semibold text-primary mb-4" data-testid="text-service-executive-title">
                  Executive Coaching
                </h3>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-service-executive-description">
                  We offer online as well as in-person coaching for executives at all levels to help them master the challenges in their professional personal lives.
                </p>
              </CardContent>
            </Card>
            
            {/* Walking Coaching */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1" data-testid="card-service-walking">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-secondary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1L5 8.3V13h2V9.6l1.8-.7"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-semibold text-primary mb-4" data-testid="text-service-walking-title">
                  Walking Coaching
                </h3>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-service-walking-description">
                  Some people think better when they are walking and talking. There is something to be said about moving together in the same direction.
                </p>
              </CardContent>
            </Card>
            
            {/* Training and Facilitation */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1" data-testid="card-service-training">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-semibold text-primary mb-4" data-testid="text-service-training-title">
                  Training and Facilitation
                </h3>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-service-training-description">
                  We design and deliver workshops and programmes tailored to the needs of organisations, teams, and individuals.
                </p>
              </CardContent>
            </Card>
            
            {/* Interview Coaching */}
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1" data-testid="card-service-interview">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-serif font-semibold text-primary mb-4" data-testid="text-service-interview-title">
                  Interview Coaching
                </h3>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-service-interview-description">
                  We offer expert coaching to support every step of your job application journey, from writing applications to interview preparation. Through tailored feedback and a clear development plan, we help you build confidence, improve performance, and close the gap between where you are now and where you want to be.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-background testimonials-pattern">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block border-2 border-light-gold px-8 py-4 mb-6">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary m-0" data-testid="text-testimonials-title">What Our Clients Say</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-testimonials-description">
              Transformative coaching experiences that drive real results
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {/* Testimonial 1 */}
                <CarouselItem>
                  <Card data-testid="card-testimonial-1">
                    <CardContent className="p-8">
                      <div className="mb-6">
                        <Quote className="text-3xl text-secondary mb-4 w-8 h-8" />
                        <p className="text-muted-foreground leading-relaxed italic text-lg" data-testid="text-testimonial-1-quote">
                          "They supported me through a tough job search, helping me clarify career goals, explore options, and gain insights. The flexibility and guidance were invaluable. I would certainly recommend."
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-foreground" data-testid="text-testimonial-1-name">L&D Manager</p>
                        <p className="text-sm text-muted-foreground" data-testid="text-testimonial-1-title">Football Association</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
                
                {/* Testimonial 2 */}
                <CarouselItem>
                  <Card data-testid="card-testimonial-2">
                    <CardContent className="p-8">
                      <div className="mb-6">
                        <Quote className="text-3xl text-secondary mb-4 w-8 h-8" />
                        <p className="text-muted-foreground leading-relaxed italic text-lg" data-testid="text-testimonial-2-quote">
                          "The coaching gave me the chance to step back and align my career with what I value most. That perspective has been invaluable, and I now feel much clearer about how I want to move forward."
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-foreground" data-testid="text-testimonial-2-name">Global Leader</p>
                        <p className="text-sm text-muted-foreground" data-testid="text-testimonial-2-title">Deloitte</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
                
                {/* Testimonial 3 */}
                <CarouselItem>
                  <Card data-testid="card-testimonial-3">
                    <CardContent className="p-8">
                      <div className="mb-6">
                        <Quote className="text-3xl text-secondary mb-4 w-8 h-8" />
                        <p className="text-muted-foreground leading-relaxed italic text-lg" data-testid="text-testimonial-3-quote">
                          "What stood out was the ability to cut through complex challenges and offer a new perspective on thorny issues. The combination of sharp business insight and genuine people understanding made the coaching experience extremely valuable. I'd strongly endorse it to fellow leaders."
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-foreground" data-testid="text-testimonial-3-name">CEO</p>
                        <p className="text-sm text-muted-foreground" data-testid="text-testimonial-3-title">UK Startup</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
                
                {/* Testimonial 4 */}
                <CarouselItem>
                  <Card data-testid="card-testimonial-4">
                    <CardContent className="p-8">
                      <div className="mb-6">
                        <Quote className="text-3xl text-secondary mb-4 w-8 h-8" />
                        <p className="text-muted-foreground leading-relaxed italic text-lg" data-testid="text-testimonial-4-quote">
                          "From the start, the workshop design felt bespoke to our needs, giving us confidence we were in good hands. The careful preparation made the session engaging, effective, and successful."
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-foreground" data-testid="text-testimonial-4-name">Head of Department</p>
                        <p className="text-sm text-muted-foreground" data-testid="text-testimonial-4-title">University of Oxford</p>
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

      {/* How to Work With Us */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6" data-testid="text-work-with-us-title">How to Work With Us</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto leading-relaxed" data-testid="text-work-with-us-description">
            Contact Ben or Kitty to arrange a free and confidential discovery session to discuss how we might work together.
          </p>
          <Button 
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold px-8 py-4 text-lg shadow-lg"
            onClick={() => scrollToSection('contact')}
            data-testid="button-contact-us"
          >
            Contact Us
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 bg-muted/30 border-t border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-serif font-semibold text-primary mb-6" data-testid="text-contact-title">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="text-secondary mr-3 w-5 h-5" />
                  <span className="text-muted-foreground" data-testid="text-contact-email">info@oxfordcoachingpartnership.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-secondary mr-3 w-5 h-5" />
                  <span className="text-muted-foreground" data-testid="text-contact-location">Oxford, United Kingdom</span>
                </div>
              </div>
              
              {/* Social Icons */}
              <div className="flex space-x-4 mt-8">
                <a 
                  href="#" 
                  className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
                  data-testid="link-linkedin"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
                  data-testid="link-twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition-colors"
                  data-testid="link-email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Enquiry Form */}
            <div>
              <h3 className="text-2xl font-serif font-semibold text-primary mb-6" data-testid="text-form-title">Send us a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="First Name" 
                              {...field}
                              data-testid="input-first-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input 
                              placeholder="Last Name" 
                              {...field}
                              data-testid="input-last-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="Email Address" 
                            {...field}
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            type="tel"
                            placeholder="Phone Number (optional)" 
                            {...field}
                            data-testid="input-phone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your coaching needs..." 
                            rows={4}
                            className="resize-none"
                            {...field}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3"
                    disabled={contactMutation.isPending}
                    data-testid="button-send-message"
                  >
                    {contactMutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
          
          {/* Footer Bottom */}
          <div className="border-t border-border mt-12 pt-8 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-muted-foreground" data-testid="text-copyright">
                © 2025 The Oxford Coaching Partnership. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-privacy">
                  Privacy Policy
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-terms">
                  Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
