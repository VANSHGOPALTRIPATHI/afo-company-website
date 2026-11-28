import React, { useState, useEffect, useRef } from 'react';
import ProductsTrading from './ProductsTrading';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Megaphone,
  Video,
  Share2,
  Store,
  Utensils,
  Hospital,
  GraduationCap,
  Building2,
  Home as HomeIcon,
  Package,
  Briefcase,
  Rocket,
  Users,
  ShieldCheck,
  Target,
  TrendingUp,
  Layers,
  Award,
  Menu,
  X,
  Star,
  Copy,
  Check,
  ExternalLink,
  Smartphone,
  Film,
  Clapperboard,
  Send,
  AlertCircle,
  Info,
  ChevronRight,
  Compass,
  Zap,
  Globe
} from 'lucide-react';

/**
 * ============================================================================
 * 1. CENTRALIZED BUSINESS & AGENCY CONFIGURATION (SOURCE OF TRUTH)
 * ============================================================================
 * Update phone numbers, social media URLs, WhatsApp presets, or form backend
 * credentials in this single object. No contact details are hardcoded elsewhere.
 */
const AGENCY_CONFIG = {
  companyName: 'AFO Company',
  category: 'Digital Marketing & Video Promotion Agency',
  tagline: 'Your Business, Our Promotion!',
  hindiHeadline: 'अब अपने बिजनेस को दीजिए एक नई पहचान!',
  owner: 'Anu Dubey',
  location: {
    city: 'Katni',
    state: 'Madhya Pradesh',
    country: 'India',
    full: 'Katni, Madhya Pradesh, India',
    // City-level map embed for Katni, Madhya Pradesh (no invented street address)
    mapEmbedUrl:
      'https://maps.google.com/maps?q=Katni%2C%20Madhya%20Pradesh%2C%20India&t=&z=13&ie=UTF8&iwloc=&output=embed'
  },
  email: 'awesomefashiononline@gmail.com',
  phones: {
    primary: {
      label: 'Primary Contact',
      number: '9009433331',
      formatted: '+91 90094 33331',
      telHref: 'tel:+919009433331'
    },
    alternate: {
      label: 'Alternate Number',
      number: '9713433331',
      formatted: '+91 97134 33331',
      telHref: 'tel:+919713433331'
    },
    additional: {
      label: 'Additional Enquiry',
      number: '9644424384',
      formatted: '+91 96444 24384',
      telHref: 'tel:+919644424384'
    }
  },
  whatsapp: {
    // Configurable WhatsApp number (country code + 10-digit primary number)
    number: '919009433331',
    defaultMessage:
      'Hello AFO Company, I am interested in your digital marketing services. Please share more information.',
    getUrl: (customMessage) => {
      const msg = encodeURIComponent(
        customMessage ||
          'Hello AFO Company, I am interested in your digital marketing services. Please share more information.'
      );
      return `https://wa.me/919009433331?text=${msg}`;
    }
  },
  socialLinks: {
    // Configurable Social Media URLs — replace `url` values when official handles are ready
    facebook: {
      name: 'Facebook',
      url: '', // e.g., 'https://facebook.com/afocompany'
      configured: false
    },
    instagram: {
      name: 'Instagram',
      url: '', // e.g., 'https://instagram.com/afocompany'
      configured: false
    },
    youtube: {
      name: 'YouTube',
      url: '', // e.g., 'https://youtube.com/@afocompany'
      configured: false
    },
    whatsapp: {
      name: 'WhatsApp',
      url: 'https://wa.me/919009433331?text=Hello%20AFO%20Company%2C%20I%20am%20interested%20in%20your%20digital%20marketing%20services.%20Please%20share%20more%20information.',
      configured: true
    }
  },
  enquiryForm: {
    // Plug in a real Formspree, Web3Forms, or custom REST API endpoint URL here
    endpointUrl: '', // e.g., 'https://formspree.io/f/YOUR_FORM_ID'
    providerLabel: 'Formspree / Custom Webhook Endpoint'
  },
  promotionalVideo: {
    // Set `videoUrl` to a hosted .mp4 URL once rendered; when empty, renders the Interactive Storyboard Studio
    videoUrl: '',
    durationLabel: '35–40s Commercial Concept'
  },
  teamNetworkSize: '150+ Promotional Team Members'
};

/**
 * ============================================================================
 * 2. VERIFIED DOMAIN DATA (SERVICES, CATEGORIES, STORYBOARD, PLACEHOLDERS)
 * ============================================================================
 */
const SERVICES_DATA = [
  {
    id: 'facebook-ads',
    number: '01',
    title: 'Facebook Ads & Promotion',
    shortDesc:
      'Help businesses promote their products and services through targeted Facebook advertising campaigns.',
    fullDesc:
      'Reach local customers across Katni and Madhya Pradesh with structured Facebook ad campaigns designed for brand awareness, store footfall, and direct customer enquiries. We craft compelling ad creatives, audience targeting, and clear call-to-action flows.',
    benefits: [
      'Hyper-local & regional audience targeting by city, age, and interests',
      'High-converting visual ad creatives and persuasive promotional copy',
      'Direct click-to-WhatsApp and click-to-call campaign objectives',
      'Structured budget optimization for consistent business visibility'
    ],
    whoNeeds: ['Retail Shops', 'Service Providers', 'Local Brands', 'Educational Institutes'],
    accentColor: '#1769FF',
    iconName: 'megaphone'
  },
  {
    id: 'instagram-ads',
    number: '02',
    title: 'Instagram Ads & Promotion',
    shortDesc:
      'Promote businesses, brands and products through engaging Instagram content and sponsored advertising.',
    fullDesc:
      'Build a modern, memorable visual presence on Instagram. From eye-catching feed promotions and story ads to profile branding, we position your business in front of active, style-conscious, and ready-to-buy audiences.',
    benefits: [
      'Aesthetic feed posts, story placements, and sponsored brand promotions',
      'Strong visual identity aligned with your business category',
      'Engaging captions and localized hashtag strategies',
      'Direct profile traffic and DM/WhatsApp enquiry generation'
    ],
    whoNeeds: ['Fashion & Lifestyle Stores', 'Cafes & Restaurants', 'Salons & Clinics', 'Product Brands'],
    accentColor: '#FFC928',
    iconName: 'sparkles'
  },
  {
    id: 'whatsapp-marketing',
    number: '03',
    title: 'WhatsApp Marketing',
    shortDesc:
      'Help businesses reach and communicate directly with potential customers through WhatsApp marketing.',
    fullDesc:
      'Connect with customers where they check messages most frequently. We design crisp promotional flyers, offer announcements, catalog showcases, and direct-response WhatsApp campaigns that turn attention into immediate conversations.',
    benefits: [
      'Instant delivery of offers, flyers, and video promos to prospects',
      'High open rates compared to traditional static flyers',
      'One-tap direct enquiry routing to your business WhatsApp',
      'Ideal for seasonal sales, festive offers, and launch announcements'
    ],
    whoNeeds: ['Local Shops', 'Wholesale & Retail Traders', 'Property Dealers', 'Clinics & Coaching'],
    accentColor: '#1769FF',
    iconName: 'message'
  },
  {
    id: 'business-shop-promotion',
    number: '04',
    title: 'Business & Shop Promotion',
    shortDesc:
      'Comprehensive promotional solutions for retail stores, showrooms, shops and local businesses.',
    fullDesc:
      'Whether you are launching a new showroom in Katni or boosting daily customer footfall at an established store, AFO Company creates multi-angle digital and on-ground promotional campaigns that give your shop a standout market identity.',
    benefits: [
      'Grand opening, anniversary, and festive sale promotional campaigns',
      'Shop walkthrough video highlights and offer announcements',
      'Coordinated digital + promotional network visibility',
      'Increased local brand recall among neighborhood buyers'
    ],
    whoNeeds: ['Clothing & Jewelry Showrooms', 'Electronics & Mobile Stores', 'Supermarkets', 'Local Businesses'],
    accentColor: '#FFC928',
    iconName: 'store'
  },
  {
    id: 'hotel-restaurant-promotion',
    number: '05',
    title: 'Hotel & Restaurant Promotion',
    shortDesc:
      'Promote hotels, restaurants, cafes, banquet halls and hospitality businesses to attract more guests.',
    fullDesc:
      'Showcase your ambiance, signature dishes, banquet facilities, and hospitality experience through mouth-watering visual reels, location-targeted social ads, and promotional campaigns that drive table bookings and event enquiries.',
    benefits: [
      'Appetizing food, ambiance, and room showcase promotions',
      'Weekend dining, family celebration, and banquet booking campaigns',
      'Geo-targeted advertising for travelers and local diners',
      'Stronger hospitality brand reputation across social platforms'
    ],
    whoNeeds: ['Restaurants & Cafes', 'Hotels & Resorts', 'Banquet & Marriage Gardens', 'Cloud Kitchens'],
    accentColor: '#1769FF',
    iconName: 'utensils'
  },
  {
    id: 'colony-society-promotion',
    number: '06',
    title: 'Colony & Society Promotion',
    shortDesc:
      'Focused promotional services for residential colonies, housing societies and community businesses.',
    fullDesc:
      'Residential townships, gated colonies, and community-centric businesses thrive on trust and direct visibility. We execute structured awareness campaigns tailored to families, homeowners, and neighborhood residents.',
    benefits: [
      'Targeted reach among residential families and local decision-makers',
      'Clear communication of colony amenities, safety, and community value',
      'Coordinated promotional visibility for community events and launches',
      'Builds long-term neighborhood trust and word-of-mouth momentum'
    ],
    whoNeeds: ['Residential Colonies', 'Housing Societies', 'Community Clubs', 'Neighborhood Services'],
    accentColor: '#FFC928',
    iconName: 'home'
  },
  {
    id: 'property-real-estate-promotion',
    number: '07',
    title: 'Property & Real Estate Promotion',
    shortDesc:
      'Promote residential plots, commercial properties, housing projects and real estate agencies.',
    fullDesc:
      'Real estate buyers look for clarity, location advantage, and credibility before booking a site visit. We produce persuasive property showcase videos, digital ad campaigns, and lead-focused promotions for builders, developers, and property dealers.',
    benefits: [
      'Site highlight videos, layout walkthroughs, and location advantage graphics',
      'Serious buyer enquiry generation via Facebook, Instagram & WhatsApp',
      'Professional presentation for residential plots, flats, and commercial spaces',
      'Consistent brand authority for developers and property consultants'
    ],
    whoNeeds: ['Real Estate Developers', 'Property Dealers', 'Commercial Complexes', 'Plot & Township Projects'],
    accentColor: '#1769FF',
    iconName: 'building'
  },
  {
    id: 'product-brand-promotion',
    number: '08',
    title: 'Product & Brand Promotion',
    shortDesc:
      'Help businesses showcase their products, build brand recognition and expand market reach.',
    fullDesc:
      'Turn your physical or consumer products into recognizable brands. From product launch campaigns and feature spotlights to persuasive visual storytelling, we help manufacturers, distributors, and brand owners capture customer attention.',
    benefits: [
      'Compelling product showcase creatives highlighting key features & value',
      'Cohesive brand positioning across digital channels',
      'Support for new product launches and dealer/distributor awareness',
      'Memorable brand identity that stands apart from generic competitors'
    ],
    whoNeeds: ['FMCG & Consumer Brands', 'Manufacturers & Wholesalers', 'D2C Startups', 'Regional Brands'],
    accentColor: '#FFC928',
    iconName: 'package'
  },
  {
    id: 'professional-video-promotion',
    number: '09',
    title: 'Professional Video Promotion',
    shortDesc:
      'Create impactful promotional video content for businesses, institutions and commercial brands.',
    fullDesc:
      'Video is the most powerful medium to build instant trust. We script, structure, and produce crisp commercial promotional videos with clear messaging, voiceovers, subtitles, and strong calls-to-action that explain your business in seconds.',
    benefits: [
      'End-to-end commercial ad scripting, visual direction, and branding',
      'Clear Hindi & English messaging tailored to your target buyers',
      'Ready-to-share formats for WhatsApp, Facebook, Instagram, and YouTube',
      'High retention storytelling that elevates perceived brand value'
    ],
    whoNeeds: ['Hospitals & Clinics', 'Schools & Colleges', 'Showrooms & Brands', 'Real Estate Projects'],
    accentColor: '#1769FF',
    iconName: 'video'
  },
  {
    id: 'social-media-reels-advertising',
    number: '10',
    title: 'Social Media Reels & Advertising',
    shortDesc:
      'Promote businesses through high-engagement short-form video reels and targeted social advertising.',
    fullDesc:
      'Short-form vertical reels dominate organic discovery and paid social performance. We conceptualize and promote scroll-stopping business reels engineered to capture attention in the first 3 seconds and convert viewers into enquiries.',
    benefits: [
      'High-energy vertical video concepts tailored for Instagram & Facebook Reels',
      'Trend-aware pacing combined with professional business messaging',
      'Amplified reach through targeted reel ad boosting',
      'Rapid visibility growth for new offers, launches, and brand stories'
    ],
    whoNeeds: ['Retail & Lifestyle Brands', 'Cafes & Hospitality', 'Entrepreneurs & Startups', 'Local Service Brands'],
    accentColor: '#FFC928',
    iconName: 'film'
  }
];

