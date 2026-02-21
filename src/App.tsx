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
  // ข้าวแกง
  {
    id: 1,
    name: 'ข้าวแกงเขียวหวานไก่',
    description: 'แกงเขียวหวานไก่รสชาติเข้มข้น เสิร์ฟพร้อมข้าวสวยร้อนๆ',
    price: 55,
    category: 'curry',
    image: 'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa6rjAoVzo6w5As8O2Ufy8ntnjD6u2AbjENB83cuVgGXC9UNuVu7z.jpg',
    tags: ['แนะนำ']
  },
  {
    id: 2,
    name: 'ข้าวแกงพะแนงหมู',
    description: 'พะแนงหมูรสกลมกล่อม หอมเครื่องแกง เสิร์ฟพร้อมข้าวสวย',
    price: 60,
    category: 'curry',
    image: 'https://www.lemon8-app.com/seo/image?item_id=7407071999333630480&index=0&sign=418ec2019324f680ab7a1124007de147'
  },
  {
    id: 3,
    name: 'ข้าวกะเพราไก่',
    description: 'กะเพราไก่รสจัดจ้าน ผัดสดใหม่ทุกจาน',
    price: 55,
    category: 'curry',
    image: 'https://images.aws.nestle.recipes/original/d07e6b16c5cec0c55ce05de7dc2c1c04_artboard_2.jpg',
    tags: ['ขายดี']
  },
  {
    id: 4,
    name: 'ข้าวหมูทอด',
    description: 'หมูทอดสูตรเด็ด กรอบนอกนุ่มใน ทานคู่กับข้าวสวย',
    price: 50,
    category: 'curry',
    image: 'https://mpics.mgronline.com/pics/Images/567000010834703.JPEG',
    tags: ['แนะนำ']
  },
  {
    id: 5,
    name: 'ข้าวไก่ทอด',
    description: 'ไก่ทอดกรอบๆ เสิร์ฟพร้อมข้าวสวยร้อนๆ',
    price: 50,
    category: 'curry',
    image: 'https://img.wongnai.com/p/400x0/2020/05/26/90c731eed3dd4cfdad008eef21a22cfe.jpg'
  },
  {
    id: 6,
    name: 'ข้าวไข่พะโล้',
    description: 'ไข่พะโล้รสชาติกลมกล่อม ราดข้าวสวยร้อนๆ',
    price: 55,
    category: 'curry',
    image: 'https://img.wongnai.com/p/1920x0/2017/05/10/fea38f881ce1457ab2b4a1d0156ec448.jpg'
  },
  // กับข้าว
  {
    id: 7,
    name: 'เขียวหวานไก่ (กับ)',
    description: 'แกงเขียวหวานไก่ถ้วยใหญ่ เครื่องแน่น รสชาติไทยแท้',
    price: 70,
    category: 'side',
    image: 'https://static.thairath.co.th/media/dFQROr7oWzulq5Fa6rjAoVzo6w5As8O2Ufy8ntnjD6u2AbjENB83cuVgGXC9UNuVu7z.jpg',
  },
  {
    id: 8,
    name: 'พะแนงหมู (กับ)',
    description: 'พะแนงหมูถ้วยใหญ่ รสชาติเข้มข้นถึงใจ',
    price: 75,
    category: 'side',
    image: 'https://www.lemon8-app.com/seo/image?item_id=7407071999333630480&index=0&sign=418ec2019324f680ab7a1124007de147',
    tags: ['ขายดี']
  },
  {
    id: 9,
    name: 'หมูทอด (กับ)',
    description: 'หมูทอดจานใหญ่ แบ่งทานได้หลายคน',
    price: 70,
    category: 'side',
    image: 'https://mpics.mgronline.com/pics/Images/567000010834703.JPEG'
  },
  {
    id: 10,
    name: 'ไก่ทอด (กับ)',
    description: 'ไก่ทอดจานใหญ่ กรอบอร่อยทุกชิ้น',
    price: 70,
    category: 'side',
    image: 'https://img.wongnai.com/p/400x0/2020/05/26/90c731eed3dd4cfdad008eef21a22cfe.jpg'
  },
  {
    id: 11,
    name: 'ไข่พะโล้ (กับ)',
    description: 'ไข่พะโล้ถ้วยใหญ่ หมูสามชั้นนุ่มละลาย',
    price: 60,
    category: 'side',
    image: 'https://img.wongnai.com/p/1920x0/2017/05/10/fea38f881ce1457ab2b4a1d0156ec448.jpg'
  },
  {
    id: 12,
    name: 'ต้มจืดเต้าหู้หมูสับ',
    description: 'ต้มจืดร้อนๆ ซดคล่องคอ เต้าหู้นุ่มหมูสับแน่น',
    price: 60,
    category: 'side',
    image: 'https://img.wongnai.com/p/1920x0/2019/12/17/0e56df4a81334fbf88b302ba28897d3b.jpg'
  },
  // เครื่องดื่ม
  {
    id: 13,
    name: 'น้ำเก๊กฮวย',
    description: 'น้ำเก๊กฮวยเย็นๆ หวานกำลังดี แก้กระหาย',
    price: 20,
    category: 'drink',
    image: 'https://cms.kapook.com/uploads/tag/42/ID_40898_5a8662507138d.jpg'
  },
  {
    id: 14,
    name: 'ชาไทยเย็น',
    description: 'ชาไทยหอมกรุ่น รสชาติเข้มข้นสไตล์ไทย',
    price: 25,
    category: 'drink',
    image: 'https://aromathailand.com/wp-content/uploads/2024/02/shutterstock_1139687273.jpeg',
    tags: ['แนะนำ']
  },
  {
    id: 15,
    name: 'น้ำเปล่า',
    description: 'น้ำดื่มสะอาด เย็นชื่นใจ',
    price: 10,
    category: 'drink',
    image: 'https://img.th.my-best.com/product_images/d68638208391099f2dc353bffc6ab717.jpeg?ixlib=rails-4.3.1&q=70&lossless=0&w=800&h=800&fit=clip&s=7845671ef59dc1c5f371e538e82e78c3'
  },
  {
    id: 16,
    name: 'น้ำอัดลม',
    description: 'น้ำอัดลมเย็นๆ เลือกได้หลากหลายรสชาติ',
    price: 20,
    category: 'drink',
    image: 'https://www.consumerthai.org/images/stories/food/570211_coca.jpg'
  }
];

