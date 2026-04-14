import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Lang = 'az' | 'en' | 'ru';

const dict: Record<Lang, Record<string, string>> = {
  az: {
    'nav.discover':'Kəşf et', 'nav.events':'Tədbirlər', 'nav.myTickets':'Biletlərim',
    'nav.orders':'Sifarişlər', 'nav.admin':'Admin', 'nav.login':'Daxil ol', 'nav.signup':'Qeydiyyat',
    'nav.signout':'Çıxış',
    'hero.badge':'🎟  Premium event bilet platforması',
    'hero.title1':'Tədbirləri kəşf et,', 'hero.title2':'Təcrübəni tap',
    'hero.desc':'Konsert, teatr, festival, idman — saniyələrdə al, e-bilet dərhal, bir klikdə hədiyyə et.',
    'hero.search':'Tədbir, sənətçi, məkan axtar...', 'hero.searchBtn':'Axtar',
    'hero.f1':'✓ Dərhal e-bilet', 'hero.f2':'✓ Asan transfer', 'hero.f3':'✓ Təhlükəsiz ödəniş',
    'cat.title':'Kateqoriyalar', 'cat.all':'Hamısı →',
    'trending.title':'Trend tədbirlər', 'trending.sub':'Bu həftənin ən sevilənləri', 'trending.all':'Hamısına bax →',
    'upcoming.title':'Yaxınlaşan tədbirlər', 'upcoming.sub':'Qarşıdakıları qaçırma',
    'cta.title':'Heç bir şou qaçmasın.', 'cta.desc':'Həftəlik xəbər lentinə abunə ol — erkən biletlər və eksklüziv təkliflər.',
    'cta.subscribe':'Abunə ol',
    'footer.cat':'Kateqoriyalar', 'footer.company':'Şirkət', 'footer.legal':'Hüquqi',
    'footer.tagline':'Modern event bilet platforması — konsert, teatr, festival, idman.',
    'event.about':'Tədbir haqqında', 'event.venue':'Məkan', 'event.tickets':'Biletlər',
    'event.soldOut':'Bitib', 'event.buyBtn':'Al / Bron et', 'event.left':'qalıb', 'event.loginPrompt':'Bilet üçün giriş et →',
    'event.seatMap':'Oturacaq sxemi', 'event.view2d':'2D', 'event.view3d':'3D',
    'event.available':'Boş', 'event.taken':'Satılıb', 'event.selected':'Seçilmiş',
    'event.stage':'SƏHNƏ', 'event.selectSeats':'Oturacaqları seç',
    'common.loading':'Yüklənir...', 'common.price':'Qiymət'
  },
  en: {
    'nav.discover':'Discover','nav.events':'Events','nav.myTickets':'My Tickets',
    'nav.orders':'Orders','nav.admin':'Admin','nav.login':'Log in','nav.signup':'Sign up','nav.signout':'Sign out',
    'hero.badge':'🎟  Premium event ticket platform',
    'hero.title1':'Discover Events,','hero.title2':'Find Your Experience',
    'hero.desc':'Concerts, theatre, festivals, sports — book in seconds, instant e-tickets, transfer with one click.',
    'hero.search':'Search events, artists, venues...','hero.searchBtn':'Search',
    'hero.f1':'✓ Instant e-tickets','hero.f2':'✓ Easy transfer','hero.f3':'✓ Secure checkout',
    'cat.title':'Browse by category','cat.all':'All events →',
    'trending.title':'Trending now','trending.sub':'The most-loved events this week','trending.all':'See all →',
    'upcoming.title':'Upcoming events','upcoming.sub':"Don't miss what's next",
    'cta.title':'Never miss the show.','cta.desc':'Subscribe to weekly drops — early bird tickets and exclusive presales.',
    'cta.subscribe':'Subscribe',
    'footer.cat':'Categories','footer.company':'Company','footer.legal':'Legal',
    'footer.tagline':'Modern event ticketing platform — concerts, theatre, festivals, sports.',
    'event.about':'About this event','event.venue':'Venue','event.tickets':'Tickets',
    'event.soldOut':'Sold out','event.buyBtn':'Buy / Book','event.left':'left','event.loginPrompt':'Log in to book →',
    'event.seatMap':'Seat map','event.view2d':'2D','event.view3d':'3D',
    'event.available':'Available','event.taken':'Taken','event.selected':'Selected',
    'event.stage':'STAGE','event.selectSeats':'Select seats',
    'common.loading':'Loading...','common.price':'Price'
  },
  ru: {
    'nav.discover':'Афиша','nav.events':'События','nav.myTickets':'Мои билеты',
    'nav.orders':'Заказы','nav.admin':'Админ','nav.login':'Войти','nav.signup':'Регистрация','nav.signout':'Выйти',
    'hero.badge':'🎟  Премиум-платформа билетов',
    'hero.title1':'Открой события,','hero.title2':'Найди впечатление',
    'hero.desc':'Концерты, театр, фестивали, спорт — купить за секунды, мгновенный e-билет, передача в один клик.',
    'hero.search':'Найди событие, артиста, площадку...','hero.searchBtn':'Поиск',
    'hero.f1':'✓ Мгновенные e-билеты','hero.f2':'✓ Лёгкая передача','hero.f3':'✓ Безопасная оплата',
    'cat.title':'Категории','cat.all':'Все события →',
    'trending.title':'В тренде','trending.sub':'Самые популярные события недели','trending.all':'Все →',
    'upcoming.title':'Скоро','upcoming.sub':'Не пропусти следующие',
    'cta.title':'Не пропусти шоу.','cta.desc':'Подпишись — ранние билеты и эксклюзивные пресейлы.',
    'cta.subscribe':'Подписаться',
    'footer.cat':'Категории','footer.company':'Компания','footer.legal':'Правовая',
    'footer.tagline':'Современная платформа билетов — концерты, театр, фестивали, спорт.',
    'event.about':'О событии','event.venue':'Место','event.tickets':'Билеты',
    'event.soldOut':'Продано','event.buyBtn':'Купить','event.left':'осталось','event.loginPrompt':'Войдите, чтобы купить →',
    'event.seatMap':'Схема зала','event.view2d':'2D','event.view3d':'3D',
    'event.available':'Свободно','event.taken':'Занято','event.selected':'Выбрано',
    'event.stage':'СЦЕНА','event.selectSeats':'Выбрать места',
    'common.loading':'Загрузка...','common.price':'Цена'
  }
};

type S = { lang: Lang; setLang: (l: Lang) => void };
export const useLang = create<S>()(persist((set) => ({ lang: 'az', setLang: (l) => set({ lang: l }) }), { name: 'iticket-lang' }));

export const useT = () => {
  const lang = useLang(s => s.lang);
  return (key: string) => dict[lang][key] ?? key;
};
