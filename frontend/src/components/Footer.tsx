export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-20">
      <div className="container-x py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-500 grid place-items-center text-slate-900 font-extrabold shadow-glow">i</div>
              <span className="font-extrabold tracking-wide text-slate-900">ITICKET</span>
            </div>
            <p className="text-sm text-slate-600 max-w-xs">Modern event ticketing platform — concerts, theatre, festivals, sports.</p>
            <div className="mt-4 flex gap-2">
              <a className="w-8 h-8 rounded-full bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-600 grid place-items-center text-sm transition" href="#">f</a>
              <a className="w-8 h-8 rounded-full bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-600 grid place-items-center text-sm transition" href="#">ig</a>
              <a className="w-8 h-8 rounded-full bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-600 grid place-items-center text-sm transition" href="#">𝕏</a>
              <a className="w-8 h-8 rounded-full bg-slate-100 hover:bg-brand-50 hover:text-brand-600 text-slate-600 grid place-items-center text-sm transition" href="#">in</a>
            </div>
          </div>

          <div>
            <div className="font-semibold text-slate-900 mb-3 text-sm">Categories</div>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-brand-600">Music</a></li>
              <li><a href="#" className="hover:text-brand-600">Theatre</a></li>
              <li><a href="#" className="hover:text-brand-600">Sport</a></li>
              <li><a href="#" className="hover:text-brand-600">Festival</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-slate-900 mb-3 text-sm">Company</div>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-brand-600">About</a></li>
              <li><a href="#" className="hover:text-brand-600">Careers</a></li>
              <li><a href="#" className="hover:text-brand-600">Contact</a></li>
              <li><a href="#" className="hover:text-brand-600">Help</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-slate-900 mb-3 text-sm">Legal</div>
            <ul className="space-y-2 text-sm text-slate-600">
              <li><a href="#" className="hover:text-brand-600">Terms</a></li>
              <li><a href="#" className="hover:text-brand-600">Privacy</a></li>
              <li><a href="#" className="hover:text-brand-600">Cookies</a></li>
              <li><a href="#" className="hover:text-brand-600">Refunds</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© 2026 iTicket. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span>Secure payments</span>
            <span>•</span>
            <span>Instant e-tickets</span>
            <span>•</span>
            <span>🇦🇿 Made in Baku</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
