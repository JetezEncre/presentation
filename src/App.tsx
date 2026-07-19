import { Phone, Mail, MapPin, MessageCircle, Shirt, Users, Award, Heart } from 'lucide-react';

const PHONE = '+32 491 50 05 29';
const PHONE_RAW = '+32491500529';
const EMAIL = 'jetez.lencre@outlook.com';

function App() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-800">

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/Projet_Logo.png"
              alt="Logo Jetez l'Encre"
              className="h-10 w-auto"
            />
            <span className="font-display font-700 text-[#1B3478] text-xl tracking-tight leading-tight">
              Jetez l'Encre
            </span>
          </div>
          <nav className="hidden sm:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#activite" className="hover:text-[#1E90D8] transition-colors">L'activité</a>
            <a href="#services" className="hover:text-[#1E90D8] transition-colors">Services</a>
            <a href="#contact" className="hover:text-[#1E90D8] transition-colors">Contact</a>
          </nav>
          <a
            href={`tel:${PHONE_RAW}`}
            className="hidden sm:inline-flex items-center gap-2 bg-[#1B3478] text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-[#162c63] transition-colors"
          >
            <Phone size={14} />
            {PHONE}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-28 pb-24 px-6 bg-gradient-to-b from-[#e8f4fc] to-white">
        <div className="max-w-3xl mx-auto text-center">
          <img
            src="/images/Projet_Logo.png"
            alt="Jetez l'Encre"
            className="h-32 w-auto mx-auto mb-8 drop-shadow-md"
          />
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-[#1B3478] leading-tight mb-4">
            Jetez l'Encre
          </h1>
          <p className="text-[#1E90D8] text-lg font-medium tracking-wide uppercase mb-6">
            Sérigraphie artisanale sur textile — Namur
          </p>
          <p className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto mb-10">
            Impression manuelle et traditionnelle de qualité, au coeur de la Wallonie.
            Chaque pièce est réalisée à la main, avec soin et précision.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${PHONE_RAW}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#1E90D8] text-white font-semibold px-8 py-3.5 rounded-full hover:bg-[#1a7fc4] transition-colors shadow-md hover:shadow-lg"
            >
              <MessageCircle size={18} />
              Contacter via WhatsApp
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center justify-center gap-2 border-2 border-[#1B3478] text-[#1B3478] font-semibold px-8 py-3.5 rounded-full hover:bg-[#1B3478] hover:text-white transition-colors"
            >
              <Mail size={18} />
              Envoyer un e-mail
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* About */}
      <section id="activite" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-[#1B3478] mb-4">L'activité</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Un savoir-faire artisanal et local, ancré dans la tradition namuroise.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-[#e8f4fc] hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#1E90D8] text-white rounded-full mb-5">
                <Award size={26} />
              </div>
              <h3 className="font-display font-semibold text-[#1B3478] text-xl mb-3">Artisanal</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Chaque impression est réalisée à la main, avec des techniques traditionnelles de sérigraphie garantissant un rendu soigné et durable.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-[#e8f4fc] hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#1B3478] text-white rounded-full mb-5">
                <MapPin size={26} />
              </div>
              <h3 className="font-display font-semibold text-[#1B3478] text-xl mb-3">Local</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Basé à Namur, au coeur de la Wallonie. Une activité de proximité qui valorise le travail local et l'ancrage dans sa région.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-[#e8f4fc] hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-[#1E90D8] text-white rounded-full mb-5">
                <Heart size={26} />
              </div>
              <h3 className="font-display font-semibold text-[#1B3478] text-xl mb-3">Passionné</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Un métier manuel pratiqué avec passion, où chaque commande est traitée avec la même attention et le même engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      </div>

      {/* Services */}
      <section id="services" className="py-24 px-6 bg-gradient-to-b from-white to-[#e8f4fc]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-[#1B3478] mb-4">Services</h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Des impressions personnalisées pour tous vos projets sur textile.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <ServiceCard
              icon={<Shirt size={22} />}
              title="T-shirts & sweats"
              description="Impression de logos, motifs ou textes sur t-shirts, sweats, hoodies et autres vêtements. Idéal pour créer une identité visuelle unique."
            />
            <ServiceCard
              icon={<Users size={22} />}
              title="Associations & clubs"
              description="Réalisations pour associations sportives, culturelles, écoles et groupes. Petites et moyennes séries possibles."
            />
            <ServiceCard
              icon={<Award size={22} />}
              title="Événements & promotions"
              description="Textile promotionnel pour vos événements, foires, stands ou lancements de produits. Un support visible et durable."
            />
            <ServiceCard
              icon={<Heart size={22} />}
              title="Projets personnels"
              description="Impression sur mesure pour vos projets personnels : cadeaux, créations uniques, textiles de collection."
            />
          </div>
          <p className="text-center text-gray-500 text-sm mt-10">
            Vous avez un projet particulier ? N'hésitez pas à me contacter pour en discuter.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-[#1B3478]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-4xl font-bold text-white mb-4">Me contacter</h2>
          <p className="text-blue-200 text-lg mb-14">
            Pour un devis, une question ou pour discuter de votre projet.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            <ContactCard
              icon={<Phone size={22} />}
              label="Téléphone & WhatsApp"
              value={PHONE}
              href={`tel:${PHONE_RAW}`}
            />
            <ContactCard
              icon={<MessageCircle size={22} />}
              label="WhatsApp"
              value="Envoyer un message"
              href={`https://wa.me/${PHONE_RAW}`}
              external
            />
            <ContactCard
              icon={<Mail size={22} />}
              label="E-mail"
              value={EMAIL}
              href={`mailto:${EMAIL}`}
            />
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-blue-200 text-sm">
            <MapPin size={16} className="text-[#1E90D8] shrink-0" />
            <span>Namur, Wallonie — Belgique</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0b163a] py-8 px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          <img src="/images/Projet_Logo.png" alt="Logo" className="h-7 w-auto opacity-80" />
          <span className="text-white font-display font-semibold text-base">Jetez l'Encre</span>
        </div>
        <p className="text-blue-300 text-xs">
          &copy; {new Date().getFullYear()} Jetez l'Encre — Sérigraphie artisanale sur textile — Namur, Belgique
        </p>
      </footer>
    </div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="flex gap-5 p-7 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
      <div className="shrink-0 inline-flex items-center justify-center w-11 h-11 bg-[#e8f4fc] text-[#1E90D8] rounded-xl">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-[#1B3478] text-base mb-2">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function ContactCard({ icon, label, value, href, external }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="flex flex-col gap-3 p-6 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl transition-colors group"
    >
      <div className="inline-flex items-center justify-center w-11 h-11 bg-[#1E90D8] text-white rounded-xl">
        {icon}
      </div>
      <div>
        <p className="text-blue-300 text-xs font-medium uppercase tracking-wider mb-1">{label}</p>
        <p className="text-white text-sm font-medium group-hover:text-[#1E90D8] transition-colors break-all">{value}</p>
      </div>
    </a>
  );
}

export default App;
