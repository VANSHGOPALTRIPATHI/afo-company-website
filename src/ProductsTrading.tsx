import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Shirt,
  Smartphone,
  MessageCircle,
  Search,
  ShoppingBag,
  Laptop,
  Tv,
  Headphones,
  Watch,
  Baby,
  Footprints,
  Sparkles,
  Plug,
  Camera,
  Home,
  Monitor,
  Gamepad2
} from 'lucide-react';

type Category = 'all' | 'clothing' | 'electronics';

type CategoryGroup = { title: string; detail: string; icon: React.ComponentType<{ className?: string }> };

type Props = {
  category: Category;
  onNavigate: (route: string) => void;
  getWhatsAppUrl: (message: string) => string;
};

const clothingGroups: CategoryGroup[] = [
  { title: 'Men’s Clothing', detail: 'Everyday wear, formalwear, casualwear and more.', icon: Shirt },
  { title: 'Women’s Clothing', detail: 'Ethnic, western, casual and occasion wear.', icon: ShoppingBag },
  { title: 'Kids’ Clothing', detail: 'Clothing options for babies, kids and teens.', icon: Baby },
  { title: 'Ethnic & Traditional Wear', detail: 'Traditional outfits and festive collections.', icon: Sparkles },
  { title: 'Winterwear', detail: 'Jackets, sweaters, sweatshirts and warm layers.', icon: Home },
  { title: 'Footwear & Accessories', detail: 'Shoes, bags, belts and fashion accessories.', icon: Footprints }
];

const electronicsGroups: CategoryGroup[] = [
  { title: 'Mobiles & Smartphones', detail: 'Ask about available phone models and options.', icon: Smartphone },
  { title: 'Laptops & Computers', detail: 'Laptops, desktops and computer accessories.', icon: Laptop },
  { title: 'Televisions & Displays', detail: 'Televisions, monitors and display products.', icon: Tv },
  { title: 'Audio & Headphones', detail: 'Earphones, headphones, speakers and audio gear.', icon: Headphones },
  { title: 'Home Appliances', detail: 'Useful appliances and home electronics.', icon: Plug },
  { title: 'Cameras & Gadgets', detail: 'Cameras, smart devices and everyday gadgets.', icon: Camera },
  { title: 'Wearables', detail: 'Smart watches and wearable accessories.', icon: Watch },
  { title: 'Gaming & Accessories', detail: 'Gaming devices and related accessories.', icon: Gamepad2 },
  { title: 'Other Electronics', detail: 'Tell us what electronic product you need.', icon: Monitor }
];

export default function ProductsTrading({ category, onNavigate, getWhatsAppUrl }: Props) {
  const showClothing = category === 'all' || category === 'clothing';
  const showElectronics = category === 'all' || category === 'electronics';
  const title = category === 'clothing' ? 'Clothing Collection' : category === 'electronics' ? 'Electronics Collection' : 'Products & Trading';
  const intro = category === 'clothing'
    ? 'Explore clothing categories for men, women and children. Contact AFO for current designs, sizes and availability.'
    : category === 'electronics'
      ? 'Explore electronics categories, from personal devices to home technology. Contact AFO for current models and availability.'
      : 'Explore clothing and electronics through AFO Company. Browse a category and enquire directly on WhatsApp.';

  const enquire = (item: string, department: string) => {
    const message = `Hello AFO Company, I would like to enquire about ${item} in the ${department} category. Please share the currently available options, details and prices.`;
    window.open(getWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  const renderGroup = (items: CategoryGroup[], department: string) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <article key={item.title} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-xl bg-[#EEF3FF] text-[#1746A2] flex items-center justify-center mb-5">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-extrabold text-[#071B55]">{item.title}</h3>
            <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{item.detail}</p>
            <button
              type="button"
              onClick={() => enquire(item.title, department)}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-700 transition"
            >
              <MessageCircle className="w-4 h-4" /> Enquire on WhatsApp
            </button>
          </article>
        );
      })}
    </div>
  );

  return (
    <div className="flex-1 bg-[#F7F9FE]">
      <section className="bg-[#071B55] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <button type="button" onClick={() => onNavigate('home')} className="inline-flex items-center gap-2 text-sm font-semibold text-blue-100 hover:text-[#FFC928] mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </button>
          <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#FFC928]">AFO Company • Products & Trading</p>
          <h1 className="mt-4 max-w-3xl text-4xl sm:text-5xl font-black tracking-tight">{title}</h1>
          <p className="mt-5 max-w-2xl text-base sm:text-lg leading-8 text-blue-100">{intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" onClick={() => onNavigate('products')} className={`rounded-xl px-5 py-3 text-sm font-bold transition ${category === 'all' ? 'bg-[#FFC928] text-[#071B55]' : 'bg-white/10 text-white hover:bg-white/20'}`}>All Products</button>
            <button type="button" onClick={() => onNavigate('clothing')} className={`rounded-xl px-5 py-3 text-sm font-bold transition ${category === 'clothing' ? 'bg-[#FFC928] text-[#071B55]' : 'bg-white/10 text-white hover:bg-white/20'}`}>Clothing</button>
            <button type="button" onClick={() => onNavigate('electronics')} className={`rounded-xl px-5 py-3 text-sm font-bold transition ${category === 'electronics' ? 'bg-[#FFC928] text-[#071B55]' : 'bg-white/10 text-white hover:bg-white/20'}`}>Electronics</button>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-8 rounded-2xl border border-blue-100 bg-white p-5 sm:p-6 flex gap-3 items-start">
          <Search className="w-5 h-5 mt-0.5 text-[#1746A2] shrink-0" />
          <p className="text-sm leading-6 text-slate-600">This is a category enquiry catalogue. Product photos, exact models, prices and stock will be added only after AFO confirms the actual inventory. Please enquire for current availability.</p>
        </div>
        {showClothing && (
          <div className="mb-14">
            <div className="flex items-end justify-between gap-4 mb-6">
              <div><p className="text-xs font-bold uppercase tracking-widest text-[#1746A2]">Fashion & Apparel</p><h2 className="mt-2 text-2xl sm:text-3xl font-black text-[#071B55]">Clothing</h2></div>
              {category === 'all' && <button type="button" onClick={() => onNavigate('clothing')} className="text-sm font-bold text-[#1746A2] inline-flex items-center gap-1">View all <ArrowRight className="w-4 h-4" /></button>}
            </div>
            {renderGroup(clothingGroups, 'Clothing')}
          </div>
        )}
        {showElectronics && (
          <div>
            <div className="flex items-end justify-between gap-4 mb-6">
              <div><p className="text-xs font-bold uppercase tracking-widest text-[#1746A2]">Technology & Devices</p><h2 className="mt-2 text-2xl sm:text-3xl font-black text-[#071B55]">Electronics</h2></div>
              {category === 'all' && <button type="button" onClick={() => onNavigate('electronics')} className="text-sm font-bold text-[#1746A2] inline-flex items-center gap-1">View all <ArrowRight className="w-4 h-4" /></button>}
            </div>
            {renderGroup(electronicsGroups, 'Electronics')}
          </div>
        )}
      </section>
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div><h2 className="text-xl font-extrabold text-[#071B55]">Looking for something specific?</h2><p className="mt-1 text-sm text-slate-600">Send AFO your requirement and ask about current options.</p></div>
          <button type="button" onClick={() => enquire('a product requirement', 'general products')} className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3.5 text-sm font-extrabold text-white hover:bg-emerald-700"><MessageCircle className="w-4 h-4" /> Ask on WhatsApp</button>
        </div>
      </section>
    </div>
  );
}
