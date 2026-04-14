export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-20">
      <div className="container-x py-12 grid md:grid-cols-4 gap-8 text-sm text-slate-600">
        <div>
          <div className="font-extrabold text-slate-900 mb-3">ITICKET</div>
          <p>Discover and book unforgettable experiences — clean, fast, premium.</p>
        </div>
        <div>
          <div className="font-semibold text-slate-900 mb-3">Categories</div>
          <ul className="space-y-1"><li>Music</li><li>Tech</li><li>Sport</li><li>Festival</li></ul>
        </div>
        <div>
          <div className="font-semibold text-slate-900 mb-3">Company</div>
          <ul className="space-y-1"><li>About</li><li>Careers</li><li>Contact</li></ul>
        </div>
        <div>
          <div className="font-semibold text-slate-900 mb-3">Get updates</div>
          <div className="flex gap-2"><input className="input flex-1" placeholder="email@..." /><button className="btn-primary">Subscribe</button></div>
        </div>
      </div>
      <div className="text-center text-xs text-slate-400 pb-6">© 2026 iTicket</div>
    </footer>
  );
}
