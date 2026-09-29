import { FormEvent, useState } from 'react';
import {
  ArrowRight,
  Check,
  Clock3,
  FileText,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Send,
  Shirt,
  Upload,
  X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Service = 'textile' | 'paper';
type Delivery = 'standard' | 'rapide' | 'express';

type FormData = {
  name: string;
  email: string;
  phone: string;
  description: string;
  textileType: string;
  textileColor: string;
  placements: string[];
  paperFormat: string;
  paperColor: string;
  printMode: string;
  delivery: Delivery;
};

const initialForm: FormData = {
  name: '', email: '', phone: '', description: '', textileType: 'T-shirt', textileColor: 'Blanc', placements: ['Cœur'], paperFormat: 'A4', paperColor: 'Blanc', printMode: 'Noir & blanc', delivery: 'standard',
};

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [service, setService] = useState<Service>('textile');
  const [form, setForm] = useState<FormData>(initialForm);
  const [files, setFiles] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const update = (key: keyof FormData, value: string) => setForm((current) => ({ ...current, [key]: value }));
  const openQuote = (nextService: Service) => { setService(nextService); setQuoteOpen(true); setSubmitted(false); setError(''); };
  const placementOptions = ['Cœur', 'Dos', 'Manche gauche', 'Manche droite', 'Col', 'Nuque'];
  const deliveryInfo: Record<Delivery, { label: string; delay: string }> = {
    standard: { label: 'Standard', delay: '~ 1 semaine' },
    rapide: { label: 'Rapide', delay: 'Moins de 72h' },
    express: { label: 'Express', delay: 'Moins de 24h' },
  };
  const togglePlacement = (option: string) => setForm((current) => ({
    ...current,
    placements: current.placements.includes(option)
      ? current.placements.filter((item) => item !== option)
      : [...current.placements, option],
  }));

  async function submitQuote(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError('');
    const details = service === 'textile'
      ? { textileType: form.textileType, textileColor: form.textileColor, placements: form.placements.join(', '), delivery: form.delivery }
      : { paperFormat: form.paperFormat, paperColor: form.paperColor, printMode: form.printMode, delivery: form.delivery };

    const { error: insertError } = await supabase.from('quote_requests').insert({
      service, customer_name: form.name, customer_email: form.email, customer_phone: form.phone || null, description: form.description, details, attachment_names: files.map((file) => file.name),
    });

    if (insertError) {
      console.error(insertError);
      setError('Votre demande n’a pas pu être envoyée. Réessayez dans un instant.');
      setSending(false);
      return;
    }

    const subject = encodeURIComponent(`Demande de devis ${service === 'textile' ? 'textile' : 'papier'} — ${form.name}`);
    const body = encodeURIComponent(`Bonjour Jetez l'Encre,\n\nNom : ${form.name}\nEmail : ${form.email}\nTéléphone : ${form.phone || 'Non renseigné'}\n\nProjet :\n${form.description}\n\nOptions :\n${Object.entries(details).map(([key, value]) => `${key} : ${value}`).join('\n')}\n\nFichiers sélectionnés : ${files.length ? files.map((file) => file.name).join(', ') : 'Aucun'}`);
    window.location.href = `mailto:jetez.lencre@outlook.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setSending(false);
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#accueil" aria-label="Jetez l'Encre, accueil"><img src="/Projet_Logo.png" alt="" /><span>Jetez <b>l’Encre</b></span></a>
        <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Ouvrir le menu"><Menu size={22} /></button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
          <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
          <a href="#atelier" onClick={() => setMenuOpen(false)}>L’atelier</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <button className="nav-cta" onClick={() => openQuote('textile')}>Demander un devis <ArrowRight size={16} /></button>
        </nav>
      </header>

      <main>
        <section className="hero" id="accueil">
          <div className="hero-content">
            <div className="eyebrow"><span className="eyebrow-dot" /> Impression locale & authentique</div>
            <h1>Donnez du relief<br />à <em>vos idées.</em></h1>
            <p>Sérigraphie textile et impression papier, fabriquées avec soin et livrées directement chez vous.</p>
            <div className="hero-actions">
              <button className="button button-dark" onClick={() => openQuote('textile')}>Parler de votre projet <ArrowRight size={18} /></button>
              <a className="text-link" href="#services">Découvrir nos services <span>↗</span></a>
            </div>
          </div>
          <div className="hero-logo"><img src="/Projet_Logo.png" alt="Logo Jetez l'Encre" /></div>
        </section>

        <section className="services section" id="services">
          <div className="section-intro">
            <div className="eyebrow"><span className="eyebrow-dot" /> Nos services</div>
            <h2>Deux métiers,<br /><em>une même exigence.</em></h2>
          </div>
          <div className="service-grid">
            <article className="service-card textile-card">
              <div className="service-icon"><Shirt size={24} /></div>
              <h3>Impression <em>textile</em></h3>
              <p>Sérigraphie artisanale sur t-shirts, sweats, tabliers, vestes, gilets de chantier et plus encore. Des encres qui tiennent, des couleurs qui vivent.</p>
              <button onClick={() => openQuote('textile')}>Créer mon projet <ArrowRight size={17} /></button>
            </article>
            <article className="service-card paper-card">
              <div className="service-icon"><FileText size={24} /></div>
              <h3>Impression <em>papier</em></h3>
              <p>Vos documents A4 ou A3, en noir et blanc ou en couleur. Imprimés avec netteté, déposés directement chez vous.</p>
              <button onClick={() => openQuote('paper')}>Faire ma demande <ArrowRight size={17} /></button>
            </article>
          </div>
        </section>

        <section className="atelier section" id="atelier">
          <div className="section-intro">
            <div className="eyebrow"><span className="eyebrow-dot" /> L’atelier</div>
            <h2>Le beau travail<br /><em>prend forme.</em></h2>
          </div>
          <div className="feature-list">
            <div><Check size={18} /><span><b>Un accompagnement clair</b> à chaque étape de votre projet.</span></div>
            <div><Check size={18} /><span><b>Une fabrication soignée</b> dans notre atelier à Andenne.</span></div>
            <div><Check size={18} /><span><b>Une livraison à domicile</b> selon votre urgence.</span></div>
          </div>
        </section>

        <section className="cta-band" id="contact">
          <div>
            <div className="eyebrow"><span className="eyebrow-dot" /> Contact</div>
            <h2>On imprime<br /><em>quand vous voulez.</em></h2>
            <p>Un besoin précis ou une idée encore floue ? Écrivez-nous, on vous répond avec une proposition claire et personnalisée.</p>
          </div>
          <div className="cta-side">
            <button className="button button-light" onClick={() => openQuote('textile')}>Demander un devis <ArrowRight size={18} /></button>
            <div className="contact-info">
              <p><MapPin size={16} /> Avenue Roi Albert 256, 5300 Andenne</p>
              <p><Clock3 size={16} /> Tous les jours · 9h — 20h</p>
              <p><Phone size={16} /> <a href="tel:+32491500529">0491 50 05 29</a></p>
              <p><MessageCircle size={16} /> <a href="https://wa.me/32491500529" target="_blank" rel="noopener noreferrer">WhatsApp · 0491 50 05 29</a></p>
              <p><Mail size={16} /> <a href="mailto:jetez.lencre@outlook.com">jetez.lencre@outlook.com</a></p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#accueil"><img src="/Projet_Logo.png" alt="" /><span>Jetez <b>l’Encre</b></span></a>
        <p>Impression textile & papier — Andenne, Belgique.</p>
        <span>© 2024 Jetez l’Encre</span>
      </footer>

      {quoteOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setQuoteOpen(false); }}>
          <div className="quote-modal">
            <button className="close-modal" onClick={() => setQuoteOpen(false)} aria-label="Fermer"><X size={20} /></button>
            {submitted ? (
              <div className="success-state">
                <div className="success-icon"><Check size={28} /></div>
                <div className="eyebrow"><span className="eyebrow-dot" /> Demande envoyée</div>
                <h2>Merci, <em>{form.name.split(' ')[0] || 'à vous'}.</em></h2>
                <p>Votre message est prêt dans votre messagerie. Il ne reste plus qu’à l’envoyer à Jetez l’Encre pour que nous puissions vous répondre.</p>
                <button className="button button-dark" onClick={() => setQuoteOpen(false)}>Retour au site <ArrowRight size={18} /></button>
              </div>
            ) : (
              <>
                <div className="eyebrow"><span className="eyebrow-dot" /> Parlons de votre projet</div>
                <h2>Votre demande de<br /><em>devis gratuit.</em></h2>
                <div className="service-switch">
                  <button className={service === 'textile' ? 'active' : ''} onClick={() => setService('textile')}><Shirt size={17} /> Textile</button>
                  <button className={service === 'paper' ? 'active' : ''} onClick={() => setService('paper')}><FileText size={17} /> Papier</button>
                </div>
                <form onSubmit={submitQuote}>
                  <div className="form-grid">
                    <label>Votre nom<input required value={form.name} onChange={(event) => update('name', event.target.value)} placeholder="Prénom Nom" /></label>
                    <label>Votre email<input required type="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="vous@exemple.fr" /></label>
                  </div>
                  <label>Téléphone <span className="optional">(facultatif)</span><input value={form.phone} onChange={(event) => update('phone', event.target.value)} placeholder="04xx xx xx xx" /></label>
                  <label>Décrivez votre projet<textarea required rows={3} value={form.description} onChange={(event) => update('description', event.target.value)} placeholder={service === 'textile' ? 'Quantités, idée, couleurs, date souhaitée...' : 'Type de documents, quantités, date souhaitée...'} /></label>
                  {service === 'textile' ? (
                    <>
                      <div className="form-grid two">
                        <label>Textile<select value={form.textileType} onChange={(event) => update('textileType', event.target.value)}><option>T-shirt</option><option>Sweat / Pull</option><option>Tablier</option><option>Veste</option><option>Gilet de chantier</option><option>Autre</option></select></label>
                        <label>Couleur<select value={form.textileColor} onChange={(event) => update('textileColor', event.target.value)}><option>Blanc</option><option>Noir</option><option>Bleu marine</option><option>Gris chiné</option><option>Autre</option></select></label>
                      </div>
                      <div className="placement-field">
                        <span>Emplacement(s) à personnaliser</span>
                        <div className="placement-chips">{placementOptions.map((option) => <button type="button" key={option} className={form.placements.includes(option) ? 'selected' : ''} onClick={() => togglePlacement(option)}>{form.placements.includes(option) && <Check size={13} />}{option}</button>)}</div>
                        <small>Vous pouvez sélectionner plusieurs zones (ex. cœur + dos).</small>
                      </div>
                    </>
                  ) : (
                    <div className="form-grid three">
                      <label>Format<select value={form.paperFormat} onChange={(event) => update('paperFormat', event.target.value)}><option>A4</option><option>A3</option></select></label>
                      <label>Papier<select value={form.paperColor} onChange={(event) => update('paperColor', event.target.value)}><option>Blanc</option><option>Crème</option><option>Couleur au choix</option></select></label>
                      <label>Impression<select value={form.printMode} onChange={(event) => update('printMode', event.target.value)}><option>Noir & blanc</option><option>Couleur</option></select></label>
                    </div>
                  )}
                  <div className="form-bottom">
                    <div className="delivery">
                      <span>Livraison souhaitée</span>
                      <div>{(['standard', 'rapide', 'express'] as Delivery[]).map((option) => <button type="button" key={option} className={form.delivery === option ? 'selected' : ''} onClick={() => setForm((current) => ({ ...current, delivery: option }))}><span className="delivery-name">{deliveryInfo[option].label}</span><span className="delivery-delay">{deliveryInfo[option].delay}</span></button>)}</div>
                      <p className="delivery-note">Les délais peuvent varier selon votre projet. Voir nos conditions de vente ou échangez avec notre personnel pour une adaptation à votre demande.</p>
                    </div>
                    <label className="upload"><Upload size={17} /><span>{files.length ? `${files.length} fichier${files.length > 1 ? 's' : ''} sélectionné${files.length > 1 ? 's' : ''}` : 'Joindre un fichier'}</span><input type="file" multiple accept="image/*,.pdf" onChange={(event) => setFiles(Array.from(event.target.files || []))} /></label>
                  </div>
                  {error && <p className="form-error">{error}</p>}
                  <button className="button button-dark submit-button" disabled={sending}>{sending ? 'Envoi en cours…' : 'Envoyer ma demande'} <Send size={17} /></button>
                  <small>Vos informations servent uniquement à répondre à votre demande.</small>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
