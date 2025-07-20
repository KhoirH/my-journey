import React, { useState, useEffect, useRef, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

// =============================================================================
// TYPES & INTERFACES
// =============================================================================

interface UseCarouselProps {
  totalSlides: number;
  autoPlay?: boolean;
  interval?: number;
  infinite?: boolean;
  pauseOnHover?: boolean;
}

interface UseCarouselReturn {
  currentSlide: number;
  isPlaying: boolean;
  goToSlide: (index: number) => void;
  goToPrevious: () => void;
  goToNext: () => void;
  togglePlayPause: () => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

interface UseTouchProps {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  touchEnabled?: boolean;
}

interface UseTouchReturn {
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
}

interface CarouselContainerProps {
  children: ReactNode;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  touchHandlers?: {
    onTouchStart?: (e: React.TouchEvent) => void;
    onTouchMove?: (e: React.TouchEvent) => void;
    onTouchEnd?: () => void;
  };
}

interface CarouselTrackProps {
  children: ReactNode;
  currentSlide: number;
  className?: string;
}

interface CarouselSlideProps {
  children: ReactNode;
  className?: string;
}

interface CarouselArrowsProps {
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
  className?: string;
}

interface CarouselDotsProps {
  totalSlides: number;
  currentSlide: number;
  onDotClick: (index: number) => void;
  className?: string;
}

interface CarouselPlayPauseProps {
  isPlaying: boolean;
  onToggle: () => void;
  className?: string;
}

interface CarouselProps {
  children: ReactNode;
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showDots?: boolean;
  showPlayPause?: boolean;
  infinite?: boolean;
  className?: string;
  trackClassName?: string;
  pauseOnHover?: boolean;
  touchEnabled?: boolean;
}

interface SlideContentProps {
  children: ReactNode;
  className?: string;
}

interface HeroSlideProps {
  title: string;
  subtitle?: string;
  image?: ReactNode;
  bgClass?: string;
  textColor?: string;
}

interface ProductSlideProps {
  name: string;
  price: string;
  color: string;
  onAddToCart?: () => void;
}

interface ImageSlideProps {
  src?: string;
  alt?: string;
  title?: string;
  className?: string;
}

// =============================================================================
// CAROUSEL HOOKS
// =============================================================================

const useCarousel = ({
  totalSlides,
  autoPlay = false,
  interval = 3000,
  infinite = true,
  pauseOnHover = true,
}: UseCarouselProps): UseCarouselReturn => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying && !isPaused && totalSlides > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide(prev => 
          infinite ? (prev + 1) % totalSlides : Math.min(prev + 1, totalSlides - 1)
        );
      }, interval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, isPaused, totalSlides, interval, infinite]);

  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  const goToPrevious = (): void => {
    if (infinite) {
      setCurrentSlide(prev => prev === 0 ? totalSlides - 1 : prev - 1);
    } else {
      setCurrentSlide(prev => Math.max(0, prev - 1));
    }
  };

  const goToNext = (): void => {
    if (infinite) {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    } else {
      setCurrentSlide(prev => Math.min(totalSlides - 1, prev + 1));
    }
  };

  const togglePlayPause = (): void => {
    setIsPlaying(!isPlaying);
  };

  const handleMouseEnter = (): void => {
    if (pauseOnHover) setIsPaused(true);
  };

  const handleMouseLeave = (): void => {
    if (pauseOnHover) setIsPaused(false);
  };

  return {
    currentSlide,
    isPlaying,
    goToSlide,
    goToPrevious,
    goToNext,
    togglePlayPause,
    handleMouseEnter,
    handleMouseLeave,
  };
};