const BUSINESS_CATEGORIES = [
  {
    title: 'Shops and Retail Stores',
    desc: 'Clothing showrooms, jewelry stores, electronics, supermarkets & local retail outlets.',
    icon: Store
  },
  {
    title: 'Hotels and Restaurants',
    desc: 'Hotels, family restaurants, cafes, bakeries, resorts & banquet venues.',
    icon: Utensils
  },
  {
    title: 'Hospitals and Clinics',
    desc: 'Multi-specialty hospitals, dental clinics, diagnostic centers & wellness facilities.',
    icon: Hospital
  },
  {
    title: 'Schools and Educational Institutions',
    desc: 'Schools, colleges, coaching academies, skill institutes & training centers.',
    icon: GraduationCap
  },
  {
    title: 'Real Estate and Property',
    desc: 'Property dealers, builders, commercial spaces, residential plots & townships.',
    icon: Building2
  },
  {
    title: 'Residential Colonies and Societies',
    desc: 'Gated residential colonies, housing societies & community-focused initiatives.',
    icon: HomeIcon
  },
  {
    title: 'Product and Brand Owners',
    desc: 'Consumer products, regional manufacturers, packaged goods & emerging brands.',
    icon: Package
  },
  {
    title: 'Local Businesses',
    desc: 'Service providers, salons, fitness studios, agencies & growing city enterprises.',
    icon: Briefcase
  },
  {
    title: 'Startups and Entrepreneurs',
    desc: 'New ventures, founders & innovative business ideas seeking rapid market visibility.',
    icon: Rocket
  }
];

const VIDEO_STORYBOARD_SCENES = [
  {
    sceneNumber: 1,
    timeRange: '00:00 – 00:05',
    durationSec: 5,
    title: 'Scene 1: Vibrant Indian Retail Shop',
    visualCue:
      'Warm cinematic wide-to-medium dolly shot of a bustling Indian retail showroom in Katni with happy shoppers exploring displays.',
    hindiVoiceover: '“क्या आपका बिजनेस बेहतरीन है, लेकिन सही ग्राहकों तक नहीं पहुँच पा रहा?”',
    englishSubtitle: '“Is your business great, yet still not reaching the right customers?”',
    accent: '#1769FF',
    icon: Store
  },
  {
    sceneNumber: 2,
    timeRange: '00:05 – 00:10',
    durationSec: 5,
    title: 'Scene 2: Hospitality — Restaurant & Hotel',
    visualCue:
      'Golden-hour interior pan of an inviting restaurant & hotel lobby with warm lighting, fine dining presentation, and welcoming staff.',
    hindiVoiceover: '“चाहे आपका शानदार होटल हो, रेस्टोरेंट हो या रिटेल शोरूम...”',
    englishSubtitle: '“Whether you run a fine hotel, a restaurant, or a retail showroom...”',
    accent: '#FFC928',
    icon: Utensils
  },
  {
    sceneNumber: 3,
    timeRange: '00:10 – 00:16',
    durationSec: 6,
    title: 'Scene 3: Modern Hospital & Educational Institution',
    visualCue:
      'Clean, trustworthy architectural visuals of a modern healthcare clinic and a bright school campus full of confident students.',
    hindiVoiceover: '“आधुनिक हॉस्पिटल, क्लिनिक या प्रतिष्ठित स्कूल और शिक्षण संस्थान हो...”',
    englishSubtitle: '“A modern hospital, clinic, or a trusted school and educational institute...”',
    accent: '#1769FF',
    icon: GraduationCap
  },
  {
    sceneNumber: 4,
    timeRange: '00:16 – 00:22',
    durationSec: 6,
    title: 'Scene 4: Real Estate & Residential Projects',
    visualCue:
      'Smooth aerial-style reveal of modern residential colonies, commercial properties, and well-planned real estate developments.',
    hindiVoiceover: '“या फिर प्रॉपर्टी, रियल एस्टेट और रेजिडेंशियल कॉलोनी प्रोजेक्ट्स...”',
    englishSubtitle: '“Or real estate, commercial properties, and residential colony projects...”',
    accent: '#FFC928',
    icon: Building2
  },
  {
    sceneNumber: 5,
    timeRange: '00:22 – 00:28',
    durationSec: 6,
    title: 'Scene 5: Social Media Ads, Reels & Digital Campaigns',
    visualCue:
      'Dynamic split-screen motion graphics of Facebook Ads, Instagram Reels, WhatsApp promos, and video campaigns lighting up smartphones.',
    hindiVoiceover:
      '“अब अपने बिजनेस को दीजिए एक नई पहचान — AFO Company के डिजिटल मार्केटिंग और प्रोफेशनल वीडियो प्रमोशन के साथ!”',
    englishSubtitle:
      '“Give your business a new identity — with AFO Company’s digital marketing and professional video promotion!”',
    accent: '#1769FF',
    icon: Smartphone
  },
  {
    sceneNumber: 6,
    timeRange: '00:28 – 00:34',
    durationSec: 6,
    title: 'Scene 6: Business Owners Seeing Growth & Enquiries',
    visualCue:
      'Confident Indian business owners reviewing their promotional video reel and receiving active customer calls and WhatsApp enquiries.',
    hindiVoiceover: '“ज्यादा विजिबिलिटी, ज्यादा ग्राहक, और मजबूत ब्रांड पहचान — सीधे आपके मोबाइल तक।”',
    englishSubtitle: '“Higher visibility, more customers, and a stronger brand identity — straight to your phone.”',
    accent: '#FFC928',
    icon: TrendingUp
  },
  {
    sceneNumber: 7,
    timeRange: '00:34 – 00:40',
    durationSec: 6,
    title: 'Final Scene: AFO Company Brand End-Slate & CTA',
    visualCue:
      'Royal Blue (#071B55) & Gold (#FFC928) luxury end-card featuring the AFO Crown Emblem, tagline, and Katni contact numbers.',
    hindiVoiceover:
      '“AFO Company — Your Business, Our Promotion! आज ही संपर्क करें: 9009433331.”',
    englishSubtitle:
      '“AFO Company — Your Business, Our Promotion! Contact us today: 9009433331.”',
    accent: '#FFC928',
    icon: Award
  }
];

const AI_VIDEO_PRODUCTION_PROMPT = `Create a 40-second high-end commercial promotional film in 16:9 widescreen (4K, 24fps) for "AFO Company — Digital Marketing & Video Promotion Agency" based in Katni, Madhya Pradesh, India.
Brand Colors: Deep Royal Blue (#071B55), Electric Blue (#1769FF), and Metallic Gold (#FFC928).
Tone: Confident, warm, aspirational Indian commercial advertising with uplifting modern corporate-fusion background music.
Scene Sequence:
- [00:00-00:05] Warm dolly shot inside an Indian retail showroom with happy customers browsing products.
- [00:05-00:10] Golden-hour cinematic pan of an upscale Indian restaurant and hotel lobby.
- [00:10-00:16] Crisp architectural shots of a clean modern hospital reception and a bright educational school campus.
- [00:16-00:22] Smooth aerial-style reveal of modern residential colonies and commercial real estate developments.
- [00:22-00:28] Sleek motion-graphic transition showing Facebook Ads, Instagram Reels, and WhatsApp promotional videos playing on smartphones.
- [00:28-00:34] Confident Indian shop and business owners smiling as they watch their promotional video and receive customer enquiries.
- [00:34-00:40] Deep Royal Blue (#071B55) luxury end-slate with the golden crown "AFO Company" logo watermark, Hindi headline "अब अपने बिजनेस को दीजिए एक नई पहचान!", English tagline "Your Business, Our Promotion!", Location "Katni, Madhya Pradesh, India", and Phone "9009433331 / 9713433331".
Audio: Authoritative, warm male/female Hindi voiceover with clean English lower-third subtitles throughout.`;



/**
 * ============================================================================
 * 3. ORIGINAL VECTOR BRAND IDENTITY (AFO LOGO + GOLDEN CROWN EMBLEM)
 * ============================================================================
 */
