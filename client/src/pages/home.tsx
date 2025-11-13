import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Menu,
  X,
  ArrowRight,
  Quote,
  Users,
} from "lucide-react";

import oxfordSkylineImg from "@assets/Website Hero Image_1757322430079.jpg";
import benSchubertImg from "@assets/ben-schubert.jpg";
import kittyMcWilliamImg from "@assets/kitty-mcwilliam.jpg";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

// ----------------------
// CONTACT FORM SCHEMA
// ----------------------
const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  message: z
    .string()
    .min(10, "Please provide more details about your coaching needs"),
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

  const onSubmit = (data: ContactFormData) => {
    console.log("Contact form submitted:", data);
    toast({
      title: "Message sent",
      description: "Thank you for contacting us. We’ll get back to you soon.",
    });
    form.reset();
  };

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

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
              <h3
