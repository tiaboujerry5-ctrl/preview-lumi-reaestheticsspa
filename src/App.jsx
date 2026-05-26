import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion"
import { cn } from "./lib/utils"
import { ArrowRight, Phone, Mail, MapPin, ChevronDown, Menu, X, Star, Check } from "lucide-react"

function FadeUp({ children, delay = 0 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

const containerVariants = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const itemVariants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }

const NAV_LINKS = ["Services", "Shop", "About Us", "Contact"]

const SERVICES = [
  { icon: "✦", title: "Laser Hair Removal", desc: "State-of-the-art diode laser technology with vacuum-assist and contact cooling for near-painless, permanent results.", duration: "Free Consult" },
  { icon: "◈", title: "Massage Therapy", desc: "Registered therapists offering deep tissue, Swedish, hot stone, sports, cupping and prenatal massage treatments.", duration: "From $90" },
  { icon: "❋", title: "Facials & Peels", desc: "Customized medical-grade facials tailored to your unique skin concerns, delivering visible results from the first session.", duration: "From $95" },
  { icon: "⬡", title: "Oxygeneo Super Facial", desc: "The 3-in-1 super facial: exfoliate, oxygenate and infuse in a single transformative session for radiant, long-lasting glow.", duration: "60 min" },
  { icon: "◎", title: "Micro-Needling", desc: "Collagen Induction Therapy that reduces fine lines, scarring and stretch marks for visibly smoother, rejuvenated skin.", duration: "From $250" },
  { icon: "◇", title: "Brow & Lash Services", desc: "Lash extensions, lash lift and tint, and brow henna artistry that enhance your natural features effortlessly.", duration: "From $65" },
  { icon: "✿", title: "Pedicure & Waxing", desc: "Luxurious spa pedicures, manicures and full-body waxing services for both women and men in a relaxing setting.", duration: "From $55" },
  { icon: "◐", title: "Dermaplaning", desc: "Expert exfoliation that removes dead skin and fine vellus hair, leaving skin silky smooth and radiant.", duration: "45 min" },
  { icon: "✧", title: "Spa Packages", desc: "Curated combo treatments that pair our best services together — including our Signature Lift and Dermaplaning Combo.", duration: "From $195" },
  { icon: "⊛", title: "Skincare Retail", desc: "Curated clinical skincare products shipped coast to coast, with expert guidance from our licensed estheticians.", duration: "Shop 24/7" },
]

const PRODUCTS = [
  { title: "Radiance Duo Serum Set", badge: "20% SAVINGS — $44 OFF", desc: "Hydrating anti-aging serum paired with a water-burst booster for deep, lasting luminosity.", img: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=85&fit=crop&auto=format" },
  { title: "Advanced Shield SPF 50", badge: null, desc: "Color-correcting daily moisturizer that soothes redness, boosts hydration and provides broad-spectrum mineral UV protection.", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=85&fit=crop&auto=format" },
  { title: "Brightening Revival Kit", badge: "20% SAVINGS — $52 OFF", desc: "Anti-aging serum combined with a rich repair creme for visibly even, glowing skin tone day after day.", img: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&q=85&fit=crop&auto=format" },
]

const TESTIMONIALS = [
  { name: "Adriana M.", stars: 5, quote: "Lumière completely transformed my skin. After three OxyGeneo sessions, people keep asking if I had work done — I look years younger and I am absolutely glowing." },
  { name: "James T.", stars: 5, quote: "Best massage therapy I have experienced in Grande Prairie. My RMT listened carefully and my chronic shoulder tension was noticeably better after the very first deep tissue session." },
  { name: "Priya K.", stars: 5, quote: "The laser hair removal results are incredible. The team is professional, the clinic is spotless, and the process was far more comfortable than I expected. Highly recommend." },
]

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, -120])

  useEffect(() => {
    const unsub = scrollY.onChange((v) => setScrolled(v > 40))
    return () => unsub()
  }, [scrollY])

  return (
    <div className="bg-[#ffffff] text-[#2d2d2d] font-sans overflow-x-hidden">
      {/* ── NAVBAR ── */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-300",
          scrolled ? "backdrop-blur-xl bg-[#1a1a1a]/90 border-b border-white/10 shadow-lg" : "bg-[#1a1a1a]"
        )}
      >
        {/* Top bar */}
        <div className="bg-[#c9a96e]/10 border-b border-[#c9a96e]/20 px-4 py-2 flex items-center justify-between text-xs text-[#c9a96e] max-w-7xl mx-auto">
          <a href="tel:17804219800" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone size={12} /> (780) 421-9800
          </a>
          <span className="hidden sm:block italic text-[#c9a96e]/70">Free shipping on orders over $150 across Canada</span>
          <div className="flex items-center gap-3">
            <a href="#gift" className="hover:text-white transition-colors">Gift Cards</a>
            <motion.a
              href="#book"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#c9a96e] text-white px-3 py-1 rounded text-xs font-semibold hover:bg-[#b8915a] transition-colors"
            >
              Book Now
            </motion.a>
          </div>
        </div>
        {/* Main nav */}
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-white font-bold text-xl tracking-widest" style={{ fontFamily: "Georgia, serif" }}>
            LUMIÈRE
            <span className="block text-[10px] tracking-[0.3em] text-[#c9a96e] font-normal -mt-1">AESTHETICS & SPA</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(" ", "-")}`}
                className="text-sm text-white/80 hover:text-[#c9a96e] transition-colors tracking-wide"
              >
                {link}
              </a>
            ))}
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#1a1a1a] border-t border-white/10 overflow-hidden"
            >
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col px-6 py-4 gap-4"
              >
                {NAV_LINKS.map((link) => (
                  <motion.a
                    key={link}
                    variants={itemVariants}
                    href={`#${link.toLowerCase().replace(" ", "-")}`}
                    onClick={() => setMenuOpen(false)}
                    className="text-white/80 hover:text-[#c9a96e] transition-colors text-sm tracking-wide py-1"
                  >
                    {link}
                  </motion.a>
                ))}
                <motion.a
                  variants={itemVariants}
                  href="#book"
                  onClick={() => setMenuOpen(false)}
                  className="bg-[#c9a96e] text-white text-center py-2.5 rounded-lg font-semibold text-sm"
                >
                  Book Your Appointment
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?ixid=M3w5NTk3MDl8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yJTIwZWxlZ2FudHxlbnwwfDB8fHwxNzc5NjM4NTQ3fDA&ixlib=rb-4.1.0&w=1600&q=85&fit=crop&auto=format"
            alt="Lumière Spa interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/85 via-[#1a1a1a]/60 to-[#1a1a1a]/30" />
        </motion.div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[#c9a96e] tracking-[0.3em] text-xs uppercase mb-4 font-medium"
            >
              Grande Prairie's Premier Beauty Clinic
            </motion.p>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Glow Brighter.
              <span className="block text-[#c9a96e] italic">Feel Transformed.</span>
            </h1>
            <p className="text-white/70 text-lg mb-10 max-w-lg leading-relaxed">
              Clinical aesthetics, therapeutic massage and luxury spa treatments — all in one serene destination designed around you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="#book"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#c9a96e] text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#b8915a] transition-colors shadow-lg"
              >
                Book Your Appointment <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="#services"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="border border-white/40 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm text-center"
              >
                Discover Our Services
              </motion.a>
              <motion.a
                href="#gift"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="border border-[#c9a96e]/50 text-[#c9a96e] px-8 py-4 rounded-xl font-semibold hover:bg-[#c9a96e]/10 transition-colors text-center"
              >
                Purchase a Gift Card
              </motion.a>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40"
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="bg-[#1a1a1a] border-y border-[#c9a96e]/20 py-8">
        <FadeUp>
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
              {[
                { year: "2022", label: "Best Business Rated" },
                { year: "2023", label: "Spa of the Year" },
                { year: "2023", label: "Best Business Rated" },
                { year: "2024", label: "Spa of the Year" },
                { year: "2024", label: "Best Business Rated" },
              ].map((badge, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -4 }}
                  className="flex flex-col items-center text-center px-4"
                >
                  <div className="w-14 h-14 rounded-full bg-[#c9a96e]/10 border border-[#c9a96e]/30 flex items-center justify-center mb-2">
                    <Star size={20} className="text-[#c9a96e]" fill="#c9a96e" />
                  </div>
                  <span className="text-[#c9a96e] font-bold text-sm">{badge.year}</span>
                  <span className="text-white/50 text-xs">{badge.label}</span>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-[#c9a96e]/60 text-xs mt-6 italic tracking-widest uppercase">
              Premium Skincare Brand Ambassador — Canada 2022 & Beyond
            </p>
          </div>
        </FadeUp>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-[#c9a96e] tracking-[0.3em] text-xs uppercase mb-3">What We Offer</p>
              <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4" style={{ fontFamily: "Georgia, serif" }}>
                Our Services
              </h2>
              <p className="text-[#2d2d2d]/60 max-w-xl mx-auto text-lg">
                Advanced aesthetics, therapeutic massage and luxury spa enhancements — crafted around your goals.
              </p>
            </div>
          </FadeUp>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
          >
            {SERVICES.map((svc, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-[#f5f0eb] rounded-2xl p-6 cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#1a1a1a] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-2xl" />
                <div className="relative z-10">
                  <span className="text-[#c9a96e] text-2xl mb-4 block">{svc.icon}</span>
                  <h3 className="font-bold text-[#1a1a1a] group-hover:text-white text-sm mb-2 transition-colors leading-snug" style={{ fontFamily: "Georgia, serif" }}>
                    {svc.title}
                  </h3>
                  <p className="text-[#2d2d2d]/60 group-hover:text-white/70 text-xs leading-relaxed mb-4 transition-colors">
                    {svc.desc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#c9a96e] bg-[#c9a96e]/10 group-hover:bg-[#c9a96e]/20 px-2 py-1 rounded-full transition-colors">
                      {svc.duration}
                    </span>
                    <ArrowRight size={14} className="text-[#c9a96e] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SIGNATURE TREATMENT SPOTLIGHT ── */}
      <section className="py-24 bg-[#f5f0eb]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <FadeUp>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1633681926035-ec1ac984418a?ixid=M3w5NTk3MDl8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yJTIwZWxlZ2FudHxlbnwwfDB8fHwxNzc5NjM4NTQ3fDA&ixlib=rb-4.1.0&w=1600&q=85&fit=crop&auto=format"
                  alt="Signature Radiance Lift treatment"
                  className="rounded-2xl w-full aspect-[4/3] object-cover shadow-2xl"
                />
                <div className="absolute bottom-4 left-4 bg-[#1a1a1a] text-white px-4 py-2 rounded-xl">
                  <span className="text-[#c9a96e] font-bold">Combo Price: $195</span>
                  <span className="text-white/60 text-xs block">Save $60 when booked together</span>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div>
                <p className="text-[#c9a96e] tracking-[0.3em] text-xs uppercase mb-3">Signature Treatment</p>
                <h2 className="text-4xl font-bold text-[#1a1a1a] mb-6 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                  The Radiance Lift &amp; Dermaplaning Combo
                </h2>
                <p className="text-[#2d2d2d]/70 mb-6 leading-relaxed">
                  Our most sought-after pairing. The Radiance Lift facial harnesses botanical extracts and clinical-grade actives to lighten dark spots, tighten laxity and restore your skin's natural luminosity — then our expert dermaplaning session removes the fine vellus layer that dulls your complexion, amplifying every result.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Instant visible brightening after one session", "Smoother texture and reduced pore appearance", "Enhanced product absorption for weeks post-treatment", "No downtime — return to your day glowing"].map((pt, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#2d2d2d]/80">
                      <Check size={16} className="text-[#c9a96e] mt-0.5 shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-4 flex-wrap">
                  <motion.a
                    href="#book"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-[#c9a96e] text-white px-7 py-3.5 rounded-xl font-semibold flex items-center gap-2 hover:bg-[#b8915a] transition-colors"
                  >
                    Book This Combo <ArrowRight size={16} />
                  </motion.a>
                  <motion.a
                    href="#services"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="border border-[#1a1a1a] text-[#1a1a1a] px-7 py-3.5 rounded-xl font-semibold hover:bg-[#1a1a1a] hover:text-white transition-colors"
                  >
                    Explore All Services
                  </motion.a>
                </div>
                <p className="text-xs text-[#2d2d2d]/40 mt-4">Limited slots this week — book early to secure your time.</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── GALLERY / ABOUT IMAGERY ── */}
      <section className="py-24 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-14">
              <p className="text-[#c9a96e] tracking-[0.3em] text-xs uppercase mb-3">Our Space</p>
              <h2 className="text-4xl font-bold text-[#1a1a1a] mb-4" style={{ fontFamily: "Georgia, serif" }}>
                A Sanctuary Designed for You
              </h2>
              <p className="text-[#2d2d2d]/60 max-w-lg mx-auto">Every detail of our clinic is curated to make you feel calm, cared for and completely at ease.</p>
            </div>
          </FadeUp>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {[
              { src: "https://images.unsplash.com/photo-1706629503650-cade709d15e3?ixid=M3w5NTk3MDl8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yJTIwZWxlZ2FudHxlbnwwfDB8fHwxNzc5NjM4NTQ3fDA&ixlib=rb-4.1.0&w=1600&q=85&fit=crop&auto=format", label: "Treatment Suites" },
              { src: "https://images.unsplash.com/photo-1633681926019-03bd9325ec20?ixid=M3w5NTk3MDl8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yJTIwZWxlZ2FudHxlbnwwfDB8fHwxNzc5NjM4NTQ3fDA&ixlib=rb-4.1.0&w=1600&q=85&fit=crop&auto=format", label: "Skincare Studio" },
              { src: "https://images.unsplash.com/photo-1706629506571-a6d86798916b?ixid=M3w5NTk3MDl8MHwxfHNlYXJjaHw1fHxsdXh1cnklMjBiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yJTIwZWxlZ2FudHxlbnwwfDB8fHwxNzc5NjM4NTQ3fDA&ixlib=rb-4.1.0&w=1600&q=85&fit=crop&auto=format", label: "Relaxation Lounge" },
            ].map((img, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-[4/3]"
              >
                <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-white font-semibold text-sm bg-[#c9a96e] px-3 py-1.5 rounded-lg">{img.label}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS (NEW SECTION) ── */}
      <section className="py-24 bg-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-[#c9a96e] tracking-[0.3em] text-xs uppercase mb-3">Client Stories</p>
              <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "Georgia, serif" }}>
                What Our Guests Are Saying
              </h2>
              <div className="flex items-center justify-center gap-2 text-[#c9a96e] mb-4">
                {[1,2,3,4,5].map((s) => <Star key={s} size={18} fill="#c9a96e" />)}
                <span className="text-white/60 text-sm ml-2">5.0 · Over 2,400 reviews</span>
              </div>
            </div>
          </FadeUp>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-6"
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.3)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-[#f5f0eb]/5 border border-white/10 rounded-2xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star key={s} size={14} className="text-[#c9a96e]" fill="#c9a96e" />
                  ))}
                </div>
                <p className="text-white/80 italic leading-relaxed mb-6 text-sm" style={{ fontFamily: "Georgia, serif" }}>
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/150?img=${i + 10}`}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-[#c9a96e]/30"
                  />
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-[#c9a96e]/60 text-xs">Verified Guest</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <FadeUp delay={0.2}>
            <div className="grid grid-cols-3 gap-8 mt-16 border-t border-white/10 pt-12 text-center">
              {[
                { num: "5,800+", label: "Guests Served" },
                { num: "2,400+", label: "Five-Star Reviews" },
                { num: "17+", label: "Years in Grande Prairie" },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-3xl md:text-4xl font-bold text-[#c9a96e] mb-1" style={{ fontFamily: "Georgia, serif" }}>{stat.num}</p>
                  <p className="text-white/50 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section id="shop" className="py-24 bg-[#f5f0eb]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-[#c9a96e] tracking-[0.3em] text-xs uppercase mb-3">Clinical Retail</p>
              <h2 className="text-4xl font-bold text-[#1a1a1a] mb-4" style={{ fontFamily: "Georgia, serif" }}>
                Featured Products
              </h2>
              <p className="text-[#2d2d2d]/60 max-w-xl mx-auto">
                Your number one source for clinical skincare in Canada. We ship coast to coast — next-day dispatch via Canada Post.
              </p>
            </div>
          </FadeUp>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid md:grid-cols-3 gap-7 mb-10"
          >
            {PRODUCTS.map((prod, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white rounded-2xl overflow-hidden group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={prod.img}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {prod.badge && (
                    <div className="absolute bottom-3 left-3 bg-[#c9a96e] text-white text-xs font-bold px-3 py-1.5 rounded-lg">
                      {prod.badge}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#1a1a1a] text-lg mb-2" style={{ fontFamily: "Georgia, serif" }}>{prod.title}</h3>
                  <p className="text-[#2d2d2d]/60 text-sm leading-relaxed mb-5">{prod.desc}</p>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full bg-[#1a1a1a] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#c9a96e] transition-colors"
                  >
                    View Product
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <FadeUp delay={0.2}>
            <div className="text-center">
              <motion.a
                href="#shop"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 bg-[#c9a96e] text-white px-10 py-4 rounded-xl font-semibold hover:bg-[#b8915a] transition-colors"
              >
                Shop All Products <ArrowRight size={18} />
              </motion.a>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── LOYALTY / MEMBERSHIP ── */}
      <section id="gift" className="py-24 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <FadeUp>
              <div className="bg-[#1a1a1a] rounded-2xl p-10 text-white">
                <p className="text-[#c9a96e] tracking-[0.3em] text-xs uppercase mb-4">Membership</p>
                <h2 className="text-3xl font-bold mb-5" style={{ fontFamily: "Georgia, serif" }}>
                  The Lumière Circle
                </h2>
                <p className="text-white/70 mb-7 leading-relaxed text-sm">
                  Join our exclusive membership and unlock priority booking, monthly treatment credits, member-only product pricing and complimentary skin consultations throughout the year.
                </p>
                <ul className="space-y-3 mb-8">
                  {["Priority appointment scheduling", "10% off all retail products", "Monthly $30 treatment credit", "Complimentary seasonal skin review", "Birthday bonus treatment"].map((perk, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/80">
                      <Check size={14} className="text-[#c9a96e] shrink-0" />
                      {perk}
                    </li>
                  ))}
                </ul>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-[#c9a96e] text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-[#b8915a] transition-colors"
                >
                  Learn About Membership
                </motion.button>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div className="bg-[#f5f0eb] rounded-2xl p-10">
                <p className="text-[#c9a96e] tracking-[0.3em] text-xs uppercase mb-4">Gift Cards</p>
                <h2 className="text-3xl font-bold text-[#1a1a1a] mb-5" style={{ fontFamily: "Georgia, serif" }}>
                  The Perfect Gift for Someone Special
                </h2>
                <p className="text-[#2d2d2d]/70 mb-7 leading-relaxed text-sm">
                  Give the gift of radiance. Our digital gift cards are redeemable for any service or product at Lumière — perfect for birthdays, anniversaries or simply showing someone you care.
                </p>
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {["$50", "$100", "$150", "$200", "$250", "Custom"].map((amt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="border border-[#c9a96e]/40 text-[#1a1a1a] py-2.5 rounded-xl text-sm font-semibold hover:bg-[#c9a96e] hover:text-white hover:border-[#c9a96e] transition-colors"
                    >
                      {amt}
                    </motion.button>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-[#1a1a1a] text-white py-3.5 rounded-xl font-semibold hover:bg-[#c9a96e] transition-colors"
                >
                  Purchase a Gift Card
                </motion.button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER CTA BANNER ── */}
      <section className="py-20 bg-[#c9a96e]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "Georgia, serif" }}>
              Stay in the Glow
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              Promotions, seasonal treatments, new arrivals and exclusive offers — delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-5 py-3.5 rounded-xl text-[#1a1a1a] placeholder-[#1a1a1a]/40 outline-none border-0 text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#1a1a1a] text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#2d2d2d] transition-colors whitespace-nowrap"
              >
                Subscribe
              </motion.button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── BOOKING CTA ── */}
      <section id="book" className="py-24 bg-[#1a1a1a] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img
            src="https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?ixid=M3w5NTk3MDl8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yJTIwZWxlZ2FudHxlbnwwfDB8fHwxNzc5NjM4NTQ3fDA&ixlib=rb-4.1.0&w=1600&q=85&fit=crop&auto=format"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <FadeUp>
            <p className="text-[#c9a96e] tracking-[0.3em] text-xs uppercase mb-4">Reserve Your Experience</p>
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
              Your Transformation Begins Here
            </h2>
            <p className="text-white/60 mb-10 text-lg max-w-xl mx-auto">
              Book online in seconds — choose your service, select your preferred time and let our team take care of the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href="https://ciaobellagp.janeapp.com/"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#c9a96e] text-white px-10 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#b8915a] transition-colors"
              >
                Book an Appointment <ArrowRight size={18} />
              </motion.a>
              <motion.a
                href="tel:17804219800"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="border border-white/30 text-white px-10 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={18} /> Call Us Directly
              </motion.a>
            </div>
            <p className="text-white/30 text-sm mt-6">Limited slots available this week — secure your time today.</p>
          </FadeUp>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 bg-[#ffffff]">
        <div className="max-w-7xl mx-auto px-6">
          <FadeUp>
            <div className="text-center mb-16">
              <p className="text-[#c9a96e] tracking-[0.3em] text-xs uppercase mb-3">Get in Touch</p>
              <h2 className="text-4xl font-bold text-[#1a1a1a]" style={{ fontFamily: "Georgia, serif" }}>Contact Us</h2>
            </div>
          </FadeUp>
          <div className="grid md:grid-cols-2 gap-12">
            <FadeUp>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#c9a96e]/10 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-[#c9a96e]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1a1a] mb-1">Our Location</p>
                    <p className="text-[#2d2d2d]/60 text-sm">10412 Westside Blvd #205<br />Grande Prairie, AB T8V 3A2</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#c9a96e]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-[#c9a96e]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1a1a] mb-1">Phone</p>
                    <a href="tel:17804219800" className="text-[#2d2d2d]/60 text-sm hover:text-[#c9a96e] transition-colors">(780) 421-9800</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#c9a96e]/10 rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-[#c9a96e]" />
                  </div>
                  <div>
                    <p className="font-bold text-[#1a1a1a] mb-1">Email</p>
                    <a href="mailto:hello@lumierespa.ca" className="text-[#2d2d2d]/60 text-sm hover:text-[#c9a96e] transition-colors">hello@lumierespa.ca</a>
                  </div>
                </div>
                <div className="bg-[#f5f0eb] rounded-2xl p-6">
                  <p className="font-bold text-[#1a1a1a] mb-4">Hours of Operation</p>
                  <div className="space-y-2 text-sm text-[#2d2d2d]/70">
                    {[
                      ["Tuesday", "10:00 am – 6:00 pm"],
                      ["Wednesday", "10:00 am – 7:00 pm"],
                      ["Thursday", "10:00 am – 6:00 pm"],
                      ["Friday", "10:00 am – 6:00 pm"],
                      ["Saturday", "10:00 am – 4:00 pm"],
                      ["Sun & Mon", "Closed"],
                    ].map(([day, hrs]) => (
                      <div key={day} className="flex justify-between">
                        <span>{day}</span>
                        <span className={hrs === "Closed" ? "text-[#c9a96e]" : ""}>{hrs}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3.5 rounded-xl border border-[#e5e0da] bg-[#f5f0eb] text-[#1a1a1a] placeholder-[#2d2d2d]/30 outline-none focus:border-[#c9a96e] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3.5 rounded-xl border border-[#e5e0da] bg-[#f5f0eb] text-[#1a1a1a] placeholder-[#2d2d2d]/30 outline-none focus:border-[#c9a96e] transition-colors text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Ask us anything about our services, availability or products..."
                    rows={5}
                    className="w-full px-4 py-3.5 rounded-xl border border-[#e5e0da] bg-[#f5f0eb] text-[#1a1a1a] placeholder-[#2d2d2d]/30 outline-none focus:border-[#c9a96e] transition-colors text-sm resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-[#c9a96e] text-white py-4 rounded-xl font-semibold hover:bg-[#b8915a] transition-colors flex items-center justify-center gap-2"
                >
                  Send Message <ArrowRight size={18} />
                </motion.button>
              </form>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1a1a1a] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
            <div className="md:col-span-1">
              <div className="font-bold text-xl tracking-widest mb-1" style={{ fontFamily: "Georgia, serif" }}>
                LUMIÈRE
              </div>
              <div className="text-[10px] tracking-[0.3em] text-[#c9a96e] mb-4">AESTHETICS & SPA</div>
              <p className="text-white/50 text-xs leading-relaxed mb-5">
                Grande Prairie's trusted destination for clinical aesthetics, therapeutic massage and luxury spa experiences since 2008.
              </p>
              <p className="text-[#c9a96e] text-xs font-semibold">Free Shipping in Canada on Orders over $150</p>
            </div>
            <div>
              <p className="font-bold text-sm mb-5 tracking-wide">Services</p>
              <ul className="space-y-2.5">
                {["Laser Hair Removal", "Massage Therapy", "Facials & Peels", "Oxygeneo Facial", "Micro-Needling", "Brow & Lash", "Pedicure & Waxing", "Spa Packages"].map((s) => (
                  <li key={s}><a href="#services" className="text-white/50 text-xs hover:text-[#c9a96e] transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold text-sm mb-5 tracking-wide">Shop</p>
              <ul className="space-y-2.5">
                {["Skincare Kits", "Serums", "Day Creams", "Night Creams", "Cleansers", "Masks & Scrubs", "Eye & Lip", "Bath & Relaxation"].map((s) => (
                  <li key={s}><a href="#shop" className="text-white/50 text-xs hover:text-[#c9a96e] transition-colors">{s}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-bold text-sm mb-5 tracking-wide">Connect</p>
              <ul className="space-y-2.5 mb-6">
                <li><a href="tel:17804219800" className="text-white/50 text-xs hover:text-[#c9a96e] transition-colors flex items-center gap-2"><Phone size={12} /> (780) 421-9800</a></li>
                <li><a href="mailto:hello@lumierespa.ca" className="text-white/50 text-xs hover:text-[#c9a96e] transition-colors flex items-center gap-2"><Mail size={12} /> hello@lumierespa.ca</a></li>
                <li><span className="text-white/50 text-xs flex items-start gap-2"><MapPin size={12} className="mt-0.5 shrink-0" />10412 Westside Blvd #205<br />Grande Prairie, AB T8V 3A2</span></li>
              </ul>
              <div className="flex gap-3">
                <motion.a href="#" whileHover={{ scale: 1.1 }} className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#c9a96e] transition-colors text-xs font-bold">f</motion.a>
                <motion.a href="#" whileHover={{ scale: 1.1 }} className="w-9 h-9 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#c9a96e] transition-colors text-xs font-bold">in</motion.a>
              </div>
              <div className="mt-6 bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-[#c9a96e] text-xs font-semibold mb-1">Cancellation Policy</p>
                <p className="text-white/40 text-xs leading-relaxed">Please provide 24 hours notice to avoid a cancellation fee. No-shows will be charged 50% of the booked service.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-4">
            <p className="text-white/30 text-xs">© Lumière Aesthetics & Spa 2026. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-white/30 text-xs hover:text-[#c9a96e] transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/30 text-xs hover:text-[#c9a96e] transition-colors">Return Policy</a>
              <a href="#" className="text-white/30 text-xs hover:text-[#c9a96e] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
