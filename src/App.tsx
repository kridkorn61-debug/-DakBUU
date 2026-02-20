/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu as MenuIcon, 
  X, 
  Phone, 
  Clock, 
  MapPin, 
  Zap, 
  QrCode, 
  Wind, 
  ChevronRight,
  Instagram,
  Facebook,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: 'curry' | 'side' | 'drink' | 'dessert';
  image: string;
  tags?: string[];
}

// --- Constants ---
const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: 'แกงเขียวหวานไก่',
    description: 'แกงเขียวหวานรสชาติเข้มข้น ไก่นุ่ม กะทิสดใหม่',
    price: 65,
    category: 'curry',
    image: 'https://picsum.photos/seed/curry1/600/400',
    tags: ['แนะนำ', 'ขายดี']
  },
  {
    id: 2,
    name: 'พะแนงหมู',
    description: 'พะแนงหมูรสกลมกล่อม หอมเครื่องแกง ถั่วลิสงคั่วเอง',
    price: 70,
    category: 'curry',
    image: 'https://picsum.photos/seed/curry2/600/400',
    tags: ['แนะนำ']
  },
  {
    id: 3,
    name: 'มัสมั่นไก่',
    description: 'มัสมั่นไก่เนื้อนุ่ม มันฝรั่งชิ้นโต รสชาติหวานนำเค็มตาม',
    price: 75,
    category: 'curry',
    image: 'https://picsum.photos/seed/curry3/600/400',
    tags: ['ขายดี']
  },
  {
    id: 4,
    name: 'ไข่พะโล้',
    description: 'ไข่พะโล้สูตรโบราณ เคี่ยวจนเข้าเนื้อ หมูสามชั้นนุ่มละลาย',
    price: 55,
    category: 'side',
    image: 'https://picsum.photos/seed/side1/600/400',
    tags: ['ยอดนิยม']
  },
  {
    id: 5,
    name: 'ผัดกะเพราหมูสับ',
    description: 'กะเพราแท้ ไม่ใส่ถั่วฝักยาว เผ็ดร้อนถึงใจ',
    price: 60,
    category: 'side',
    image: 'https://picsum.photos/seed/side2/600/400',
    tags: ['เผ็ด']
  },
  {
    id: 6,
    name: 'ชาไทยนมสด',
    description: 'ชาไทยหอมกรุ่น ผสมนมสดแท้ รสชาติเข้มข้น',
    price: 45,
    category: 'drink',
    image: 'https://picsum.photos/seed/drink1/600/400',
    tags: ['ขายดี']
  },
  {
    id: 7,
    name: 'น้ำลำไยสด',
    description: 'น้ำลำไยหวานเย็นชื่นใจ เนื้อลำไยเน้นๆ',
    price: 40,
    category: 'drink',
    image: 'https://picsum.photos/seed/drink2/600/400'
  },
  {
    id: 8,
    name: 'ลอดช่องสิงคโปร์',
    description: 'ลอดช่องเส้นเหนียวนุ่ม ในน้ำกะทิหอมควันเทียน',
    price: 35,
    category: 'dessert',
    image: 'https://picsum.photos/seed/dessert1/600/400'
  }
];

const CATEGORIES = [
  { id: 'curry', label: 'ข้าวแกง' },
  { id: 'side', label: 'กับข้าว' },
  { id: 'drink', label: 'เครื่องดื่ม' },
  { id: 'dessert', label: 'ของหวาน' }
];

// --- Components ---