const CATEGORIES = [
  { id: 'curry', label: 'ข้าวแกง' },
  { id: 'side', label: 'กับข้าว' },
  { id: 'drink', label: 'เครื่องดื่ม' }
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
            <span className="text-white">DakBuu</span>
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
              className={`text-sm font-medium transition-colors hover:text-brand-gold ${activeSection === link.id ? 'text-brand-gold' : 'text-white/70'}`}
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
        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
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
            className="absolute top-full left-0 right-0 bg-brand-charcoal border-b border-white/5 p-6 md:hidden flex flex-col space-y-4 shadow-xl"
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
                className={`text-lg font-medium text-left ${activeSection === link.id ? 'text-brand-gold' : 'text-white'}`}
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
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-brand-charcoal">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/thai-food/1920/1080?blur=2" 
          alt="Background" 
          className="w-full h-full object-cover opacity-5"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-charcoal/50 to-brand-charcoal"></div>
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
          <p className="text-xl text-white/70 mb-10 max-w-lg leading-relaxed">
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
              src="https://internal-crimson-kmjtevtb9o.edgeone.app/unnamed.jpg" 
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
    <section className="py-24 bg-brand-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-2xl bg-brand-dark/50 border border-white/5 hover:border-brand-gold/30 transition-colors group"
            >
              <div className="mb-6 p-4 bg-brand-charcoal rounded-xl w-fit shadow-sm group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{f.title}</h3>
              <p className="text-white/60 leading-relaxed">{f.desc}</p>
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
    <section id="menu" className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">เมนูทั้งหมด</h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            คัดสรรวัตถุดิบคุณภาพ ปรุงสดใหม่ทุกวัน รสชาติไทยแท้ที่ถูกใจคนรุ่นใหม่
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-8 py-3 rounded-full font-bold transition-all ${activeTab === cat.id ? 'bg-brand-gold text-brand-dark shadow-lg' : 'bg-brand-charcoal text-white/60 hover:text-white border border-white/5'}`}
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
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                    <span className="text-brand-gold font-bold text-lg">{item.price}.-</span>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                  <button className="w-full py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-brand-gold hover:text-brand-dark transition-colors flex items-center justify-center gap-2">
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
    <section id="about" className="py-24 bg-brand-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <img src="https://dm-data.terabox.app/thumbnail/6a37c3deaa94448f418a4cd634f9f8e3?fid=4402151477423-250528-688796715937705&time=1771664400&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-y5Wchnm2mxrA0nO5lj16zaHOL8U%3D&expires=10y&chkv=0&chkbd=0&chkpc=&dp-logid=46933656392719828&dp-callid=0&size=c850_u580&quality=100&vuk=4402151477423&ft=image" alt="DakBuu Storefront" className="rounded-3xl w-full h-80 object-cover mt-12" referrerPolicy="no-referrer" />
            <img src="https://dm-data.terabox.app/thumbnail/880865150622b31727d8f56fe65fe885?fid=4402151477423-250528-304567818400573&time=1771664400&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-LnSZIYFkPeZZEIk4yw1J%2F1p5uts%3D&expires=10y&chkv=0&chkbd=0&chkpc=&dp-logid=47093658327314396&dp-callid=0&size=c850_u580&quality=100&vuk=4402151477423&ft=image" alt="DakBuu Modern Interior" className="rounded-3xl w-full h-80 object-cover" referrerPolicy="no-referrer" />
          </motion.div>

          <div>
            <span className="text-brand-gold font-bold tracking-widest uppercase text-sm mb-4 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 text-white">ร้านข้าวแกงยุคใหม่ <br />เพื่อคนเวลาน้อย</h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              ข้าวแกงDakBuu เกิดจากความเข้าใจในไลฟ์สไตล์ของนักเรียนและนักศึกษาที่ต้องเร่งรีบแข่งกับเวลา เราจึงสร้างพื้นที่ที่เสิร์ฟความอร่อยแบบไทยแท้ ในบรรยากาศที่ทันสมัยและสะดวกสบาย
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-display font-bold text-brand-gold mb-2">100%</h4>
                <p className="text-sm text-white/60 font-medium">วัตถุดิบสดใหม่ทุกวัน</p>
              </div>
              <div>
                <h4 className="text-3xl font-display font-bold text-brand-gold mb-2">15 นาที</h4>
                <p className="text-sm text-white/60 font-medium">เวลาเฉลี่ยในการรับอาหาร</p>
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
    <section id="contact" className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-brand-charcoal rounded-[40px] overflow-hidden card-shadow grid md:grid-cols-2">
          <div className="p-12 lg:p-20">
            <h2 className="text-4xl font-display font-bold mb-10 text-white">ติดต่อเรา</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="p-4 bg-brand-gold/10 rounded-2xl text-brand-gold h-fit">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-white">เบอร์โทรศัพท์</h4>
                  <p className="text-white/60">061-041-3231</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="p-4 bg-brand-gold/10 rounded-2xl text-brand-gold h-fit">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-white">เวลาทำการ</h4>
                  <p className="text-white/60">ทุกวัน: 10:00 – 20:00 น.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="p-4 bg-brand-gold/10 rounded-2xl text-brand-gold h-fit">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1 text-white">ที่ตั้งร้าน</h4>
                  <p className="text-white/60">ย่านมหาวิทยาลัย (ใกล้ประตูทางออกหลัก)</p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex gap-4">
              <a href="#" className="p-4 bg-brand-dark rounded-full hover:bg-brand-gold hover:text-brand-dark transition-all border border-white/10">
                <Facebook size={20} />
              </a>
              <a href="#" className="p-4 bg-brand-dark rounded-full hover:bg-brand-gold hover:text-brand-dark transition-all border border-white/10">
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

const PopularDishes = ({ onMenuClick }: { onMenuClick: () => void }) => {
  const popularItems = MENU_ITEMS.filter(item => item.tags?.includes('แนะนำ') || item.tags?.includes('ขายดี')).slice(0, 4);

  return (
    <section className="py-24 bg-brand-charcoal">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">เมนูยอดฮิต</h2>
            <p className="text-white/60 max-w-md">
              เมนูยอดนิยมที่ใครมาก็ต้องสั่ง อร่อยเด็ด คุ้มค่า ทันใจ
            </p>
          </div>
          <button onClick={onMenuClick} className="btn-outline flex items-center gap-2 group">
            ดูเมนูทั้งหมด <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-dark rounded-3xl overflow-hidden card-shadow group"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  {item.tags?.map((tag, idx) => (
                    <span key={idx} className="bg-brand-gold text-brand-dark px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white">{item.name}</h3>
                <p className="text-white/60 text-sm mb-4 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-brand-gold font-bold text-xl">{item.price}.-</span>
                  <button className="p-2 bg-brand-gold/10 text-brand-gold rounded-full hover:bg-brand-gold hover:text-brand-dark transition-colors">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
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
        <PopularDishes onMenuClick={() => scrollTo('menu')} />
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
