// ======= App.jsx (no Tailwind needed) =======
import React, { useEffect, useState } from "react";
import { Car, Store, Wrench, MapPin, ShoppingBag, ShieldCheck, Menu, X, Users, Phone, ArrowRight } from "lucide-react";

//alinin agzina push eleyim

const LOGO_URL = "/images/otogo-logo.png";
const APP_PREVIEW = "/images/app-preview.jpeg";

export default function App() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("EN");

  useEffect(() => {
    // inject stylesheet once
    if (!document.getElementById("otogo-styles")) {
      const style = document.createElement("style");
      style.id = "otogo-styles";
      style.innerHTML = CSS_TEXT;
      document.head.appendChild(style);
    }
    const saved = localStorage.getItem("otogo_lang");
    if (saved) setLang(saved);
  }, []);

  useEffect(() => {
    try { localStorage.setItem("otogo_lang", lang); } catch {}
  }, [lang]);

  const navItems = [
    { id: "features", label: t("Features", lang) },
    { id: "roles", label: t("Who it’s for", lang) },
    { id: "how", label: t("How it works", lang) },
    { id: "faq", label: "FAQ" },
  ];

  const onNavClick = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setOpen(false);
    }
  };

  return (
    <div className="page">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="container nav-inner">
          <button className="brand" onClick={() => onNavClick("top")}> 
            <img src={LOGO_URL} alt="OTOGO logo" className="logo" />
            <span className="brand-name">OTOGO</span>
          </button>

          <nav className="nav-links">
            {navItems.map((n) => (
              <button key={n.id} onClick={() => onNavClick(n.id)} className="nav-link">{n.label}</button>
            ))}
          </nav>

          <div className="nav-cta">
            <LangSwitcher lang={lang} setLang={setLang} />
            <button className="btn btn-accent" onClick={() => onNavClick("request")}>{t("Request for Business", lang)} <ArrowRight size={16} /></button>
          </div>

          <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Open menu">{open ? <X size={20}/> : <Menu size={20}/>}</button>
        </div>

        {open && (
          <div className="mobile-panel">
            <div className="container mobile-inner">
              <LangSwitcher lang={lang} setLang={setLang} />
              <div className="mobile-links">
                {navItems.map((n) => (
                  <button key={n.id} onClick={() => onNavClick(n.id)} className="mobile-link">{n.label}</button>
                ))}
              </div>
              <button className="btn btn-accent block" onClick={() => onNavClick("request")}>{t("Request for Business", lang)} <ArrowRight size={16}/></button>
            </div>
          </div>
        )}
      </header>

      {/* TOP ANCHOR */}
      <div id="top" />

      {/* HERO */}
      <section className="hero">
        <div className="container grid two">
          <div>
            <h1 className="h1">{t("All your car needs in one app.", lang)}</h1>
            <p className="lead">{t("Find nearby services, car washes, and auto‑part stores. Check details, hours, and prices. Simple, fast, and built for drivers and service owners.", lang)}</p>
            <div className="row gap">
              <a href="#" className="btn btn-ghost">{t("Download for iOS (soon)", lang)}</a>
              <a href="#" className="btn btn-ghost">{t("Download for Android (soon)", lang)}</a>
            </div>
          </div>
          <div className="phone-frame">
            <img src={APP_PREVIEW} alt="OTOGO app preview" className="phone-img" />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="section alt">
        <div className="container">
          <div className="grid three top">
            <div>
              <h2 className="h2">{t("Discover & compare", lang)}</h2>
              <p className="muted">{t("Find the right place faster.", lang)}</p>
              <ul className="bullets">
                <li><span className="dot"/> {t("Nearby services", lang)}</li>
                <li><span className="dot"/> {t("Clear details", lang)}</li>
                <li><span className="dot"/> {t("Catalogs for parts", lang)}</li>
              </ul>
            </div>
            <Feature icon={MapPin} title={t("Nearby services", lang)} desc={t("See car washes, mechanics, and stores around you.", lang)} />
            <Feature icon={ShieldCheck} title={t("Clear details", lang)} desc={t("Check hours, ratings, and service scope before you go.", lang)} />
          </div>
          <div className="grid one">
            <Feature icon={ShoppingBag} title={t("Catalogs for parts", lang)} desc={t("Browse products uploaded by stores to plan your purchase.", lang)} />
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section id="roles" className="section">
        <div className="container">
          <div className="narrow">
            <h2 className="h2">{t("Who it’s for", lang)}</h2>
            <p className="muted">{t("Different roles, one platform.", lang)}</p>
          </div>
          <div className="grid three">
            <RoleCard icon={Car} title={t("User (Driver)", lang)} points={[t("Default role", lang), t("Own cars, browse services & products", lang), t("Save favorites and view on map", lang)]} />
            <RoleCard icon={Wrench} title={t("Professional", lang)} points={[t("Switch to a pro account", lang), t("Act as Service Provider (mechanic, painter, etc.)", lang), t("Driver Personnel (evacuator, sober driver)", lang)]} />
            <RoleCard icon={Store} title={t("Business Page", lang)} points={[t("Represents a business, tied to a user", lang), t("Two types: Catalog‑based or Driver‑based", lang), t("Manage products or driver roster", lang)]} />
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="section alt">
        <div className="container">
          <h2 className="h2">{t("How it works", lang)}</h2>
          <div className="grid four steps">
            <Step n={1} title={t("Open the app", lang)}>{t("Allow location to see places around you.", lang)}</Step>
            <Step n={2} title={t("Pick a place", lang)}>{t("View details, prices (if available), and contact info.", lang)}</Step>
            <Step n={3} title={t("View on map", lang)}>{t("See location and plan your route.", lang)}</Step>
            <Step n={4} title={t("Go & get it", lang)}>{t("We don't take orders. Call ahead if needed and buy on site.", lang)}</Step>
          </div>
        </div>
      </section>

      {/* REQUEST / BUSINESS CTA */}
      <section id="request" className="section">
        <div className="container grid two cta">
          <div>
            <h2 className="h2">{t("List your business on OTOGO", lang)}</h2>
            <p className="muted">{t("Get discovered by nearby drivers. Publish a catalog, add your driver roster, and keep your info up to date.", lang)}</p>
            <ul className="list">
              <li><ShieldCheck size={18}/> {t("Verified badge options", lang)}</li>
              <li><ShoppingBag size={18}/> {t("Product/service catalog (no checkout)", lang)}</li>
              <li><Users size={18}/> {t("Driver roster for evacuators & sober drivers", lang)}</li>
            </ul>
            <div className="row gap">
              <a href="#biz-form" className="btn btn-accent">{t("Request for Business", lang)} <ArrowRight size={16}/></a>
              <a href="tel:+000000000" className="btn btn-outline"><Phone size={16}/> {t("Talk to us", lang)}</a>
            </div>
          </div>
          <div className="panel"><div className="panel-empty"><Store className="mr"/> {t("Your logo & details here", lang)}</div></div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section alt">
        <div className="container">
          <h2 className="h2">FAQ</h2>
          <div className="grid two">
            <Faq q={t("Is there online ordering?", lang)} a={t("Not in the first version. You can browse catalogs and visit the store.", lang)} />
            <Faq q={t("How do I get my business listed?", lang)} a={t("Use the ‘Request for Business’ button and we’ll contact you.", lang)} />
            <Faq q={t("Is the app free for drivers?", lang)} a={t("Yes. Basic features for drivers are free.", lang)} />
            <Faq q={t("Which languages are supported?", lang)} a={t("Azerbaijani, English, and Russian.", lang)} />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="row center">
            <img src={LOGO_URL} alt="logo" className="logo sm" />
            <span className="muted">© {new Date().getFullYear()} OTOGO. All rights reserved.</span>
          </div>
          <div className="row gap small">
            <a href="#" className="link">{t("Privacy", lang)}</a>
            <a href="#" className="link">{t("Terms", lang)}</a>
            <a href="#" className="link">{t("Contact", lang)}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function LangSwitcher({ lang, setLang }) {
  const opts = ["AZ", "EN", "RU"];
  return (
    <div className="langs">
      {opts.map((o) => (
        <button key={o} onClick={() => setLang(o)} className={`lang ${lang===o? "active": ""}`}>{o}</button>
      ))}
    </div>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="card">
      <div className="icon"><Icon size={20}/></div>
      <h3 className="h3">{title}</h3>
      <p className="muted small">{desc}</p>
    </div>
  );
}

function RoleCard({ icon: Icon, title, points }) {
  return (
    <div className="card">
      <div className="row">
        <div className="icon"><Icon size={20}/></div>
        <h3 className="h3">{title}</h3>
      </div>
      <ul className="list small">
        {points.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>
    </div>
  );
}

function Step({ n, title, children }) {
  return (
    <div className="card step">
      <div className="badge">{n}</div>
      <h4 className="h4">{title}</h4>
      <p className="muted small">{children}</p>
    </div>
  );
}

function Faq({ q, a }) {
  return (
    <div className="card">
      <h4 className="h4">{q}</h4>
      <p className="muted">{a}</p>
    </div>
  );
}

function t(text, lang) {
  // (same dictionaries as before)
  const EN = {"Features":"Features","Who it’s for":"Who it’s for","How it works":"How it works","Request for Business":"Request for Business","All your car needs in one app.":"All your car needs in one app.","Find nearby services, car washes, and auto‑part stores. Check details, hours, and prices. Simple, fast, and built for drivers and service owners.":"Find nearby services, car washes, and auto‑part stores. Check details, hours, and prices. Simple, fast, and built for drivers and service owners.","Download for iOS (soon)":"Download for iOS (soon)","Download for Android (soon)":"Download for Android (soon)","Discover & compare":"Discover & compare","Find the right place faster.":"Find the right place faster.","Nearby services":"Nearby services","Clear details":"Clear details","Catalogs for parts":"Catalogs for parts","See car washes, mechanics, and stores around you.":"See car washes, mechanics, and stores around you.","Check hours, ratings, and service scope before you go.":"Check hours, ratings, and service scope before you go.","Browse products uploaded by stores to plan your purchase.":"Browse products uploaded by stores to plan your purchase.","Different roles, one platform.":"Different roles, one platform.","User (Driver)":"User (Driver)","Default role":"Default role","Own cars, browse services & products":"Own cars, browse services & products","Save favorites and view on map":"Save favorites and view on map","Professional":"Professional","Switch to a pro account":"Switch to a pro account","Act as Service Provider (mechanic, painter, etc.)":"Act as Service Provider (mechanic, painter, etc.)","Driver Personnel (evacuator, sober driver)":"Driver Personnel (evacuator, sober driver)","Business Page":"Business Page","Represents a business, tied to a user":"Represents a business, tied to a user","Two types: Catalog‑based or Driver‑based":"Two types: Catalog‑based or Driver‑based","Manage products or driver roster":"Manage products or driver roster","Open the app":"Open the app","Allow location to see places around you.":"Allow location to see places around you.","Pick a place":"Pick a place","View details, prices (if available), and contact info.":"View details, prices (if available), and contact info.","View on map":"View on map","See location and plan your route.":"See location and plan your route.","Go & get it":"Go & get it","We don't take orders. Call ahead if needed and buy on site.":"We don't take orders. Call ahead if needed and buy on site.","List your business on OTOGO":"List your business on OTOGO","Get discovered by nearby drivers. Publish a catalog, add your driver roster, and keep your info up to date.":"Get discovered by nearby drivers. Publish a catalog, add your driver roster, and keep your info up to date.","Verified badge options":"Verified badge options","Product/service catalog (no checkout)":"Product/service catalog (no checkout)","Driver roster for evacuators & sober drivers":"Driver roster for evacuators & sober drivers","Talk to us":"Talk to us","Your logo & details here":"Your logo & details here","Is there online ordering?":"Is there online ordering?","Not in the first version. You can browse catalogs and visit the store.":"Not in the first version. You can browse catalogs and visit the store.","How do I get my business listed?":"How do I get my business listed?","Use the ‘Request for Business’ button and we’ll contact you.":"Use the ‘Request for Business’ button and we’ll contact you.","Is the app free for drivers?":"Is the app free for drivers?","Yes. Basic features for drivers are free.":"Yes. Basic features for drivers are free.","Which languages are supported?":"Which languages are supported?","Azerbaijani, English, and Russian.":"Azerbaijani, English, and Russian.","Privacy":"Privacy","Terms":"Terms","Contact":"Contact"};
  const AZ = {"Features":"Xüsusiyyətlər","Who it’s for":"Kimlər üçündür","How it works":"Necə işləyir","Request for Business":"Biznes üçün müraciət","All your car needs in one app.":"Avtomobiliniz üçün hər şey bir tətbiqdə.","Find nearby services, car washes, and auto‑part stores. Check details, hours, and prices. Simple, fast, and built for drivers and service owners.":"Yaxınlıqdakı servis, avtoyuma və ehtiyat hissələri mağazalarını tapın. Detalları, saatları və qiymətləri yoxlayın.","Download for iOS (soon)":"iOS üçün yüklə (tezliklə)","Download for Android (soon)":"Android üçün yüklə (tezliklə)","Discover & compare":"Kəşf et və müqayisə et","Find the right place faster.":"Düzgün yeri daha tez tapın.","Nearby services":"Yaxın xidmətlər","Clear details":"Aydın məlumatlar","Catalogs for parts":"Ehtiyat hissələri kataloqları","See car washes, mechanics, and stores around you.":"Ətrafınızdakı avtoyuma, mexanik və mağazaları görün.","Check hours, ratings, and service scope before you go.":"Getməzdən əvvəl iş saatı, reytinq və xidmət sahəsini yoxlayın.","Browse products uploaded by stores to plan your purchase.":"Mağazaların yerləşdirdiyi məhsullara baxın.","Different roles, one platform.":"Fərqli rollar, tək platforma.","User (Driver)":"İstifadəçi (Sürücü)","Default role":"Defolt rol","Own cars, browse services & products":"Maşın əlavə et, xidmət və məhsullara bax","Save favorites and view on map":"Seçilənləri saxla və xəritədə bax","Professional":"Mütəxəssis","Switch to a pro account":"Pro hesaba keç","Act as Service Provider (mechanic, painter, etc.)":"Xidmət göstər (mexanik, rəngsaz və s.)","Driver Personnel (evacuator, sober driver)":"Sürücü personalı (evakuator, ayıq sürücü)","Business Page":"Biznes Səhifəsi","Represents a business, tied to a user":"İstifadəçiyə bağlı biznes","Two types: Catalog‑based or Driver‑based":"2 növ: Kataloq əsaslı və ya Sürücü əsaslı","Manage products or driver roster":"Məhsullar və ya sürücü heyətini idarə et","Open the app":"Tətbiqi aç","Allow location to see places around you.":"Yaxındakı yerləri görmək üçün məkan icazəsi verin.","Pick a place":"Məkan seç","View details, prices (if available), and contact info.":"Detallara, qiymətlərə (əgər varsa) və əlaqəyə baxın.","View on map":"Xəritədə bax","See location and plan your route.":"Məkana bax və marşrutu planla.","Go & get it":"Get və əldə et","We don't take orders. Call ahead if needed and buy on site.":"Sifariş yoxdur. Lazım olsa əvvəlcədən zəng edin və yerində alın.","List your business on OTOGO":"Biznesini OTOGO‑da siyahıya al","Get discovered by nearby drivers. Publish a catalog, add your driver roster, and keep your info up to date.":"Yaxındakı sürücülər tərəfindən kəşf olun. Kataloq dərc et, sürücü heyətini əlavə et və məlumatlarını yenilə.","Verified badge options":"Təsdiq nişanı seçimləri","Product/service catalog (no checkout)":"Məhsul/xidmət kataloqu (checkout yoxdur)","Driver roster for evacuators & sober drivers":"Evakuator və ayıq sürücülər üçün heyət","Talk to us":"Bizimlə əlaqə","Your logo & details here":"Loqonuz və detallarınız burada","Is there online ordering?":"Onlayn sifariş var?","Not in the first version. You can browse catalogs and visit the store.":"İlk versiyada yoxdur. Kataloqlara baxa və mağazaya gedə bilərsiniz.","How do I get my business listed?":"Biznesimi necə əlavə edim?","Use the ‘Request for Business’ button and we’ll contact you.":"‘Biznes üçün müraciət’ düyməsini sıxın, əlaqə saxlayacağıq.","Is the app free for drivers?":"Sürücülər üçün pulsuzdur?","Yes. Basic features for drivers are free.":"Bəli. Sürücülər üçün əsas funksiyalar pulsuzdur.","Which languages are supported?":"Hansı dillər dəstəklənir?","Azerbaijani, English, and Russian.":"Azərbaycan, İngilis və Rus dilləri.","Privacy":"Məxfilik","Terms":"Şərtlər","Contact":"Əlaqə"};
  const RU = {"Features":"Возможности","Who it’s for":"Для кого","How it works":"Как это работает","Request for Business":"Для бизнеса","All your car needs in one app.":"Всё для авто в одном приложении.","Find nearby services, car washes, and auto‑part stores. Check details, hours, and prices. Simple, fast, and built for drivers and service owners.":"Находите сервисы, мойки и магазины запчастей рядом. Смотрите детали, часы и цены.","Download for iOS (soon)":"Скачать для iOS (скоро)","Download for Android (soon)":"Скачать для Android (скоро)","Discover & compare":"Найдите и сравните","Find the right place faster.":"Быстрее находите нужное место.","Nearby services":"Сервисы рядом","Clear details":"Подробная информация","Catalogs for parts":"Каталоги запчастей","See car washes, mechanics, and stores around you.":"Смотрите мойки, механиков и магазины поблизости.","Check hours, ratings, and service scope before you go.":"Проверьте часы работы, рейтинг и услуги заранее.","Browse products uploaded by stores to plan your purchase.":"Просматривайте товары, загруженные магазинами.","Different roles, one platform.":"Разные роли — одна платформа.","User (Driver)":"Пользователь (Водитель)","Default role":"Роль по умолчанию","Own cars, browse services & products":"Добавляйте авто, просматривайте услуги и товары","Save favorites and view on map":"Сохраняйте избранное и смотрите на карте","Professional":"Профессионал","Switch to a pro account":"Переключитесь на проф. аккаунт","Act as Service Provider (mechanic, painter, etc.)":"Оказывайте услуги (механик, маляр и т.п.)","Driver Personnel (evacuator, sober driver)":"Персонал водителей (эвакуатор, трезвый водитель)","Business Page":"Страница бизнеса","Represents a business, tied to a user":"Представляет бизнес, привязанный к пользователю","Two types: Catalog‑based or Driver‑based":"2 типа: с каталогом или со штатом водителей","Manage products or driver roster":"Управляйте товарами или штатом водителей","Open the app":"Откройте приложение","Allow location to see places around you.":"Разрешите доступ к гео, чтобы видеть места рядом.","Pick a place":"Выберите место","View details, prices (if available), and contact info.":"Смотрите детали, цены (если есть) и контакты.","View on map":"Смотрите на карте","See location and plan your route.":"Смотрите местоположение и планируйте маршрут.","Go & get it":"Приезжайте и берите","We don't take orders. Call ahead if needed and buy on site.":"Мы не принимаем заказы. При необходимости звоните заранее и покупайте на месте.","List your business on OTOGO":"Разместите бизнес в OTOGO","Get discovered by nearby drivers. Publish a catalog, add your driver roster, and keep your info up to date.":"Вас найдут водители рядом. Публикуйте каталог, добавляйте водителей и обновляйте информацию.","Verified badge options":"Варианты значка проверено","Product/service catalog (no checkout)":"Каталог товаров/услуг (без заказа)","Driver roster for evacuators & sober drivers":"Штат водителей: эвакуатор и трезвый водитель","Talk to us":"Связаться с нами","Your logo & details here":"Ваш логотип и детали здесь","Is there online ordering?":"Есть онлайн‑заказ?","Not in the first version. You can browse catalogs and visit the store.":"В первой версии нет. Можно просматривать каталоги и посещать магазин.","How do I get my business listed?":"Как добавить бизнес?","Use the ‘Request for Business’ button and we’ll contact you.":"Нажмите «Для бизнеса», и мы свяжемся с вами.","Is the app free for drivers?":"Приложение бесплатно для водителей?","Yes. Basic features for drivers are free.":"Да. Базовые функции бесплатны.","Which languages are supported?":"Какие языки поддерживаются?","Azerbaijani, English, and Russian.":"Азербайджанский, английский и русский.","Privacy":"Конфиденциальность","Terms":"Условия","Contact":"Контакты"};
  const dict = lang === 'AZ' ? AZ : lang === 'RU' ? RU : EN;
  return dict[text] || text;
}

// ======= CSS (injected) =======
const CSS_TEXT = `
:root{--bg:#14151A;--text:#f2f2f2;--muted:rgba(255,255,255,.7);--line:rgba(255,255,255,.12);--panel:rgba(255,255,255,.05);--accent:#D5FF5F}
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--text);font-family:Inter,system-ui,Arial}
.container{max-width:1100px;margin:0 auto;padding:0 16px}
.h1{font-size:44px;line-height:1.15;margin:0 0 12px;font-weight:800}
.h2{font-size:30px;margin:0 0 6px;font-weight:700}
.h3{font-size:18px;margin:12px 0 6px;font-weight:600}
.h4{font-size:16px;margin:8px 0 4px;font-weight:600}
.lead{font-size:18px;color:var(--muted)}
.muted{color:var(--muted)}.small{font-size:14px}.link{color:var(--text);opacity:.8;text-decoration:none}.link:hover{opacity:1}
.row{display:flex;align-items:center}.row.gap{gap:12px}.row.center{gap:8px}
.grid{display:grid;gap:24px}.grid.two{grid-template-columns:1fr}.grid.three{grid-template-columns:1fr}.grid.four{grid-template-columns:1fr}.grid.one{grid-template-columns:1fr}
@media(min-width:768px){.grid.two{grid-template-columns:1fr 1fr}.grid.three{grid-template-columns:1fr 1fr 1fr}.grid.four{grid-template-columns:repeat(4,1fr)}}
.section{padding:72px 0;border-top:1px solid var(--line)}.section.alt{background:#0f1013}
.navbar{position:sticky;top:0;z-index:50;background:rgba(20,21,26,.8);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
.nav-inner{height:64px;display:flex;align-items:center;justify-content:space-between}
.brand{display:flex;align-items:center;gap:10px;background:none;border:0;color:inherit;cursor:pointer}
.logo{width:40px;height:40px}.logo.sm{width:24px;height:24px}.brand-name{font-weight:700}
.nav-links{display:none;gap:24px}@media(min-width:768px){.nav-links{display:flex}}
.nav-link{background:none;border:0;color:var(--text);opacity:.9;cursor:pointer}
.nav-link:hover{opacity:1}
.nav-cta{display:none;gap:10px}@media(min-width:640px){.nav-cta{display:flex}}
.menu-btn{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:12px;border:1px solid var(--line);background:rgba(255,255,255,.05)}
@media(min-width:768px){.menu-btn{display:none}}
.mobile-panel{border-top:1px solid var(--line);background:#0f1013}
.mobile-inner{padding:12px 0;display:flex;flex-direction:column;gap:12px}
.mobile-links{display:flex;flex-direction:column}
.mobile-link{text-align:left;padding:10px;border-radius:10px;border:0;background:none;color:var(--text);opacity:.9}
.mobile-link:hover{background:rgba(255,255,255,.05)}
.langs{display:inline-flex;gap:6px}
.lang{padding:6px 10px;border-radius:8px;background:transparent;border:0;color:var(--text);opacity:.8;cursor:pointer}
.lang.active{background:var(--accent);color:#14151A;opacity:1}
.btn{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:14px;border:1px solid var(--line);background:rgba(255,255,255,.06);color:var(--text);font-weight:600;text-decoration:none;cursor:pointer}
.btn:hover{background:rgba(255,255,255,.1)}
.btn-accent{background:var(--accent);border-color:var(--accent);color:#14151A}
.btn-outline{background:transparent}
.btn-ghost{background:rgba(255,255,255,.06)}
.block{width:100%;justify-content:center}
.hero{position:relative;overflow:hidden;padding:72px 0}
.phone-frame{max-width:320px;margin:0 auto;background:var(--panel);border:1px solid var(--line);border-radius:28px;padding:12px;box-shadow:0 25px 60px rgba(0,0,0,.5)}
.phone-img{width:100%;height:100%;border-radius:22px;object-fit:cover}
.card{background:var(--panel);border:1px solid var(--line);border-radius:22px;padding:18px}
.icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:rgba(213,255,95,.18);color:var(--accent)}
.bullets{margin:18px 0 0;padding:0;list-style:none}.bullets li{display:flex;gap:10px;margin:8px 0}.bullets .dot{width:8px;height:8px;background:var(--accent);border-radius:999px;margin-top:8px}
.list{margin:14px 0 0;padding:0;list-style:none}.list li{display:flex;gap:8px;align-items:flex-start;margin:8px 0}
.step .badge{width:32px;height:32px;border-radius:999px;background:var(--accent);color:#14151A;font-weight:700;display:flex;align-items:center;justify-content:center}
.panel{background:var(--panel);border:1px solid var(--line);border-radius:22px;padding:18px}
.panel-empty{min-height:220px;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.6)}
.footer{padding:40px 0}.footer-inner{display:flex;flex-direction:column;gap:14px;align-items:center;justify-content:space-between}
@media(min-width:768px){.footer-inner{flex-direction:row}}
.narrow{max-width:560px}
.top{align-items:start}
`;
