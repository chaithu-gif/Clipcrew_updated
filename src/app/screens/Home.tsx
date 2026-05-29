import { useNavigate } from "react-router-dom";
import { ArrowRight, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";

const carouselImages = [
  {
    url: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&h=500&fit=crop",
    title: "Professional Photography",
    subtitle: "Capture your moments with talented photographers",
  },
  {
    url: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=500&fit=crop",
    title: "Expert Designers",
    subtitle: "Create stunning visuals with our design professionals",
  },
  {
    url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=1200&h=500&fit=crop",
    title: "Makeup Artists",
    subtitle: "Transform your look with professional makeup artists",
  },
  {
    url: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=1200&h=500&fit=crop",
    title: "Video Production",
    subtitle: "Professional videography and editing services",
  },
];

const categories = [
  {
    id: "photography",
    name: "Photographers",
    icon: "📸",
    description: "Professional photography services",
  },
  {
    id: "design",
    name: "Designers",
    icon: "🎨",
    description: "Graphic & UI/UX design experts",
    
  },
  {
    id: "makeup",
    name: "Makeup Artists",
    icon: "💄",
    description: "Professional makeup & beauty",
    
  },
  {
    id: "videography",
    name: "Videographers",
    icon: "🎬",
    description: "Video production & editing",
    
  },
];

const featured = [
  {
    name: "Gautham",
    profession: "Portrait Photographer",
    rating: 4.9,
    image: "👤",
  },
  {
    name: "Aman",
    profession: "UI/UX Designer",
    rating: 4.8,
    image: "👤",
  },
  {
    name: "Apoorva",
    profession: "Makeup Artist",
    rating: 5.0,
    image: "👤",
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Navigation */}
      <nav className="sticky top-4 z-50 px-4">
        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-md rounded-full shadow-xl px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-lg">
              <span className="text-xl text-white">🎯</span>
            </div>
            <h1 className="fancy-heading text-3xl text-gray-900">

          Clip Crew

        </h1>
          </div>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => navigate("/about")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full px-6 text-white"
            >
              About
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full px-6 text-white"
            >
              Contact
            </button>
            <Button
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full px-6 text-white"
            >
              Login
            </Button>
          </div>
        </div>
      </nav>


      {/* Image Carousel */}
      <section className="max-w-6xl mx-auto px-6 pt-12 mb-16">
        <div className="relative h-[500px] rounded-[40px] overflow-hidden shadow-2xl group">
          {/* Carousel Container */}
          <div className="relative w-full h-full">
            {carouselImages.map((image, idx) => (
              <div
                key={idx}
                className={`absolute w-full h-full transition-opacity duration-1000 ${
                  idx === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent flex flex-col items-center justify-center text-white">
                  <h3 className="text-4xl md:text-6xl font-extrabold mb-4">{image.title}</h3>
                  <p className="text-xl text-gray-200 max-w-2xl text-center">{image.subtitle}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-900 p-3 rounded-full transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {carouselImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentSlide ? "bg-white w-8" : "bg-white/60 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 text-center">
        <h2 className="fancy-heading text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
          Hire Top Creative<br />
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
  Professionals
</span>
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with talented photographers, designers, makeup artists, and videographers for your next project. Quality service, competitive rates.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
            
          <Button
            onClick={() => navigate("/login")}
           className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg rounded-full font-semibold shadow-lg"
            >Explore Professionals <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          <Button
            onClick={() => navigate("/register")}
            variant="outline"
            className="border-2 border-purple-500 text-purple-600 bg-white hover:bg-purple-50 px-8 py-6 text-lg rounded-full font-semibold"
            >
            Become a Professional<ArrowRight className="ml-2 w-5 h-5" />
          </Button>
         
        </div>
      </section>

      

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h3 className="text-4xl font-bold text-gray-900 mb-4 text-center">
          Browse by Category
        </h3>
        <p className="text-gray-600 text-center mb-12 text-lg">
          Find the perfect professional for your creative needs
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => (
  <div
    key={category.id}
    className={`p-8 rounded-[32px] shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:-translate-y-2 ${
     category.id === "photography"
  ? "bg-gradient-to-br from-cyan-200 to-sky-200"
        : category.id === "design"
        ? "bg-gradient-to-br from-purple-100 to-violet-100"
        : category.id === "makeup"
        ? "bg-gradient-to-br from-pink-100 to-rose-100"
        : "bg-gradient-to-br from-green-100 to-emerald-100"
    }`}
  >
    <div className="text-7xl mb-6">{category.icon}</div>

    <h4 className="fancy-heading text-3xl font-bold text-gray-900 mb-3">
      {category.name}
    </h4>

    <p className="text-gray-700">
      {category.description}
    </p>
  </div>
))}
        </div>
      </section>

    

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 mt-16">
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 rounded-[40px] text-white text-center p-16 shadow-xl">
          <h3 className="fancy-heading text-5xl font-bold mb-6">Ready to Find Your Perfect Match?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Browse our curated list of professionals or post your project to get matched with the right creator.
          </p>
          <Button
            onClick={() => navigate("/register")}
            className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-full shadow-lg"
            >
            Start Hiring Now <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>

     <footer className="bg-slate-900 text-white py-8 mt-20">
  <div className="max-w-6xl mx-auto px-6 text-center">

    <h3 className="text-2xl font-bold mb-3">
      Clip Crew
    </h3>

    <p className="text-slate-400 mb-4">
      Connecting clients with creative professionals.
    </p>

    

    <div className="border-t border-slate-700 pt-4">
      <p className="text-slate-500 text-sm">
        © 2026 Clip Crew. All rights reserved.
      </p>
    </div>

  </div>
</footer>
</div>
);
}