const AfoLogo = ({ variant = 'dark', size = 'md', showTagline = false }) => {
  // variant: 'dark' (for white/light headers), 'light' (for royal blue hero/footer/watermark)
  const isLightText = variant === 'light';
  const dimensions =
    size === 'sm'
      ? { svgW: 40, svgH: 40, titleClass: 'text-xl', subClass: 'text-[10px]' }
      : size === 'lg'
      ? { svgW: 58, svgH: 58, titleClass: 'text-3xl', subClass: 'text-xs' }
      : { svgW: 46, svgH: 46, titleClass: 'text-2xl', subClass: 'text-[11px]' };

  return (
    <div className="inline-flex items-center gap-3 select-none group">
      {/* Custom Royal Blue & Gold Crown Shield Emblem */}
      <svg
        width={dimensions.svgW}
        height={dimensions.svgH}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="afoRoyalBg" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#071B55" />
            <stop offset="100%" stopColor="#1769FF" />
          </linearGradient>
          <linearGradient id="afoGoldGrad" x1="12" y1="10" x2="52" y2="48" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFE17D" />
            <stop offset="50%" stopColor="#FFC928" />
            <stop offset="100%" stopColor="#E0A100" />
          </linearGradient>
        </defs>
        {/* Outer Rounded Crest */}
        <rect
          x="2"
          y="2"
          width="60"
          height="60"
          rx="16"
          fill="url(#afoRoyalBg)"
          stroke="url(#afoGoldGrad)"
          strokeWidth="2.5"
        />
        {/* Subtle Inner Precision Ring */}
        <rect
          x="6.5"
          y="6.5"
          width="51"
          height="51"
          rx="12.5"
          stroke="#FFFFFF"
          strokeOpacity="0.14"
          strokeWidth="1"
        />
        {/* Regal Golden Crown Symbol */}
        <path
          d="M16 26L21.5 16L32 23.5L42.5 16L48 26H16Z"
          fill="url(#afoGoldGrad)"
        />
        <circle cx="21.5" cy="13.5" r="2.1" fill="#FFE17D" />
        <circle cx="32" cy="12" r="2.4" fill="#FFC928" />
        <circle cx="42.5" cy="13.5" r="2.1" fill="#FFE17D" />
        <rect x="16" y="27.5" width="32" height="3" rx="1.5" fill="url(#afoGoldGrad)" />
        {/* Sharp Geometric Monogram Base */}
        <text
          x="32"
          y="46.5"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="15.5"
          letterSpacing="1.2"
        >
          AFO
        </text>
      </svg>

      {/* Typography Lockup */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-tight ${dimensions.titleClass} ${
              isLightText ? 'text-white' : 'text-[#071B55]'
            }`}
          >
            AFO
          </span>
          <span
            className={`font-extrabold tracking-wide uppercase text-xs px-2 py-0.5 rounded-md ${
              isLightText
                ? 'bg-[#FFC928] text-[#071B55]'
                : 'bg-[#071B55] text-[#FFC928]'
            }`}
          >
            Company
          </span>
        </div>
        {showTagline ? (
          <span
            className={`mt-1 font-medium tracking-wide ${dimensions.subClass} ${
              isLightText ? 'text-blue-200' : 'text-slate-500'
            }`}
          >
            {AGENCY_CONFIG.tagline}
          </span>
        ) : (
          <span
            className={`mt-1 font-semibold uppercase tracking-widest text-[9px] ${
              isLightText ? 'text-[#FFC928]/90' : 'text-[#1769FF]'
            }`}
          >
            Digital & Video Agency
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * ============================================================================
 * 4. SERVICE ICON RESOLVER
 * ============================================================================
 */
const ServiceIcon = ({ name, className = 'w-6 h-6' }) => {
  switch (name) {
    case 'megaphone':
      return <Megaphone className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'message':
      return <MessageCircle className={className} />;
    case 'store':
      return <Store className={className} />;
    case 'utensils':
      return <Utensils className={className} />;
    case 'home':
      return <HomeIcon className={className} />;
    case 'building':
      return <Building2 className={className} />;
    case 'package':
      return <Package className={className} />;
    case 'video':
      return <Video className={className} />;
    case 'film':
      return <Film className={className} />;
    default:
      return <Megaphone className={className} />;
  }
};

/**
 * ============================================================================
 * 5. INTERACTIVE CINEMATIC STORYBOARD STUDIO (PROMOTIONAL VIDEO SECTION)
 * ============================================================================
 * Note: Clearly transparent as an Interactive Storyboard & Production Preview
 * for the 35-40s commercial film until the final rendered MP4 is attached.
 */
const PromotionalVideoStudio = ({ onEnquireClick }) => {
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [showProductionSpec, setShowProductionSpec] = useState(false);

  const currentScene = VIDEO_STORYBOARD_SCENES[activeSceneIdx];
  const SceneIcon = currentScene.icon;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(() => {
      if (activeSceneIdx < VIDEO_STORYBOARD_SCENES.length - 1) {
        setActiveSceneIdx((prev) => prev + 1);
      } else {
        setIsPlaying(false);
      }
    }, currentScene.durationSec * 850);
    return () => clearTimeout(timer);
  }, [isPlaying, activeSceneIdx, currentScene.durationSec]);

  const handleCopyPrompt = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(AI_VIDEO_PRODUCTION_PROMPT);
    }
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  return (
    <div className="bg-[#071B55] rounded-3xl overflow-hidden shadow-2xl border border-[#1769FF]/30 text-white">
      {/* Top Studio Header Bar */}
      <div className="px-6 py-4 bg-[#05133D] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FFC928] text-[#071B55]">
            <Clapperboard className="w-3.5 h-3.5" />
            {AGENCY_CONFIG.promotionalVideo.videoUrl
              ? 'COMMERCIAL VIDEO PLAYER'
              : 'STORYBOARD & AI VIDEO STUDIO (35–40s)'}
          </span>
          <span className="text-xs sm:text-sm text-blue-200 font-medium">
            Concept: <strong className="text-white">“{AGENCY_CONFIG.hindiHeadline}”</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowProductionSpec(!showProductionSpec)}
            className="text-xs font-semibold px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC928] text-blue-100 transition cursor-pointer"
          >
            {showProductionSpec ? 'Hide AI Production Prompt' : 'View AI Production Prompt'}
          </button>
        </div>
      </div>

      {/* Main Widescreen Storyboard Viewport or Active MP4 Video Player */}
      {AGENCY_CONFIG.promotionalVideo.videoUrl ? (
        <div className="p-6 sm:p-8 bg-[#061542] space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black aspect-video">
            <video
              src={AGENCY_CONFIG.promotionalVideo.videoUrl}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
            <div className="pointer-events-none absolute top-3 right-3 bg-[#071B55]/85 backdrop-blur-sm px-2.5 py-1.5 rounded-xl border border-white/15 scale-75 origin-top-right">
              <AfoLogo variant="light" size="sm" />
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-blue-200">
            <span>Official Promotional Film — {AGENCY_CONFIG.companyName}</span>
            <button
              type="button"
              onClick={onEnquireClick}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#FFC928] text-[#071B55] font-bold hover:bg-[#ffd659] transition cursor-pointer"
            >
              Order a Video Like This <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative p-6 sm:p-10 bg-gradient-to-br from-[#071B55] via-[#0B2675] to-[#061542]">
          {/* Decorative Studio Grid Lines */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(#FFC928 1px, transparent 1px), radial-gradient(#1769FF 1px, #071B55 1px)',
              backgroundSize: '32px 32px'
            }}
          />

          {/* Honest Storyboard Preview Notice */}
          <div className="relative z-10 mb-5 px-4 py-2.5 rounded-xl bg-amber-400/15 border border-[#FFC928]/35 text-xs text-amber-100">
            <strong>Interactive Storyboard Preview:</strong> No rendered `.mp4` file is attached yet (`AGENCY_CONFIG.promotionalVideo.videoUrl` is empty). Step through all 7 scenes below or copy the AI prompt to generate the final video.
          </div>

          {/* Top Watermark & Timecode Overlay */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2.5 bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isPlaying ? 'bg-emerald-400 animate-ping' : 'bg-[#FFC928]'
                }`}
              />
              <span className="text-xs font-mono tracking-wider text-blue-100">
                SCENE 0{currentScene.sceneNumber} / 07 • {currentScene.timeRange}
              </span>
            </div>

            {/* AFO Brand Watermark */}
            <div className="opacity-90 scale-90 origin-right">
              <AfoLogo variant="light" size="sm" />
            </div>
          </div>

          {/* Center Scene Visual Canvas */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-4">
            {/* Animated Scene Frame Card */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 rounded-2xl bg-white/5 border border-white/15 backdrop-blur-sm text-center relative overflow-hidden">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center mb-5 shadow-lg transition-all duration-500"
                style={{
                  backgroundColor:
                    currentScene.accent === '#FFC928' ? '#FFC928' : '#1769FF',
                  color: currentScene.accent === '#FFC928' ? '#071B55' : '#FFFFFF'
                }}
              >
                <SceneIcon className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#FFC928] mb-1">
                Visual Direction
              </span>
              <h4 className="text-lg font-bold text-white mb-2">{currentScene.title}</h4>
              <p className="text-sm text-blue-100/90 leading-relaxed">
                {currentScene.visualCue}
              </p>
            </div>

            {/* Hindi Voiceover & English Subtitles Display */}
            <div className="lg:col-span-7 space-y-5">
              <div className="p-6 rounded-2xl bg-[#041033]/80 border-l-4 border-[#FFC928] shadow-inner">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FFC928]">
                    Hindi Voiceover Script
                  </span>
                  <span className="text-[11px] text-blue-300">Audio Track: Hindi + Uplifting Score</span>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-white leading-snug">
                  {currentScene.hindiVoiceover}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                <span className="block text-xs font-bold uppercase tracking-wider text-[#1769FF] mb-1.5">
                  English Subtitle Track
                </span>
                <p className="text-base sm:text-lg text-blue-100 font-medium">
                  {currentScene.englishSubtitle}
                </p>
              </div>

              {/* Playback & Scene Stepper Controls */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-[#FFC928] text-[#071B55] hover:bg-[#ffd556] transition shadow-lg cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" /> Pause Storyboard
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" /> Play 7-Scene Preview
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setActiveSceneIdx(0);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> Restart
                </button>

                <button
                  type="button"
                  onClick={onEnquireClick}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-[#1769FF] hover:bg-[#2b77ff] text-white transition ml-auto cursor-pointer"
                >
                  Order a Video Like This <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 7-Scene Timeline Scrubber */}
          <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {VIDEO_STORYBOARD_SCENES.map((scene, idx) => {
                const isActive = idx === activeSceneIdx;
                return (
                  <button
                    key={scene.sceneNumber}
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setActiveSceneIdx(idx);
                    }}
                    className={`p-3 rounded-xl text-left transition border cursor-pointer ${
                      isActive
                        ? 'bg-[#1769FF] border-[#FFC928] text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-blue-200 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                      <span className={isActive ? 'text-[#FFC928]' : 'text-blue-300'}>
                        0{scene.sceneNumber}
                      </span>
                      <span className="opacity-75">{scene.durationSec}s</span>
                    </div>
                    <div className="text-xs font-semibold line-clamp-1">
                      {scene.title.replace(/^Scene \d+:\s*|^Final Scene:\s*/, '')}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * ============================================================================
 * 6. PAGE 1: HOME PAGE
 * ============================================================================
 */
const HomePage = ({ navigateTo, selectServiceAndEnquire }) => {
  return (
    <div>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#071B55] via-[#0B2570] to-[#071B55] text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Subtle Architectural Glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#1769FF]/25 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 rounded-full bg-[#FFC928]/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Column: Core Agency Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#FFC928]/40 text-[#FFC928] text-xs sm:text-sm font-bold tracking-wide">
                <Sparkles className="w-4 h-4" />
                <span>{AGENCY_CONFIG.tagline}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.12] text-white">
                Give Your Business a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFC928] via-[#FFE07D] to-[#FFC928]">
                  New Identity!
                </span>
              </h1>

              <p className="text-lg sm:text-xl font-bold text-blue-200">
                {AGENCY_CONFIG.hindiHeadline}
              </p>

              <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed max-w-2xl">
                Grow your business visibility with creative digital marketing, social media advertising and professional video promotion. AFO Company helps businesses connect with more potential customers.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-extrabold text-base bg-[#FFC928] text-[#071B55] hover:bg-[#ffd659] shadow-xl shadow-black/25 transition transform hover:-translate-y-0.5 cursor-pointer"
                >
                  Get a Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => navigateTo('services')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-base bg-white/10 hover:bg-white/20 text-white border border-white/20 transition cursor-pointer"
                >
                  Explore Our Services
                </button>
              </div>

              {/* Quick Trust & Direct Action Strip */}
              <div className="pt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-blue-200">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#FFC928]" />
                  {AGENCY_CONFIG.location.full}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#FFC928]" />
                  {AGENCY_CONFIG.teamNetworkSize}
                </span>
                <a
                  href={AGENCY_CONFIG.phones.primary.telHref}
                  className="inline-flex items-center gap-1.5 text-white font-semibold hover:text-[#FFC928] transition"
                >
                  <Phone className="w-4 h-4 text-[#FFC928]" />
                  {AGENCY_CONFIG.phones.primary.number}
                </a>
              </div>
            </div>

            {/* Right Column: Bespoke Agency Campaign Studio Composition */}
            <div className="lg:col-span-5">
              <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-7 shadow-2xl">
                {/* Floating Gold Badge */}                <div className="flex items-center justify-between pb-5 mb-5 border-b border-white/15">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#FFC928]">
                      AFO Campaign Engine
                    </span>
                    <h2 className="text-lg font-extrabold text-white">
                      360° Business Promotion Suite
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#1769FF] text-white text-xs font-bold">
                    Katni • MP
                  </span>
                </div>

                {/* Multi-Channel Visual Cards */}
                <div className="space-y-3.5">
                  <div className="p-4 rounded-2xl bg-[#061542]/90 border border-white/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1769FF] flex items-center justify-center shrink-0">
                      <Megaphone className="w-6 h-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-white">
                        Social Media Advertising
                      </div>
                      <div className="text-xs text-blue-200 truncate">
                        Facebook Ads • Instagram Reels • WhatsApp Campaigns
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-[#FFC928] shrink-0" />
                  </div>

                  <div className="p-4 rounded-2xl bg-[#061542]/90 border border-white/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#FFC928] flex items-center justify-center shrink-0">
                      <Video className="w-6 h-6 text-[#071B55]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-white">
                        Professional Video Promotion
                      </div>
                      <div className="text-xs text-blue-200 truncate">
                        Commercial Ads, Brand Films & Business Showcases
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-[#FFC928] shrink-0" />
                  </div>

                  <div className="p-4 rounded-2xl bg-[#061542]/90 border border-white/10 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#1769FF] flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-bold text-white">
                        Coordinated Promotional Network
                      </div>
                      <div className="text-xs text-blue-200 truncate">
                        {AGENCY_CONFIG.teamNetworkSize} Amplifying Reach
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-[#FFC928] shrink-0" />
                  </div>
                </div>

                {/* Direct WhatsApp Quick Launch inside Hero Card */}
                <div className="mt-6 pt-5 border-t border-white/15 flex items-center justify-between gap-3">
                  <div className="text-xs text-blue-200">
                    Direct Enquiry Desk
                    <div className="text-sm font-bold text-white">
                      {AGENCY_CONFIG.phones.primary.number}
                    </div>
                  </div>
                  <a
                    href={AGENCY_CONFIG.whatsapp.getUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-extrabold transition shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: OUR SERVICES OVERVIEW */}
      <section className="py-20 bg-[#F5F8FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#1769FF]">
                What We Do
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-black text-[#071B55]">
                Complete Digital & Video Promotion Services
              </h2>
              <p className="mt-3 text-slate-600 text-base sm:text-lg">
                From targeted Facebook and Instagram advertising to commercial video production and local business promotion, we build campaigns that attract real customers.
              </p>
            </div>
            <button
              type="button"
              onClick={() => navigateTo('services')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#071B55] text-white hover:bg-[#1769FF] transition self-start md:self-auto cursor-pointer"
            >
              View All 10 Services
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_DATA.slice(0, 6).map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#071B55] text-[#FFC928] flex items-center justify-center">
                      <ServiceIcon name={service.iconName} className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-extrabold text-slate-400">
                      SERVICE {service.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#151B2B] mb-2.5">
                    {service.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => selectServiceAndEnquire(service.title)}
                    className="text-sm font-bold text-[#1769FF] hover:text-[#071B55] inline-flex items-center gap-1.5 transition cursor-pointer"
                  >
                    Enquire Now <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('services')}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: WHY CHOOSE AFO COMPANY? */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1769FF]">
              The AFO Advantage
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black text-[#071B55]">
              Why Choose AFO Company?
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              We combine modern social media advertising, persuasive video promotion, and coordinated promotional reach to give your business an unmistakable edge.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Target,
                title: 'Targeted Local & Regional Reach',
                desc: 'Precision audience targeting across Katni and Madhya Pradesh so your ads reach buyers who matter.'
              },
              {
                icon: Video,
                title: 'High-Impact Video Promotion',
                desc: 'Engaging promotional videos and reels designed to capture attention and explain your offer clearly.'
              },
              {
                icon: Users,
                title: '150+ Promotional Team Network',
                desc: 'Coordinated promotional strength that amplifies campaign visibility across digital and community channels.'
              },
              {
                icon: ShieldCheck,
                title: 'Direct & Honest Support',
                desc: 'Accessible guidance directly from our Katni team with clear communication and enquiry-focused execution.'
              }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="p-7 rounded-2xl bg-[#F5F8FF] border border-blue-100 hover:border-[#1769FF]/40 transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1769FF] text-white flex items-center justify-center mb-5 shadow-md shadow-blue-500/20">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-[#071B55] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: BUSINESSES WE PROMOTE (ALL 9 CATEGORIES) */}
      <section className="py-20 bg-[#F5F8FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1769FF]">
              Industries & Sectors
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black text-[#071B55]">
              Businesses We Promote
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              Tailored promotional strategies built for every type of commercial enterprise, institution, and growing brand.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BUSINESS_CATEGORIES.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-[#1769FF] shadow-sm hover:shadow-lg transition flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#071B55] group-hover:bg-[#1769FF] text-[#FFC928] group-hover:text-white flex items-center justify-center shrink-0 transition">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#151B2B] group-hover:text-[#071B55]">
                      {cat.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: FEATURED PROMOTIONAL VIDEO STUDIO */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1769FF]">
              Featured Commercial Campaign
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black text-[#071B55]">
              {AGENCY_CONFIG.hindiHeadline}
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              Explore our interactive 7-scene promotional film storyboard showcasing how AFO Company elevates retail shops, hotels, hospitals, schools, and real estate brands.
            </p>
          </div>

          <PromotionalVideoStudio
            onEnquireClick={() => selectServiceAndEnquire('Professional Video Promotion')}
          />
        </div>
      </section>

      {/* SECTION 5: OUR PROMOTIONAL TEAM SPOTLIGHT */}
      <section className="py-20 bg-[#071B55] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC928]/20 text-[#FFC928] text-xs font-extrabold uppercase tracking-wider">
                <Users className="w-4 h-4" /> Coordinated Promotional Strength
              </span>
              <h2 className="text-3xl sm:text-4xl font-black leading-tight">
                {AGENCY_CONFIG.teamNetworkSize} Working to Amplify Your Brand
              </h2>
              <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
                Great digital ads work even better when backed by coordinated promotional energy. Our structured network of 150+ promotional team members supports brand awareness, social campaign amplification, and local market visibility across industries.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => navigateTo('team')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm bg-[#FFC928] text-[#071B55] hover:bg-[#ffd659] transition cursor-pointer"
                >
                  Discover How Our Team Works <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Abstract Vector Network Graphic (No fake portraits) */}
            <div className="lg:col-span-5">
              <div className="p-7 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-sm">
                <svg
                  viewBox="0 0 360 220"
                  className="w-full h-auto"
                  role="img"
                  aria-label="Abstract network diagram representing 150+ coordinated promotional team members"
                >
                  <defs>
                    <linearGradient id="netLine" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#1769FF" />
                      <stop offset="100%" stopColor="#FFC928" />
                    </linearGradient>
                  </defs>
                  {/* Connection Lines */}
                  <g stroke="url(#netLine)" strokeWidth="2" strokeOpacity="0.65">
                    <line x1="180" y1="110" x2="70" y2="45" />
                    <line x1="180" y1="110" x2="290" y2="45" />
                    <line x1="180" y1="110" x2="55" y2="120" />
                    <line x1="180" y1="110" x2="305" y2="120" />
                    <line x1="180" y1="110" x2="85" y2="185" />
                    <line x1="180" y1="110" x2="275" y2="185" />
                    <line x1="70" y1="45" x2="180" y2="30" />
                    <line x1="290" y1="45" x2="180" y2="30" />
                  </g>
                  {/* Outer Team Nodes */}
                  {[
                    [70, 45],
                    [290, 45],
                    [55, 120],
                    [305, 120],
                    [85, 185],
                    [275, 185],
                    [180, 30]
                  ].map(([cx, cy], i) => (
                    <g key={i}>
                      <circle cx={cx} cy={cy} r="14" fill="#1769FF" stroke="#FFC928" strokeWidth="2" />
                      <circle cx={cx} cy={cy} r="4" fill="#FFFFFF" />
                    </g>
                  ))}
                  {/* Central Hub */}
                  <circle cx="180" cy="110" r="38" fill="#071B55" stroke="#FFC928" strokeWidth="3" />
                  <text
                    x="180"
                    y="107"
                    textAnchor="middle"
                    fill="#FFC928"
                    fontWeight="900"
                    fontSize="16"
                  >
                    150+
                  </text>
                  <text
                    x="180"
                    y="123"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontWeight="700"
                    fontSize="8.5"
                  >
                    TEAM NETWORK
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: HOW WE WORK */}
      <section className="py-20 bg-[#F5F8FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1769FF]">
              Our Process
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black text-[#071B55]">
              How We Work
            </h2>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              A clear, transparent 4-step workflow from understanding your business goals to generating customer enquiries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Business Discovery',
                desc: 'We understand your business, offerings, target audience, and promotional goals in Katni or beyond.'
              },
              {
                step: '02',
                title: 'Creative & Video Production',
                desc: 'Our team designs eye-catching ad creatives, promotional scripts, reels, and brand messaging.'
              },
              {
                step: '03',
                title: 'Multi-Channel Launch',
                desc: 'We deploy targeted Facebook, Instagram, WhatsApp, and coordinated team promotion campaigns.'
              },
              {
                step: '04',
                title: 'Enquiries & Growth',
                desc: 'Interested customers connect with you directly via phone call, WhatsApp message, or store visit.'
              }
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white p-7 rounded-2xl border border-slate-200/80 shadow-sm relative"
              >
                <span className="inline-block px-3 py-1 rounded-lg bg-[#071B55] text-[#FFC928] text-xs font-black mb-4">
                  STEP {item.step}
                </span>
                <h3 className="text-lg font-bold text-[#151B2B] mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: WHY BUSINESSES CHOOSE AFO */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1769FF]">
              The AFO Approach
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-black text-[#071B55]">
              Thoughtful Promotion for Growing Businesses
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              From the first conversation to campaign delivery, we keep the focus on your
              business, your audience, and the message you want to share.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="p-6 rounded-2xl bg-[#F5F8FF] border border-slate-200">
              <MessageCircle className="w-6 h-6 text-[#1769FF] mb-4" />
              <h3 className="text-lg font-extrabold text-[#071B55] mb-2">Understand Your Goals</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                We begin by understanding your business, audience, location, and promotional needs.
              </p>
            </article>
            <article className="p-6 rounded-2xl bg-[#F5F8FF] border border-slate-200">
              <Video className="w-6 h-6 text-[#1769FF] mb-4" />
              <h3 className="text-lg font-extrabold text-[#071B55] mb-2">Create With Purpose</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Plan engaging creatives, social media content, and promotional videos around your message.
              </p>
            </article>
            <article className="p-6 rounded-2xl bg-[#F5F8FF] border border-slate-200">
              <Target className="w-6 h-6 text-[#1769FF] mb-4" />
              <h3 className="text-lg font-extrabold text-[#071B55] mb-2">Promote Strategically</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Choose campaign activities that align with your objectives, audience, and budget.
              </p>
            </article>
          </div>
          <div className="mt-8">
            <button
              type="button"
              onClick={() => navigateTo('contact')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#1769FF] hover:text-[#071B55] cursor-pointer"
            >
              Talk to AFO Company <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 8: STRONG BUSINESS ENQUIRY CTA */}
      <section className="py-16 bg-gradient-to-r from-[#071B55] via-[#1769FF] to-[#071B55] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-black">
            Ready to Give Your Business a New Identity?
          </h2>
          <p className="text-blue-100 text-base sm:text-lg max-w-2xl mx-auto">
            Connect with AFO Company today for tailored Facebook & Instagram ads, WhatsApp marketing, and professional promotional videos.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href={AGENCY_CONFIG.phones.primary.telHref}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-extrabold text-sm bg-[#FFC928] text-[#071B55] hover:bg-[#ffd659] transition shadow-lg"
            >
              <Phone className="w-4 h-4" />
              Call {AGENCY_CONFIG.phones.primary.number}
            </a>
            <a
              href={AGENCY_CONFIG.whatsapp.getUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-extrabold text-sm bg-emerald-500 hover:bg-emerald-600 text-white transition shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              Enquire on WhatsApp
            </a>
            <button
              type="button"
              onClick={() => navigateTo('contact')}
              className="inline-flex items-center gap-2 px-6 py-4 rounded-xl font-extrabold text-sm bg-white text-[#071B55] hover:bg-blue-50 transition shadow-lg cursor-pointer"
            >
              Submit Online Enquiry
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

/**
 * ============================================================================
 * 7. PAGE 2: ABOUT US PAGE
 * ============================================================================
 */
const AboutPage = ({ navigateTo }) => {
  return (
    <div className="bg-[#F5F8FF]">
      {/* Page Hero */}
      <section className="bg-[#071B55] text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#FFC928]/20 text-[#FFC928] text-xs font-extrabold uppercase tracking-widest mb-4">
            About AFO Company
          </span>
          <h1 className="text-3xl sm:text-5xl font-black max-w-3xl leading-tight">
            Your Business Deserves a Strong Digital Identity.
          </h1>
          <p className="mt-5 text-blue-100 text-base sm:text-lg max-w-2xl leading-relaxed">
            {AGENCY_CONFIG.companyName} is a dedicated {AGENCY_CONFIG.category} based in {AGENCY_CONFIG.location.full}, committed to helping businesses stand out, connect with customers, and grow sustainably.
          </p>
        </div>
      </section>

      {/* Who We Are & Digital Marketing Approach */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#071B55]">
                Who We Are & What We Do
              </h2>
              <p className="text-slate-700 leading-relaxed text-base">
                In today’s competitive market, having a great shop, hospital, school, restaurant, or real estate project is only half the journey—customers need to see you, trust your brand, and know how to reach you.
              </p>
              <p className="text-slate-700 leading-relaxed text-base">
                <strong>AFO Company</strong> bridges the gap between businesses and their potential buyers through structured digital marketing, high-engagement social media advertising (Facebook, Instagram & WhatsApp), and persuasive professional video promotion.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <Compass className="w-7 h-7 text-[#1769FF] mb-3" />
                  <h3 className="font-bold text-[#071B55] text-base mb-1">
                    Practical Promotion Philosophy
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Every campaign is crafted around real commercial visibility—turning views into phone calls, WhatsApp messages, and customer visits.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <Zap className="w-7 h-7 text-[#FFC928] mb-3" />
                  <h3 className="font-bold text-[#071B55] text-base mb-1">
                    Creative Storytelling
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    We combine clean visual branding with relatable Hindi and English promotional videos that build immediate customer trust.
                  </p>
                </div>
              </div>
            </div>

            {/* Founder & Agency Profile Card (Strictly verified info only) */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl">
                <div className="flex items-center gap-4 pb-6 mb-6 border-b border-slate-100">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#071B55] to-[#1769FF] text-[#FFC928] flex items-center justify-center font-black text-2xl shadow-md">
                    AD
                  </div>
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-[#1769FF]">
                      Leadership
                    </span>
                    <h3 className="text-xl font-black text-[#071B55]">
                      {AGENCY_CONFIG.owner}
                    </h3>
                    <p className="text-sm font-semibold text-slate-500">
                      Owner, {AGENCY_CONFIG.companyName}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-slate-700">
                  <p className="leading-relaxed">
                    Under the leadership of <strong>{AGENCY_CONFIG.owner}</strong>, AFO Company is focused on empowering local businesses, institutions, and emerging brands across Katni and Madhya Pradesh with accessible, results-oriented digital and video promotion.
                  </p>

                  <div className="p-4 rounded-2xl bg-[#F5F8FF] space-y-2.5 text-xs sm:text-sm">
                    <div className="flex items-center gap-2.5 text-[#071B55] font-semibold">
                      <MapPin className="w-4 h-4 text-[#1769FF] shrink-0" />
                      <span>{AGENCY_CONFIG.location.full}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-[#071B55] font-semibold">
                      <Mail className="w-4 h-4 text-[#1769FF] shrink-0" />
                      <a
                        href={`mailto:${AGENCY_CONFIG.email}`}
                        className="hover:underline break-all"
                      >
                        {AGENCY_CONFIG.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2.5 text-[#071B55] font-semibold">
                      <Phone className="w-4 h-4 text-[#1769FF] shrink-0" />
                      <span>
                        {AGENCY_CONFIG.phones.primary.number} / {AGENCY_CONFIG.phones.alternate.number}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MISSION & VISION CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#071B55] text-white shadow-xl relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-[#FFC928] text-[#071B55] flex items-center justify-center mb-5">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#FFC928]">
                Our Purpose
              </span>
              <h3 className="mt-1 text-2xl font-black">Our Mission</h3>
              <p className="mt-4 text-blue-100 text-base leading-relaxed">
                Help businesses establish a stronger digital presence through creative promotional campaigns and digital marketing solutions.
              </p>
            </div>

            <div className="p-8 sm:p-10 rounded-3xl bg-white border-2 border-[#1769FF]/20 text-[#151B2B] shadow-xl">
              <div className="w-12 h-12 rounded-xl bg-[#1769FF] text-white flex items-center justify-center mb-5">
                <Globe className="w-6 h-6" />
              </div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#1769FF]">
                Our Direction
              </span>
              <h3 className="mt-1 text-2xl font-black text-[#071B55]">Our Vision</h3>
              <p className="mt-4 text-slate-600 text-base leading-relaxed">
                Become a trusted promotional and digital marketing agency serving businesses across different industries.
              </p>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1769FF] to-[#071B55] text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black">
                Partner With AFO Company for Your Next Campaign
              </h3>
              <p className="text-blue-100 text-sm sm:text-base mt-1">
                Explore our 10 specialized promotional services or speak directly with our team.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <button
                type="button"
                onClick={() => navigateTo('services')}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-[#FFC928] text-[#071B55] hover:bg-[#ffd659] transition cursor-pointer"
              >
                Explore Services
              </button>
              <button
                type="button"
                onClick={() => navigateTo('contact')}
                className="px-6 py-3.5 rounded-xl font-bold text-sm bg-white/15 hover:bg-white/25 text-white transition cursor-pointer"
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/**
 * ============================================================================
 * 8. PAGE 3: OUR SERVICES PAGE (ALL 10 DETAILED SERVICE SECTIONS)
 * ============================================================================
 */
const ServicesPage = ({ selectServiceAndEnquire, navigateTo }) => {
  return (
    <div className="bg-[#F5F8FF]">
      {/* Services Header */}
      <section className="bg-[#071B55] text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#FFC928]/20 text-[#FFC928] text-xs font-extrabold uppercase tracking-widest mb-4">
            10 Specialized Solutions
          </span>
          <h1 className="text-3xl sm:text-5xl font-black max-w-3xl leading-tight">
            Digital Marketing & Business Promotion Services
          </h1>
          <p className="mt-5 text-blue-100 text-base sm:text-lg max-w-2xl leading-relaxed">
            Every business has unique customers. Explore our ten specialized digital marketing, social media advertising, and video promotion services tailored for real-world business growth.
          </p>

          {/* Quick Jump Pills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {SERVICES_DATA.map((srv) => (
              <a
                key={srv.id}
                href={`#service-${srv.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const el = document.getElementById(`service-${srv.id}`);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-white/10 hover:bg-[#FFC928] hover:text-[#071B55] text-xs font-semibold text-blue-100 transition"
              >
                {srv.number}. {srv.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 10 Detailed Service Sections */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {SERVICES_DATA.map((service, index) => {
            const isEven = index % 2 === 1;
            return (
              <article
                id={`service-${service.id}`}
                key={service.id}
                className="scroll-mt-24 bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Visual & Identity Panel */}
                  <div
                    className={`lg:col-span-4 p-8 sm:p-10 flex flex-col justify-between text-white ${
                      isEven
                        ? 'bg-gradient-to-br from-[#1769FF] to-[#071B55]'
                        : 'bg-gradient-to-br from-[#071B55] to-[#0E2E8A]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-[#FFC928] text-[#071B55] flex items-center justify-center shadow-lg">
                          <ServiceIcon name={service.iconName} className="w-7 h-7" />
                        </div>
                        <span className="text-3xl font-black text-white/25">
                          {service.number}
                        </span>
                      </div>

                      <h2 className="text-2xl font-black leading-snug mb-3">
                        {service.title}
                      </h2>
                      <p className="text-sm text-blue-100 leading-relaxed">
                        {service.shortDesc}
                      </p>
                    </div>

                    {/* Who Needs This Service Tags */}
                    <div className="mt-8 pt-6 border-t border-white/15">
                      <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#FFC928] mb-2.5">
                        Ideal For
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {service.whoNeeds.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-md bg-white/10 text-xs font-medium text-white"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Detailed Breakdown & Key Benefits */}
                  <div className="lg:col-span-8 p-8 sm:p-10 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-widest text-[#1769FF]">
                        Service Overview
                      </span>
                      <p className="mt-2 text-slate-700 text-base leading-relaxed">
                        {service.fullDesc}
                      </p>

                      <h3 className="mt-6 text-sm font-extrabold uppercase tracking-wider text-[#071B55] mb-3.5">
                        Key Benefits
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {service.benefits.map((benefit, bIdx) => (
                          <div
                            key={bIdx}
                            className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F5F8FF] border border-blue-100/80"
                          >
                            <CheckCircle2 className="w-5 h-5 text-[#1769FF] shrink-0 mt-0.5" />
                            <span className="text-sm text-slate-700 font-medium">
                              {benefit}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Row */}
                    <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={() => selectServiceAndEnquire(service.title)}
                        className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-extrabold text-sm bg-[#FFC928] text-[#071B55] hover:bg-[#ffd659] shadow-md transition cursor-pointer"
                      >
                        Enquire Now
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <a
                        href={AGENCY_CONFIG.whatsapp.getUrl(
                          `Hello AFO Company, I would like to enquire about "${service.title}". Please share details.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Ask on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Bottom Enquiry Banner */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#071B55] rounded-3xl p-8 sm:p-12 text-white text-center space-y-5 shadow-2xl">
            <h2 className="text-2xl sm:text-4xl font-black">
              Not Sure Which Promotional Plan Fits Your Business?
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto text-base">
              Tell us about your business or organization, and our Katni team will recommend the right mix of social media advertising and video promotion.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => navigateTo('contact')}
                className="px-7 py-4 rounded-xl font-extrabold text-sm bg-[#FFC928] text-[#071B55] hover:bg-[#ffd659] transition cursor-pointer"
              >
                Request Free Consultation
              </button>
              <a
                href={AGENCY_CONFIG.phones.primary.telHref}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/20 text-white transition"
              >
                <Phone className="w-4 h-4 text-[#FFC928]" />
                Call {AGENCY_CONFIG.phones.primary.number}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/**
 * ============================================================================
 * 9. PAGE 4: OUR TEAM PAGE (150+ PROMOTIONAL TEAM NETWORK — VECTOR GRAPHICS)
 * ============================================================================
 */
const OurTeamPage = ({ navigateTo }) => {
  return (
    <div className="bg-[#F5F8FF]">
      {/* Team Hero */}
      <section className="bg-[#071B55] text-white py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFC928] text-[#071B55] text-xs font-black uppercase tracking-wider">
                <Users className="w-4 h-4" /> {AGENCY_CONFIG.teamNetworkSize}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black leading-tight">
                Creative Promotion. Stronger Business Reach.
              </h1>
              <p className="text-blue-100 text-base sm:text-lg leading-relaxed">
                Behind every successful campaign at AFO Company is a structured, disciplined promotional network. With <strong>150+ Promotional Team Members</strong>, we combine creative digital campaigns with coordinated promotional reach.
              </p>
            </div>

            {/* Bespoke Vector Network Illustration (Strictly no fake employee photos) */}
            <div className="lg:col-span-5">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-[#FFC928] to-[#E0A100] text-[#071B55] font-black text-3xl shadow-xl mb-4">
                  150+
                </div>
                <h2 className="text-xl font-black text-white">
                  {AGENCY_CONFIG.teamNetworkSize}
                </h2>
                <p className="text-sm text-blue-200 mt-2">
                  Coordinated Promotional Network supporting brand awareness, digital sharing, and campaign visibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Team Structure & Coordination Pillars */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Introduction & Coordination */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#071B55] text-[#FFC928] flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-[#071B55]">
                Structured Team Coordination
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                A large promotional network only creates real impact when it operates with clear direction. At AFO Company, campaigns are centrally planned and coordinated so every promotional message, video, and offer reaches audiences consistently and professionally.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#1769FF] text-white flex items-center justify-center">
                <Share2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-[#071B55]">
                Promotional Activities & Reach
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Our promotional team members help amplify business announcements, festive offers, showroom launches, institutional admissions, and brand videos—expanding organic visibility alongside paid Facebook, Instagram, and WhatsApp advertising.
              </p>
            </div>
          </div>

          {/* How the Team Supports Business Campaigns */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#1769FF]">
                Campaign Execution
              </span>
              <h2 className="mt-2 text-3xl font-black text-[#071B55]">
                How Our Promotional Network Supports Your Business
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Campaign Amplification',
                  desc: 'Synchronized sharing and promotion of business videos, posters, and launch offers to maximize initial visibility.'
                },
                {
                  title: 'Community & Local Awareness',
                  desc: 'Helping local shops, residential colonies, schools, and clinics build recognition across neighborhoods.'
                },
                {
                  title: 'Brand Recall & Trust',
                  desc: 'Consistent, repeated brand visibility across digital touchpoints so customers remember your business when they are ready to buy.'
                }
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#F5F8FF] text-[#1769FF] font-black flex items-center justify-center mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#071B55] mb-2">{card.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Why Coordinated Promotional Efforts Matter */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#1769FF]">
                  Strategic Advantage
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#071B55]">
                  Why Coordinated Promotional Efforts Matter
                </h2>                <p className="text-slate-600 text-base leading-relaxed">
                  Isolated posts rarely build a strong market reputation. When creative video production, targeted social media ads, and a 150+ member promotional network work together under one unified strategy, your business achieves faster recognition and stronger customer enquiries.
                </p>
              </div>
              <div className="lg:col-span-4 flex lg:justify-end">
                <button
                  type="button"
                  onClick={() => navigateTo('contact')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-extrabold text-sm bg-[#071B55] hover:bg-[#1769FF] text-white transition cursor-pointer"
                >
                  Launch Your Campaign <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/**
 * ============================================================================
 * 10. PAGE 5: REVIEWS & CONTACT PAGE
 * ============================================================================
 */
const ReviewsAndContactPage = ({ preselectedService }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    mobileNumber: '',
    email: '',
    service: preselectedService || SERVICES_DATA[0].title,
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState({
    status: 'idle', // 'idle' | 'submitting' | 'success' | 'unconfigured' | 'error'
    feedbackMessage: ''
  });

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({ ...prev, service: preselectedService }));
    }
  }, [preselectedService]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
    }
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Please enter your business or organization name.';
    }
    const cleanPhone = formData.mobileNumber.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please share a brief message about your promotional needs.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // WhatsApp requires the customer to confirm by tapping Send; the website
    // can open a pre-filled message but cannot send a WhatsApp message silently.
    const whatsappUrl = AGENCY_CONFIG.whatsapp.getUrl(buildFormattedEnquiryText());
    const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    if (whatsappWindow) {
      setSubmitState({
        status: 'success',
        feedbackMessage:
          'Your enquiry details are ready in WhatsApp. Please review the message and tap Send to deliver it to AFO Company.'
      });
    } else {
      setSubmitState({
        status: 'unconfigured',
        feedbackMessage:
          'Your browser blocked the WhatsApp window. Use the WhatsApp button below to open your pre-filled enquiry, then tap Send.'
      });
    }
  };

  const buildFormattedEnquiryText = () =>
    `Hello AFO Company,\n` +
    `New Business Enquiry:\n` +
    `• Name: ${formData.fullName}\n` +
    `• Business: ${formData.businessName}\n` +
    `• Mobile: ${formData.mobileNumber}\n` +
    (formData.email ? `• Email: ${formData.email}\n` : '') +
    `• Service Interested In: ${formData.service}\n` +
    `• Message: ${formData.message}`;

  return (
    <div className="bg-[#F5F8FF]">
      {/* Page Hero */}
      <section className="bg-[#071B55] text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3.5 py-1 rounded-full bg-[#FFC928]/20 text-[#FFC928] text-xs font-extrabold uppercase tracking-widest mb-4">
            Client Feedback & Direct Contact
          </span>
          <h1 className="text-3xl sm:text-5xl font-black max-w-3xl leading-tight">
            Trusted Promotion. Better Business Connections.
          </h1>
          <p className="mt-5 text-blue-100 text-base sm:text-lg max-w-2xl leading-relaxed">
            See our verified client review showcase structure and reach out directly to AFO Company in Katni, Madhya Pradesh to start your next campaign.
          </p>
        </div>
      </section>

      {/* SECTION A: CLIENT EXPERIENCE & SERVICE HIGHLIGHTS */}
      <section className="py-16 sm:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1769FF]">
              The AFO Experience
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-[#071B55]">
              Promotion That Puts Your Business First
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Every business has a different story. AFO Company focuses on clear communication,
              thoughtful creative work, and promotional campaigns shaped around your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <article className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-[#1769FF] flex items-center justify-center mb-5">
                <MessageCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-[#071B55] mb-2">Clear Communication</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Discuss your business, audience, and requirements directly with our team before
                planning a promotion.
              </p>
            </article>

            <article className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-[#071B55] mb-2">Creative Promotion</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Present your products and services with engaging social media creatives,
                promotional videos, and campaign content.
              </p>
            </article>

            <article className="bg-white p-7 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-extrabold text-[#071B55] mb-2">Goal-Focused Campaigns</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Choose promotional activities that match your business objectives, location,
                audience, and budget.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* SECTION B: CONTACT DIRECTORY & BUSINESS ENQUIRY FORM */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#1769FF]">
              Direct Business Desk
            </span>
            <h2 className="mt-1 text-3xl sm:text-4xl font-black text-[#071B55]">
              Let&apos;s Grow Your Business Together!
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Verified Contact Details & Katni Map */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#071B55] text-white rounded-3xl p-7 sm:p-8 shadow-xl space-y-6">
                <div>
                  <AfoLogo variant="light" size="md" showTagline />
                  <p className="mt-4 text-sm text-blue-200">
                    Owner: <strong className="text-white">{AGENCY_CONFIG.owner}</strong>
                  </p>
                </div>

                {/* Categorized Click-to-Call Phone Numbers */}
                <div className="space-y-3">
                  <span className="block text-xs font-extrabold uppercase tracking-wider text-[#FFC928]">
                    Direct Phone Numbers
                  </span>

                  {[
                    AGENCY_CONFIG.phones.primary,
                    AGENCY_CONFIG.phones.alternate,
                    AGENCY_CONFIG.phones.additional
                  ].map((phoneObj) => (
                    <a
                      key={phoneObj.number}
                      href={phoneObj.telHref}
                      className="flex items-center justify-between p-3.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#1769FF] flex items-center justify-center">
                          <Phone className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-[11px] font-semibold text-blue-200">
                            {phoneObj.label}
                          </div>
                          <div className="text-base font-extrabold text-white group-hover:text-[#FFC928] transition">
                            {phoneObj.number}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#FFC928] text-[#071B55]">
                        Call
                      </span>
                    </a>
                  ))}
                </div>

                {/* WhatsApp & Email Quick Actions */}
                <div className="space-y-3 pt-2">
                  <a
                    href={AGENCY_CONFIG.whatsapp.getUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 p-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm transition shadow-lg"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Chat on WhatsApp ({AGENCY_CONFIG.phones.primary.number})
                  </a>

                  <a
                    href={`mailto:${AGENCY_CONFIG.email}`}
                    className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition"
                  >
                    <Mail className="w-5 h-5 text-[#FFC928] shrink-0" />
                    <div className="min-w-0">
                      <div className="text-[11px] text-blue-200">Official Email</div>
                      <div className="text-sm font-bold text-white truncate">
                        {AGENCY_CONFIG.email}
                      </div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <MapPin className="w-5 h-5 text-[#FFC928] shrink-0" />
                    <div>
                      <div className="text-[11px] text-blue-200">Location</div>
                      <div className="text-sm font-bold text-white">
                        {AGENCY_CONFIG.location.full}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Katni City-Level Map Embed (No invented street address) */}
              <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between px-2 pb-3">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#071B55] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#1769FF]" />
                    {AGENCY_CONFIG.location.full}
                  </span>
                  <a
                    href="https://maps.google.com/?q=Katni,Madhya+Pradesh,India"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#1769FF] hover:underline inline-flex items-center gap-1"
                  >
                    Open Map <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <div className="rounded-2xl overflow-hidden h-56 bg-slate-100">
                  <iframe
                    title="Katni, Madhya Pradesh, India Location Map"
                    src={AGENCY_CONFIG.location.mapEmbedUrl}
                    className="w-full h-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Validated Business Enquiry Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-xl">
                <h3 className="text-2xl font-black text-[#071B55]">
                  Send a Business Enquiry
                </h3>
                <p className="text-sm text-slate-600 mt-1 mb-6">
                  Fill out your business details below and choose your preferred service.
                </p>

                <form onSubmit={handleFormSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[#071B55] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="Enter your full name"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#151B2B] bg-[#F5F8FF] focus:bg-white focus:outline-none focus:ring-2 transition ${
                          errors.fullName
                            ? 'border-red-500 focus:ring-red-200'
                            : 'border-slate-200 focus:border-[#1769FF] focus:ring-blue-100'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs text-red-600 font-medium">
                          {errors.fullName}
                        </p>
                      )}
                    </div>

                    {/* Business Name */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[#071B55] mb-1.5">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) =>
                          setFormData({ ...formData, businessName: e.target.value })
                        }
                        placeholder="Shop, Hotel, Hospital, Brand..."
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#151B2B] bg-[#F5F8FF] focus:bg-white focus:outline-none focus:ring-2 transition ${
                          errors.businessName
                            ? 'border-red-500 focus:ring-red-200'
                            : 'border-slate-200 focus:border-[#1769FF] focus:ring-blue-100'
                        }`}
                      />
                      {errors.businessName && (
                        <p className="mt-1 text-xs text-red-600 font-medium">
                          {errors.businessName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Mobile Number */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[#071B55] mb-1.5">
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.mobileNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, mobileNumber: e.target.value })
                        }
                        placeholder="10-digit mobile number"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#151B2B] bg-[#F5F8FF] focus:bg-white focus:outline-none focus:ring-2 transition ${
                          errors.mobileNumber
                            ? 'border-red-500 focus:ring-red-200'
                            : 'border-slate-200 focus:border-[#1769FF] focus:ring-blue-100'
                        }`}
                      />
                      {errors.mobileNumber && (
                        <p className="mt-1 text-xs text-red-600 font-medium">
                          {errors.mobileNumber}
                        </p>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-extrabold uppercase tracking-wider text-[#071B55] mb-1.5">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="you@business.com"
                        className={`w-full px-4 py-3 rounded-xl border text-sm text-[#151B2B] bg-[#F5F8FF] focus:bg-white focus:outline-none focus:ring-2 transition ${
                          errors.email
                            ? 'border-red-500 focus:ring-red-200'
                            : 'border-slate-200 focus:border-[#1769FF] focus:ring-blue-100'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600 font-medium">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Service Interested In */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#071B55] mb-1.5">
                      Service Interested In *
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-[#151B2B] bg-[#F5F8FF] focus:bg-white focus:border-[#1769FF] focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                    >
                      {SERVICES_DATA.map((srv) => (
                        <option key={srv.id} value={srv.title}>
                          {srv.number}. {srv.title}
                        </option>
                      ))}
                      <option value="Complete Digital & Video Promotion Package">
                        Complete Digital & Video Promotion Package
                      </option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-[#071B55] mb-1.5">
                      Message / Promotional Goals *
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell us about your business, location, and how you want to promote it..."
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-[#151B2B] bg-[#F5F8FF] focus:bg-white focus:outline-none focus:ring-2 transition ${
                        errors.message
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-slate-200 focus:border-[#1769FF] focus:ring-blue-100'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-600 font-medium">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={submitState.status === 'submitting'}
                    className="w-full py-4 px-6 rounded-xl font-extrabold text-base bg-[#071B55] hover:bg-[#1769FF] text-white shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    <Send className="w-5 h-5 text-[#FFC928]" />
                    {submitState.status === 'submitting'
                      ? 'Submitting Enquiry...'
                      : 'Submit Enquiry'}
                  </button>
                </form>

                {/* Status Feedback & Instant WhatsApp / Email Dispatch */}
                {submitState.status !== 'idle' && (
                  <div
                    className={`mt-6 p-5 rounded-2xl border ${
                      submitState.status === 'success'
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                        : 'bg-blue-50 border-blue-200 text-[#071B55]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {submitState.status === 'success' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-[#1769FF] shrink-0 mt-0.5" />
                      )}
                      <div className="space-y-3 text-sm">
                        <p className="font-semibold leading-relaxed">
                          {submitState.feedbackMessage}
                        </p>
                        <div className="flex flex-wrap gap-3">
                          <a
                            href={AGENCY_CONFIG.whatsapp.getUrl(buildFormattedEnquiryText())}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Open WhatsApp Enquiry
                          </a>

                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

/**
 * ============================================================================
 * 11. CUSTOM 404 PAGE (FOR UNKNOWN HASH/ROUTE STATES)
 * ============================================================================
 */
const NotFoundPage = ({ navigateTo }) => (
  <div className="min-h-[70vh] bg-[#F5F8FF] flex items-center justify-center px-4 py-20">
    <div className="max-w-lg w-full bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl text-center space-y-5">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#071B55] text-[#FFC928] font-black text-3xl">
        404
      </div>
      <h1 className="text-2xl sm:text-3xl font-black text-[#071B55]">
        Page Not Found
      </h1>
      <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
        The page you are looking for does not exist or may have moved. Let’s take you back to AFO Company’s main pages.
      </p>
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={() => navigateTo('home')}
          className="px-6 py-3.5 rounded-xl font-extrabold text-sm bg-[#071B55] text-white hover:bg-[#1769FF] transition cursor-pointer"
        >
          Back to Home
        </button>
        <button
          type="button"
          onClick={() => navigateTo('services')}
          className="px-6 py-3.5 rounded-xl font-extrabold text-sm bg-[#FFC928] text-[#071B55] hover:bg-[#ffd659] transition cursor-pointer"
        >
          Explore Services
        </button>
      </div>
    </div>
  </div>
);

/**
 * ============================================================================
 * 12. MAIN APPLICATION SHELL (NAVIGATION, ROUTING, FOOTER, FLOATING WHATSAPP)
 * ============================================================================
 */
export default function App() {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState('');
  const [socialNotice, setSocialNotice] = useState('');

  // Synchronize with URL hash if user navigates via browser back/forward
  useEffect(() => {
    const validRoutes = ['home', 'about', 'services', 'team', 'contact', 'products', 'clothing', 'electronics'];
    const readHash = () => {
      const rawHash = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
      if (!rawHash) {
        setCurrentRoute('home');
      } else if (validRoutes.includes(rawHash)) {
        setCurrentRoute(rawHash);
      } else {
        setCurrentRoute('404');
      }
    };
    readHash();
    window.addEventListener('hashchange', readHash);
    return () => window.removeEventListener('hashchange', readHash);
  }, []);

  // Update dynamic SEO document title & meta description per route
  useEffect(() => {
    const seoMeta = {
      home: {
        title: 'AFO Company | Digital Marketing & Video Promotion Agency in Katni, MP',
        description:
          'Give your business a new identity with AFO Company in Katni, Madhya Pradesh. Facebook & Instagram ads, WhatsApp marketing, and professional video promotion.'
      },
      about: {
        title: 'About Us | AFO Company — Digital Marketing Agency in Katni, Madhya Pradesh',
        description:
          'Learn about AFO Company led by Anu Dubey in Katni, MP—our mission, vision, and practical approach to business and video promotion.'
      },
      services: {
        title: 'Our Services | Facebook, Instagram, WhatsApp & Video Promotion — AFO Company',
        description:
          'Explore all 10 promotional services by AFO Company: Facebook Ads, Instagram Ads, WhatsApp Marketing, Shop, Hotel, Colony, Real Estate, Brand & Video Promotion.'
      },
      team: {
        title: 'Our Team | 150+ Promotional Team Members — AFO Company',
        description:
          'Discover how AFO Company’s coordinated network of 150+ promotional team members supports business visibility and campaign reach.'
      },
      contact: {
        title: 'Reviews & Contact | AFO Company Katni — 9009433331',
        description:
          'Contact AFO Company in Katni, Madhya Pradesh. Call 9009433331, 9713433331, or 9644424384, message on WhatsApp, or submit a business enquiry.'
      },
      products: { title: 'Products & Trading | AFO Company', description: 'Browse clothing and electronics categories from AFO Company and enquire directly on WhatsApp.' },
      clothing: { title: 'Clothing Collection | AFO Company', description: 'Explore clothing categories at AFO Company and enquire about current availability on WhatsApp.' },
      electronics: { title: 'Electronics Collection | AFO Company', description: 'Explore electronics categories at AFO Company and enquire about current availability on WhatsApp.' },
      '404': {
        title: 'Page Not Found | AFO Company',
        description: 'The requested page was not found on AFO Company.'
      }
    };
    const activeMeta = seoMeta[currentRoute] || seoMeta.home;
    document.title = activeMeta.title;

    let metaDescEl = document.querySelector('meta[name="description"]');
    if (!metaDescEl) {
      metaDescEl = document.createElement('meta');
      metaDescEl.name = 'description';
      document.head.appendChild(metaDescEl);
    }
    metaDescEl.setAttribute('content', activeMeta.description);
  }, [currentRoute]);

  const navigateTo = (route) => {
    setCurrentRoute(route);
    setMobileMenuOpen(false);
    try {
      window.history.pushState(null, '', `#/${route}`);
    } catch (_) {
      // Fallback for restricted iframe histories
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectServiceAndEnquire = (serviceTitle) => {
    setPreselectedService(serviceTitle);
    navigateTo('contact');
  };

  const handleSocialClick = (e, platformObj) => {
    if (!platformObj.configured || !platformObj.url) {
      e.preventDefault();
      setSocialNotice(
        `${platformObj.name} link is ready in AGENCY_CONFIG.socialLinks.${platformObj.name.toLowerCase()} — awaiting official URL.`
      );
      setTimeout(() => setSocialNotice(''), 4000);
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'team', label: 'Our Team' },
    { id: 'products', label: 'Products & Trading' },
    { id: 'contact', label: 'Reviews & Contact' }
  ];

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-white text-[#151B2B] font-sans antialiased selection:bg-[#FFC928] selection:text-[#071B55]">
      {/* TOP UTILITY BAR */}
      <div className="bg-[#05133D] text-blue-100 text-xs py-2 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#FFC928]" />
              {AGENCY_CONFIG.location.full}
            </span>
            <a
              href={`mailto:${AGENCY_CONFIG.email}`}
              className="hidden sm:inline-flex items-center gap-1.5 hover:text-[#FFC928] transition"
            >
              <Mail className="w-3.5 h-3.5 text-[#FFC928]" />
              {AGENCY_CONFIG.email}
            </a>
          </div>
          <div className="flex items-center gap-4 font-semibold">
            <a
              href={AGENCY_CONFIG.phones.primary.telHref}
              className="inline-flex items-center gap-1 text-white hover:text-[#FFC928] transition"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFC928]" />
              {AGENCY_CONFIG.phones.primary.number}
            </a>
            <span className="text-white/30">|</span>
            <a
              href={AGENCY_CONFIG.phones.alternate.telHref}
              className="hover:text-[#FFC928] transition"
            >
              {AGENCY_CONFIG.phones.alternate.number}
            </a>
          </div>
        </div>
      </div>

      {/* STICKY MAIN NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <button
              type="button"
              onClick={() => navigateTo('home')}
              className="text-left focus:outline-none cursor-pointer"
              aria-label="AFO Company Home"
            >
              <AfoLogo variant="dark" size="md" />
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
              {navItems.map((item) => {
                const isActive = currentRoute === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigateTo(item.id)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer ${
                      isActive
                        ? 'bg-[#071B55] text-white'
                        : 'text-[#151B2B] hover:bg-[#F5F8FF] hover:text-[#1769FF]'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Desktop Prominent Get Started CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigateTo('contact')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-extrabold text-sm bg-[#FFC928] text-[#071B55] hover:bg-[#ffd659] shadow-md shadow-amber-500/20 transition cursor-pointer"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-[#071B55] hover:bg-[#F5F8FF] border border-slate-200 cursor-pointer"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl">
            {navItems.map((item) => {
              const isActive = currentRoute === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl text-base font-bold flex items-center justify-between transition ${
                    isActive
                      ? 'bg-[#071B55] text-white'
                      : 'text-[#151B2B] hover:bg-[#F5F8FF]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </button>
              );
            })}

            <div className="pt-3 grid grid-cols-2 gap-3">
              <a
                href={AGENCY_CONFIG.phones.primary.telHref}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm bg-[#F5F8FF] text-[#071B55] border border-slate-200"
              >
                <Phone className="w-4 h-4 text-[#1769FF]" />
                Call Now
              </a>
              <button
                type="button"
                onClick={() => navigateTo('contact')}
                className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-extrabold text-sm bg-[#FFC928] text-[#071B55]"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MAIN PAGE CONTENT ROUTER */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <HomePage
            navigateTo={navigateTo}
            selectServiceAndEnquire={selectServiceAndEnquire}
          />
        )}
        {currentRoute === 'about' && <AboutPage navigateTo={navigateTo} />}
        {currentRoute === 'services' && (
          <ServicesPage
            selectServiceAndEnquire={selectServiceAndEnquire}
            navigateTo={navigateTo}
          />
        )}
        {currentRoute === 'team' && <OurTeamPage navigateTo={navigateTo} />}
        {['products', 'clothing', 'electronics'].includes(currentRoute) && (
          <ProductsTrading
            category={currentRoute === 'clothing' ? 'clothing' : currentRoute === 'electronics' ? 'electronics' : 'all'}
            onNavigate={navigateTo}
            getWhatsAppUrl={(message) => AGENCY_CONFIG.whatsapp.getUrl(message)}
          />
        )}
        {currentRoute === 'contact' && (
          <ReviewsAndContactPage preselectedService={preselectedService} />
        )}
        {currentRoute === '404' && <NotFoundPage navigateTo={navigateTo} />}
      </main>

      {/* PROFESSIONAL AGENCY FOOTER */}
      <footer className="bg-[#05133D] text-white pt-16 pb-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
            {/* Brand & Identity */}
            <div className="lg:col-span-4 space-y-4">
              <AfoLogo variant="light" size="md" showTagline />
              <p className="text-sm text-blue-200 leading-relaxed pt-2">
                {AGENCY_CONFIG.companyName} helps businesses, shops, hotels, hospitals, schools, and real estate brands grow visibility through digital marketing, social media ads, and professional video promotion.
              </p>
              <p className="text-xs text-blue-300">
                Owner: <strong className="text-white">{AGENCY_CONFIG.owner}</strong> •{' '}
                {AGENCY_CONFIG.location.full}
              </p>

              {/* Configurable Social Media Links */}
              <div className="pt-2">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-[#FFC928] mb-2.5">
                  Connect With Us
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {Object.values(AGENCY_CONFIG.socialLinks).map((soc) => (
                    <a
                      key={soc.name}
                      href={soc.configured ? soc.url : '#social-config'}
                      target={soc.configured ? '_blank' : undefined}
                      rel={soc.configured ? 'noopener noreferrer' : undefined}
                      onClick={(e) => handleSocialClick(e, soc)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition ${
                        soc.configured
                          ? 'bg-emerald-600/20 border-emerald-400/40 text-emerald-200 hover:bg-emerald-600 hover:text-white'
                          : 'bg-white/5 border-white/15 text-blue-200 hover:border-[#FFC928] hover:text-[#FFC928]'
                      }`}
                    >
                      {soc.name}
                    </a>
                  ))}
                </div>
                {socialNotice && (
                  <p className="mt-2 text-[11px] text-[#FFC928] bg-white/5 p-2 rounded-lg">
                    {socialNotice}
                  </p>
                )}
              </div>
            </div>

            {/* Quick Navigation */}
            <div className="lg:col-span-2 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#FFC928]">
                Navigation
              </h3>
              <ul className="space-y-2.5 text-sm text-blue-200">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => navigateTo(item.id)}
                      className="hover:text-[#FFC928] transition cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Key Services */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#FFC928]">
                Core Services
              </h3>
              <ul className="space-y-2.5 text-sm text-blue-200">
                {SERVICES_DATA.slice(0, 6).map((srv) => (
                  <li key={srv.id}>
                    <button
                      type="button"
                      onClick={() => selectServiceAndEnquire(srv.title)}
                      className="text-left hover:text-[#FFC928] transition cursor-pointer"
                    >
                      {srv.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Directory */}
            <div className="lg:col-span-3 space-y-3">
              <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#FFC928]">
                Contact Directory
              </h3>
              <div className="space-y-2.5 text-sm text-blue-100">
                <div>
                  <span className="text-[11px] text-blue-300 block">
                    {AGENCY_CONFIG.phones.primary.label}
                  </span>
                  <a
                    href={AGENCY_CONFIG.phones.primary.telHref}
                    className="font-bold text-white hover:text-[#FFC928]"
                  >
                    {AGENCY_CONFIG.phones.primary.number}
                  </a>
                </div>
                <div>
                  <span className="text-[11px] text-blue-300 block">
                    {AGENCY_CONFIG.phones.alternate.label}
                  </span>
                  <a
                    href={AGENCY_CONFIG.phones.alternate.telHref}
                    className="font-bold text-white hover:text-[#FFC928]"
                  >
                    {AGENCY_CONFIG.phones.alternate.number}
                  </a>
                </div>
                <div>
                  <span className="text-[11px] text-blue-300 block">
                    {AGENCY_CONFIG.phones.additional.label}
                  </span>
                  <a
                    href={AGENCY_CONFIG.phones.additional.telHref}
                    className="font-bold text-white hover:text-[#FFC928]"
                  >
                    {AGENCY_CONFIG.phones.additional.number}
                  </a>
                </div>
                <div className="pt-1">
                  <span className="text-[11px] text-blue-300 block">Email</span>
                  <a
                    href={`mailto:${AGENCY_CONFIG.email}`}
                    className="text-xs font-semibold text-white hover:text-[#FFC928] break-all"
                  >
                    {AGENCY_CONFIG.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-300">
            <p>
              © {new Date().getFullYear()} {AGENCY_CONFIG.companyName}. All rights reserved. •{' '}
              {AGENCY_CONFIG.tagline}
            </p>
            <p>Digital Marketing & Video Promotion Agency • {AGENCY_CONFIG.location.full}</p>
          </div>        </div>
      </footer>

      {/* FLOATING WHATSAPP ENQUIRY BUTTON */}
      <a
        href={AGENCY_CONFIG.whatsapp.getUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Enquire with AFO Company on WhatsApp"
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-sm shadow-2xl shadow-emerald-950/40 transition transform hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 fill-current" />
        <span className="hidden sm:inline">WhatsApp Enquiry</span>
      </a>
    </div>
  );
}