import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, StarHalf } from 'lucide-react';

// Reusable Testimonial Slider Component
const TestimonialSlider = ({ 
  title = "Our Client Testimonial",
  heading = "Trusted by Our Partners.",
  description = "Sed nisl eros, condimentum nec risus sitamet, finibus congu. Fusen fringilla est libero, sed tempus urna feugiat eu.",
  ratings = [],
  testimonials = [],
  autoPlayInterval = 5000,
  showDots = true,
  showArrows = true,
  backgroundColor = "from-gray-50 to-blue-50",
  accentColor = "blue"
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (autoPlayInterval && testimonials.length > 1) {
      const interval = setInterval(nextSlide, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [autoPlayInterval, testimonials.length]);

  const QuoteIcon = () => (
    <svg className={`w-12 h-12 text-${accentColor}-600 mb-4`} viewBox="0 0 46 42" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M19.3074 22.4375C19.0109 24.7824 18.4898 27.0555 17.9059 28.5469C15.8664 33.7848 11.2574 38.277 5.21094 40.9184C4.07891 41.4125 3.00977 41.2418 2.37188 40.4691C2.22813 40.2895 1.64415 39.1754 1.07813 38.0074L1.07111 37.9928C0.0628121 35.8959 0.0449269 35.8587 0.0449268 35.2402C0.0539122 34.0902 0.413287 33.668 2.06641 32.8773C5.27383 31.332 7.16055 29.5801 8.40039 26.9746C8.98438 25.7438 9.28086 24.8543 9.55938 23.4707C9.73907 22.5723 9.97266 20.5867 9.97266 19.9129C9.97266 19.7422 9.87383 19.7422 6.21719 19.7422L2.46172 19.7422L1.99454 19.5086C1.73399 19.3828 1.40157 19.1313 1.25782 18.9516C1.18695 18.8658 1.12525 18.7941 1.07158 18.7167C0.703361 18.1862 0.713199 17.3932 0.736722 10.0301L0.73675 10.0223C0.763674 2.37538 0.763737 2.3573 0.952347 1.99805C1.22188 1.50391 1.58125 1.15352 2.06641 0.928908C2.47071 0.740236 2.5336 0.740236 10.2871 0.740235L18.1035 0.740235L18.4719 0.937891C18.948 1.18945 19.3344 1.57578 19.55 2.01602C19.7117 2.33945 19.7207 2.68086 19.7207 10.2188C19.7207 18.3945 19.6848 19.4996 19.3074 22.4375Z" />
    </svg>
  );

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex gap-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && <StarHalf className="w-4 h-4 fill-yellow-400 text-yellow-400" />}
      </div>
    );
  };

  if (!testimonials || testimonials.length === 0) {
    return <div className="text-center py-8 text-gray-500">No testimonials available</div>;
  }

  return (
    <div className={`bg-gradient-to-br ${backgroundColor} py-16 px-4`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Section - Title and Ratings */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <span className={`text-${accentColor}-600 font-semibold text-sm uppercase tracking-wider`}>
                {title}
              </span>
              <h2 className="text-4xl font-bold text-gray-900">
                {heading}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>

            {/* Rating Cards */}
            {ratings && ratings.length > 0 && (
              <div className="space-y-4">
                {ratings.map((rating, index) => (
                  <a 
                    key={index}
                    href={rating.url || '#'} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500">Review On</span>
                      {rating.logo ? (
                        <img src={rating.logo} alt={rating.platform} className="h-5" />
                      ) : (
                        <span className="text-lg font-bold text-gray-900">{rating.platform}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      {renderStars(rating.stars)}
                      <span className="text-sm text-gray-600">({rating.reviewCount} reviews)</span>
                    </div>
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Right Section - Testimonial Slider */}
          <div className="lg:col-span-8 relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-2">
                    <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                      {testimonial.showQuoteIcon !== false && <QuoteIcon />}
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {testimonial.quote}
                      </h3>
                      
                      <p className="text-gray-600 leading-relaxed mb-6">
                        "{testimonial.text}"
                      </p>
                      
                      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.author}
                          className="w-14 h-14 rounded-full object-cover"
                        />
                        <div>
                          <h5 className="font-semibold text-gray-900">
                            {testimonial.author}
                          </h5>
                          <span className="text-sm text-gray-500">
                            {testimonial.position}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            {showArrows && testimonials.length > 1 && (
              <div className="flex gap-3 mt-6 justify-end">
                <button
                  onClick={prevSlide}
                  className={`w-12 h-12 rounded-full bg-white shadow-md hover:bg-${accentColor}-600 hover:text-white transition-colors flex items-center justify-center group`}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className={`w-12 h-12 rounded-full bg-white shadow-md hover:bg-${accentColor}-600 hover:text-white transition-colors flex items-center justify-center group`}
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Dots Indicator */}
            {showDots && testimonials.length > 1 && (
              <div className="flex gap-2 mt-4 justify-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2 rounded-full transition-all ${
                      currentSlide === index ? `w-8 bg-${accentColor}-600` : 'w-2 bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Example Usage Component
const App = () => {
  const sampleRatings = [
    {
      platform: "Clutch",
      url: "https://clutch.co/",
      stars: 4.5,
      reviewCount: 50,
      logo: null // You can add logo URL here
    },
    {
      platform: "Google",
      url: "https://www.google.com/",
      stars: 4.5,
      reviewCount: 50,
      logo: null
    }
  ];

  const sampleTestimonials = [
    {
      quote: "Excellent quality production!",
      text: "Feel free customize key feature based one the services & strategy you offer each plan. This breakdown help various potential clients are fundamental.",
      author: "Mr. Daniel Scoot",
      position: "Founder, Egenslab",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      showQuoteIcon: true
    },
    {
      quote: "Best communication & deliver",
      text: "Feel free customize key feature based one the services & strategy you offer each plan. This breakdown help various potential clients are fundamental.",
      author: "Mr. Jeams Torbak",
      position: "Founder, Triprex",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
    },
    {
      quote: "Outstanding material quality!",
      text: "Feel free customize key feature based one the services & strategy you offer each plan. This breakdown help various potential clients are fundamental.",
      author: "Matthew Julian",
      position: "Founder, Axleo",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
    },
    {
      quote: "Superb production level!",
      text: "Feel free customize key feature based one the services & strategy you offer each plan. This breakdown help various potential clients are fundamental.",
      author: "Olivern James",
      position: "Founder, Nexaq",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <TestimonialSlider 
        title="Our Client Testimonial"
        heading="Trusted by Our Partners."
        description="Sed nisl eros, condimentum nec risus sitamet, finibus congu. Fusen fringilla est libero, sed tempus urna feugiat eu. Curabit eu feugiat ligu Suspendisse nectoraba."
        ratings={sampleRatings}
        testimonials={sampleTestimonials}
        autoPlayInterval={5000}
        showDots={true}
        showArrows={true}
        backgroundColor="from-gray-50 to-blue-50"
        accentColor="blue"
      />
    </div>
  );
};

export default App;