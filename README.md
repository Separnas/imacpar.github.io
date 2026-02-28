
# Min Dag ✨ – Komplett paket

Detta paket innehåller **alla filer** för din privata familjekalender yes:
- Next.js 14 (App Router) – statisk export till `out/`
- Tailwind CSS
- PWA (manifest, ikoner, service worker)
- GitHub Pages workflow
- Lokal lagring per användare (ingen delning, ingen server)

## Så kör du
1. Lägg alla filer i repo‐roten.
2. Commit & push till `main`.
3. I **Settings → Pages**: Source = **GitHub Actions**.
4. När Actions är **grön**: öppna sidan på
   `https://<dittkonto>.github.io/imacpar.github.io/` (hård omladdning).

På mobil: "Lägg till på hemskärmen" för app‐upplevelse.

## Viktigt om privat data
Varje enhet sparar sin egen data i **LocalStorage** under nycklar som `md:v1:<namn>:tasks`.
Deploy/uppdateringar rör **inte** den datan.