const useTouch = ({ onSwipeLeft, onSwipeRight, touchEnabled = true }: UseTouchProps): UseTouchReturn => {
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const handleTouchStart = (e: React.TouchEvent): void => {
    if (!touchEnabled) return;
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent): void => {
    if (!touchEnabled) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (): void => {
    if (!touchEnabled || !touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && onSwipeLeft) onSwipeLeft();
    if (isRightSwipe && onSwipeRight) onSwipeRight();
  };

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};

// =============================================================================
// CAROUSEL COMPONENTS
// =============================================================================

const CarouselContainer: React.FC<CarouselContainerProps> = ({ 
  children, 
  className = "", 
  onMouseEnter, 
  onMouseLeave,
  touchHandlers = {}
}) => {
  return (
    <div 
      className={`relative w-full overflow-hidden ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...touchHandlers}
    >
      {children}
    </div>
  );
};

const CarouselTrack: React.FC<CarouselTrackProps> = ({ 
  children, 
  currentSlide, 
  className = "h-64 md:h-96" 
}) => {
  return (
    <div className={`relative bg-gray-100 rounded-lg overflow-hidden ${className}`}>
      <div 
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {children}
      </div>
    </div>
  );
};

const CarouselSlide: React.FC<CarouselSlideProps> = ({ children, className = "" }) => {
  return (
    <div className={`w-full h-full flex-shrink-0 ${className}`}>
      {children}
    </div>
  );
};

const CarouselArrows: React.FC<CarouselArrowsProps> = ({ 
  onPrevious, 
  onNext, 
  canGoPrevious = true, 
  canGoNext = true,
  className = ""
}) => {
  const baseButtonClass = "absolute top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed";
  
  return (
    <>
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`${baseButtonClass} left-4 ${className}`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`${baseButtonClass} right-4 ${className}`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </>
  );
};

const CarouselDots: React.FC<CarouselDotsProps> = ({ 
  totalSlides, 
  currentSlide, 
  onDotClick, 
  className = "" 
}) => {
  return (
    <div className={`flex justify-center space-x-2 mt-4 ${className}`}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            index === currentSlide 
              ? 'bg-blue-500 scale-110' 
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
        />
      ))}
    </div>
  );
};

const CarouselPlayPause: React.FC<CarouselPlayPauseProps> = ({ 
  isPlaying, 
  onToggle, 
  className = "" 
}) => {
  return (
    <button
      onClick={onToggle}
      className={`absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm ${className}`}
    >
      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
    </button>
  );
};

// =============================================================================
// MAIN CAROUSEL COMPONENT
// =============================================================================

const Carousel: React.FC<CarouselProps> = ({
  children,
  autoPlay = false,
  interval = 3000,
  showArrows = true,
  showDots = true,
  showPlayPause = false,
  infinite = true,
  className = "",
  trackClassName = "",
  pauseOnHover = true,
  touchEnabled = true,
}) => {
  const slides = React.Children.toArray(children);
  const totalSlides = slides.length;
  
  const {
    currentSlide,
    isPlaying,
    goToSlide,
    goToPrevious,
    goToNext,
    togglePlayPause,
    handleMouseEnter,
    handleMouseLeave,
  } = useCarousel({ totalSlides, autoPlay, interval, infinite, pauseOnHover });
  
  const touchHandlers = useTouch({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrevious,
    touchEnabled,
  });
  
  if (totalSlides === 0) {
    return <div className="text-center py-8 text-gray-500">No slides available</div>;
  }
  
  const canGoPrevious = infinite || currentSlide > 0;
  const canGoNext = infinite || currentSlide < totalSlides - 1;
  
  return (
    <CarouselContainer
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      touchHandlers={{
        onTouchEnd: touchHandlers.handleTouchEnd,
        onTouchMove: touchHandlers.handleTouchMove,
        onTouchStart: touchHandlers.handleTouchMove,
      }}
    >
      <CarouselTrack currentSlide={currentSlide} className={trackClassName}>
        {slides.map((slide, index) => (
          <CarouselSlide key={index}>
            {slide}
          </CarouselSlide>
        ))}
        
        {/* Navigation arrows */}
        {showArrows && totalSlides > 1 && (
          <CarouselArrows
            onPrevious={goToPrevious}
            onNext={goToNext}
            canGoPrevious={canGoPrevious}
            canGoNext={canGoNext}
          />
        )}
        
        {/* Play/Pause button */}
        {showPlayPause && (
          <CarouselPlayPause
            isPlaying={isPlaying}
            onToggle={togglePlayPause}
          />
        )}
      </CarouselTrack>
      
      {/* Dots indicator */}
      {showDots && totalSlides > 1 && (
        <CarouselDots
          totalSlides={totalSlides}
          currentSlide={currentSlide}
          onDotClick={goToSlide}
        />
      )}
    </CarouselContainer>
  );
};

// =============================================================================
// PRESET CAROUSEL VARIANTS
// =============================================================================

const AutoPlayCarousel: React.FC<CarouselProps> = ({ children, ...props }) => (
  <Carousel
    autoPlay={true}
    showPlayPause={true}
    pauseOnHover={true}
    interval={4000}
    {...props}
  >
    {children}
  </Carousel>
);

const ImageGalleryCarousel: React.FC<CarouselProps> = ({ children, ...props }) => (
  <Carousel
    showDots={true}
    showArrows={true}
    touchEnabled={true}
    trackClassName="h-80 md:h-96"
    {...props}
  >
    {children}
  </Carousel>
);

const ProductCarousel: React.FC<CarouselProps> = ({ children, ...props }) => (
  <Carousel
    infinite={false}
    showPlayPause={false}
    showDots={true}
    trackClassName="h-72 md:h-80"
    {...props}
  >
    {children}
  </Carousel>
);

const MinimalCarousel: React.FC<CarouselProps> = ({ children, ...props }) => (
  <Carousel
    showArrows={false}
    showDots={true}
    autoPlay={false}
    {...props}
  >
    {children}
  </Carousel>
);

// =============================================================================
// SLIDE CONTENT COMPONENTS
// =============================================================================

const SlideContent: React.FC<SlideContentProps> = ({ children, className = "" }) => {
  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      {children}
    </div>
  );
};

const HeroSlide: React.FC<HeroSlideProps> = ({ 
  title, 
  subtitle, 
  image, 
  bgClass = "", 
  textColor = "text-white" 
}) => (
  <SlideContent className={`${bgClass} ${textColor}`}>
    <div className="text-center">
      {image && <div className="text-6xl mb-4">{image}</div>}
      <h3 className="text-3xl font-bold mb-2">{title}</h3>
      {subtitle && <p className="text-lg opacity-90">{subtitle}</p>}
    </div>
  </SlideContent>
);

const ProductSlide: React.FC<ProductSlideProps> = ({ 
  name, 
  price, 
  color, 
  onAddToCart 
}) => (
  <SlideContent className="bg-white">
    <div className="text-center p-8">
      <div className={`w-32 h-32 ${color} rounded-full mx-auto mb-4 flex items-center justify-center`}>
        <span className="text-white text-2xl font-bold">{name}</span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{name}</h3>
      <p className="text-3xl font-bold text-blue-600 mb-4">{price}</p>
      <button 
        onClick={onAddToCart}
        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
      >
        Add to Cart
      </button>
    </div>
  </SlideContent>
);

const ImageSlide: React.FC<ImageSlideProps> = ({ 
  src, 
  alt, 
  title, 
  className = "" 
}) => (
  <SlideContent className={className}>
    <div className="w-full h-full relative">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
          <span className="text-white text-lg">{alt || 'Image'}</span>
        </div>
      )}
      {title && (
        <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm text-white p-3 rounded">
          <h3 className="font-semibold">{title}</h3>
        </div>
      )}
    </div>
  </SlideContent>
);

export {
  Carousel,
  AutoPlayCarousel,
  ImageGalleryCarousel,
  ProductCarousel,
  MinimalCarousel,
  SlideContent,
  HeroSlide,
  ProductSlide,
  ImageSlide,
  useCarousel,
  useTouch,
  type CarouselProps,
  type HeroSlideProps,
  type ProductSlideProps,
  type ImageSlideProps,
  type SlideContentProps,
  type UseCarouselProps,
  type UseTouchProps,
};