const Navbar = ({ activeSection, setActiveSection }: { activeSection: string, setActiveSection: (s: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'หน้าแรก' },
    { id: 'menu', label: 'เมนู' },
    { id: 'order', label: 'วิธีสั่งอาหาร' },
    { id: 'about', label: 'เกี่ยวกับเรา' },
    { id: 'contact', label: 'ติดต่อ' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => { setActiveSection('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <span className="text-2xl font-display font-bold tracking-tight">
            <span className="text-brand-gold">ข้าวแกง</span>
            <span className="text-brand-dark">DakBuu</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => {
                setActiveSection(link.id);
                const el = document.getElementById(link.id);
                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`text-sm font-medium transition-colors hover:text-brand-gold ${activeSection === link.id ? 'text-brand-gold' : 'text-brand-dark/70'}`}
            >
              {link.label}
            </button>
          ))}
          <a href="tel:0610413231" className="btn-gold flex items-center gap-2 text-sm">
            <Phone size={16} />
            061-041-3231
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-dark" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-b border-black/5 p-6 md:hidden flex flex-col space-y-4 shadow-xl"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveSection(link.id);
                  setIsMobileMenuOpen(false);
                  const el = document.getElementById(link.id);
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`text-lg font-medium text-left ${activeSection === link.id ? 'text-brand-gold' : 'text-brand-dark'}`}
              >
                {link.label}
              </button>
            ))}
            <a href="tel:0610413231" className="btn-gold flex justify-center items-center gap-2">
              <Phone size={18} />
              โทรสั่งล่วงหน้า
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onMenuClick, onOrderClick }: { onMenuClick: () => void, onOrderClick: () => void }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/thai-food/1920/1080?blur=2" 
          alt="Background" 
          className="w-full h-full object-cover opacity-10"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 to-[#F9F9F9]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
            ข้าวแกงเร็วทันใจ <br />
            <span className="text-brand-gold">สำหรับเด็กยุคใหม่</span>
          </h1>
          <p className="text-xl text-brand-dark/70 mb-10 max-w-lg leading-relaxed">
            สแกนสั่ง • รับไว • โทรสั่งล่วงหน้า <br />
            อิ่มอร่อยในห้องแอร์เย็นสบาย พร้อมลุยคาบเรียนต่อไป
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={onMenuClick} className="btn-gold text-lg px-10">ดูเมนู</button>
            <button onClick={onOrderClick} className="btn-outline text-lg px-10">วิธีสั่งอาหาร</button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <img 
              src="https://picsum.photos/seed/curry-hero/800/800" 
              alt="Thai Curry" 
              className="w-full aspect-square object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-brand-gold rounded-full flex items-center justify-center text-white font-bold text-center p-4 rotate-12 shadow-lg z-20">
            สูตรเด็ด <br /> ต้องลอง!
          </div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -z-10"></div>
        </motion.div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: <Zap className="text-brand-gold" size={32} />, title: "ได้อาหารเร็ว", desc: "ไม่ต้องรอนาน ทันเวลาเรียนแน่นอน" },
    { icon: <QrCode className="text-brand-gold" size={32} />, title: "สแกนสั่งที่โต๊ะ", desc: "สะดวก สบาย ไม่ต้องลุกไปสั่ง" },
    { icon: <Phone className="text-brand-gold" size={32} />, title: "โทรสั่งล่วงหน้า", desc: "โทรสั่งก่อนถึงร้าน ได้ทานทันที" },
    { icon: <Wind className="text-brand-gold" size={32} />, title: "ห้องแอร์นั่งสบาย", desc: "พักผ่อนคลายร้อน ในบรรยากาศมินิมอล" },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-[#F9F9F9] border border-black/5 hover:border-brand-gold/30 transition-colors group"
            >
              <div className="mb-6 p-4 bg-white rounded-xl w-fit shadow-sm group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-brand-dark/60 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MenuSection = () => {
  const [activeTab, setActiveTab] = useState('curry');

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeTab);

  return (
    <section id="menu" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">เมนูแนะนำ</h2>
          <p className="text-brand-dark/60 max-w-2xl mx-auto">
            คัดสรรวัตถุดิบคุณภาพ ปรุงสดใหม่ทุกวัน รสชาติไทยแท้ที่ถูกใจคนรุ่นใหม่
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-8 py-3 rounded-full font-medium transition-all ${activeTab === cat.id ? 'bg-brand-gold text-white shadow-lg' : 'bg-white text-brand-dark hover:bg-brand-gold/10'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence mode="wait">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden card-shadow group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    {item.tags?.map((tag, idx) => (
                      <span key={idx} className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tag === 'เผ็ด' ? 'bg-red-500 text-white' : 'bg-brand-gold text-white'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{item.name}</h3>
                    <span className="text-brand-gold font-bold text-lg">{item.price}.-</span>
                  </div>
                  <p className="text-brand-dark/60 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <button className="w-full py-3 rounded-xl border border-brand-gold/20 text-brand-gold font-medium hover:bg-brand-gold hover:text-white transition-colors flex items-center justify-center gap-2">
                    สั่งเลย <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const HowToOrder = () => {
  const steps = [
    { number: "01", title: "นั่งโต๊ะ", desc: "เลือกที่นั่งในห้องแอร์เย็นๆ ตามใจชอบ" },
    { number: "02", title: "สแกน QR", desc: "ใช้มือถือสแกน QR Code ที่ตั้งอยู่บนโต๊ะ" },
    { number: "03", title: "เลือกเมนู", desc: "เลือกอาหารและเครื่องดื่มที่ต้องการผ่านระบบ" },
    { number: "04", title: "รับอาหารเร็ว", desc: "รอเพียงครู่เดียว อาหารร้อนๆ ก็พร้อมเสิร์ฟ" },
  ];

  return (
    <section id="order" className="py-24 bg-brand-dark text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -z-0"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">วิธีสั่งอาหารง่ายๆ</h2>
            <div className="space-y-8">
              {steps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-6"
                >
                  <span className="text-4xl font-display font-bold text-brand-gold opacity-50">{step.number}</span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-white/60 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg p-10 rounded-[40px] border border-white/10 text-center"
          >
            <div className="mb-8 inline-block p-6 bg-brand-gold rounded-3xl shadow-xl">
              <Phone size={48} className="text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-4">โทรสั่งล่วงหน้า</h3>
            <p className="text-white/60 mb-8 max-w-sm mx-auto">
              ไม่อยากรอนาน? โทรสั่งก่อนถึงร้าน 15-20 นาที <br /> มาถึงปุ๊บ ได้ทานปั๊บ!
            </p>
            <a 
              href="tel:0610413231" 
              className="inline-flex items-center gap-3 bg-brand-gold text-white px-10 py-5 rounded-full text-2xl font-bold shadow-2xl hover:scale-105 transition-transform"
            >
              061-041-3231
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <img src="https://picsum.photos/seed/restaurant1/400/600" alt="Vibe 1" className="rounded-3xl w-full h-80 object-cover mt-12" referrerPolicy="no-referrer" />
            <img src="https://picsum.photos/seed/restaurant2/400/600" alt="Vibe 2" className="rounded-3xl w-full h-80 object-cover" referrerPolicy="no-referrer" />
          </motion.div>

          <div>
            <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">ร้านข้าวแกงยุคใหม่ <br />เพื่อคนเวลาน้อย</h2>
            <p className="text-brand-dark/70 text-lg leading-relaxed mb-8">
              ข้าวแกงDakBuu เกิดจากความเข้าใจในไลฟ์สไตล์ของนักเรียนและนักศึกษาที่ต้องเร่งรีบแข่งกับเวลา เราจึงสร้างพื้นที่ที่เสิร์ฟความอร่อยแบบไทยแท้ ในบรรยากาศที่ทันสมัยและสะดวกสบาย
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-display font-bold text-brand-gold mb-2">100%</h4>
                <p className="text-sm text-brand-dark/60 font-medium">วัตถุดิบสดใหม่ทุกวัน</p>
              </div>
              <div>
                <h4 className="text-3xl font-display font-bold text-brand-gold mb-2">15 นาที</h4>
                <p className="text-sm text-brand-dark/60 font-medium">เวลาเฉลี่ยในการรับอาหาร</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-[40px] overflow-hidden card-shadow grid md:grid-cols-2">
          <div className="p-12 lg:p-20">
            <h2 className="text-4xl font-display font-bold mb-10">ติดต่อเรา</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="p-4 bg-brand-gold/10 rounded-2xl text-brand-gold h-fit">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">เบอร์โทรศัพท์</h4>
                  <p className="text-brand-dark/60">061-041-3231</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="p-4 bg-brand-gold/10 rounded-2xl text-brand-gold h-fit">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">เวลาทำการ</h4>
                  <p className="text-brand-dark/60">ทุกวัน: 10:00 – 20:00 น.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="p-4 bg-brand-gold/10 rounded-2xl text-brand-gold h-fit">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">ที่ตั้งร้าน</h4>
                  <p className="text-brand-dark/60">ย่านมหาวิทยาลัย (ใกล้ประตูทางออกหลัก)</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a href="#" className="p-4 bg-[#F9F9F9] rounded-full hover:bg-brand-gold hover:text-white transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-4 bg-[#F9F9F9] rounded-full hover:bg-brand-gold hover:text-white transition-all">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="relative h-96 md:h-auto bg-brand-dark/5">
            {/* Placeholder for Map */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
              <MapPin size={48} className="text-brand-gold mb-4" />
              <p className="text-brand-dark/40 font-medium">
                แผนที่ร้าน ข้าวแกงDakBuu <br />
                (Google Maps Embed Placeholder)
              </p>
              <button className="mt-6 btn-outline">เปิดใน Google Maps</button>
            </div>
            <img 
              src="https://picsum.photos/seed/map/800/800?grayscale" 
              alt="Map Background" 
              className="w-full h-full object-cover opacity-20"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 border-b border-white/10 pb-12 mb-12">
          <div className="text-center md:text-left">
            <span className="text-3xl font-display font-bold tracking-tight">
              <span className="text-brand-gold">ข้าวแกง</span>
              <span>DakBuu</span>
            </span>
            <p className="mt-4 text-white/40 max-w-xs">
              ข้าวแกงยุคใหม่ อร่อย เร็ว ทันใจ ในห้องแอร์เย็นสบาย
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
            <a href="#home" className="hover:text-brand-gold transition-colors">หน้าแรก</a>
            <a href="#menu" className="hover:text-brand-gold transition-colors">เมนู</a>
            <a href="#order" className="hover:text-brand-gold transition-colors">วิธีสั่งอาหาร</a>
            <a href="#about" className="hover:text-brand-gold transition-colors">เกี่ยวกับเรา</a>
            <a href="#contact" className="hover:text-brand-gold transition-colors">ติดต่อ</a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-white/40">
          <p>© 2024 ข้าวแกงDakBuu. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = ['home', 'menu', 'order', 'about', 'contact'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="font-sans selection:bg-brand-gold/30 selection:text-brand-gold">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main>
        <Hero 
          onMenuClick={() => scrollTo('menu')} 
          onOrderClick={() => scrollTo('order')} 
        />
        <Features />
        <MenuSection />
        <HowToOrder />
        <About />
        <Contact />
      </main>

      <Footer />

      {/* Mobile Floating Call Button */}
      <a 
        href="tel:0610413231" 
        className="md:hidden fixed bottom-6 right-6 z-40 bg-brand-gold text-white p-4 rounded-full shadow-2xl animate-bounce"
      >
        <Phone size={24} />
      </a>
    </div>
  );
}
