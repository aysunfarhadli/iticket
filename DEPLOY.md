# Deploy to Render (pulsuz, daimi link)

## 1. GitHub-a push et

```bash
cd /Users/AysunFarhadli/Downloads/IticketProject
git init
git add .
git commit -m "iTicket initial"
# GitHub-da yeni repo yarat (məs: iticket) və:
git remote add origin https://github.com/SENIN-USERNAME/iticket.git
git branch -M main
git push -u origin main
```

## 2. Render.com-da deploy et

1. https://render.com — "Sign up with GitHub"
2. **New +** → **Web Service** → GitHub repo-nu seç (`iticket`)
3. Render avtomatik `render.yaml` və `Dockerfile`-ı tapır
4. **Create Web Service** → 5-10 dəqiqə gözlə (build)
5. Sonda link alırsan: `https://iticket.onrender.com` — bu daimi, hamı üçün açıqdır

## 3. Real email (istəsən)

Render dashboard → Environment → Add:
- `MAIL_MOCK` = `false`
- `MAIL_USERNAME` = sənin Gmail
- `MAIL_PASSWORD` = Gmail App Password (16 simvol, boşluqsuz)
- `MAIL_FROM` = `"iTicket" <sənin@gmail.com>`

"Save" → avtomatik redeploy olur.

## Alternativlər

**Railway:** railway.app → New Project → Deploy from GitHub → seç. Dockerfile-ı avtomatik istifadə edir, 5$ kredit pulsuzdur.

**Fly.io:** `brew install flyctl && flyctl launch` — Dockerfile-ı tapır, pulsuz tier var.

## Məlumat

- Pulsuz Render planı 15 dəqiqə idle-dən sonra yatır (ilk request 30-60s gözləyir — sonra normal).
- H2 in-memory DB — hər restart data itir. Persist lazımdırsa Render-də pulsuz PostgreSQL yarat və `SPRING_PROFILES_ACTIVE=prod` + `SPRING_DATASOURCE_URL/USERNAME/PASSWORD` env-ləri ver.
