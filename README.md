
# Min Dag v2 – GitHub Pages (PWA)

## Kom igång
```bash
npm install
npm run dev
```

## Bygg & exportera statiskt (för Pages)
```bash
npm run build
```
Detta skapar `out/` som publiceras av GitHub Actions.

## Deploy
1) Skapa repo: `imacpar.github.io`  
2) Push:a koden till `main`  
3) I GitHub → Settings → Pages → Source: GitHub Actions  
4) Vänta på workflow → Live på https://imacpar.github.io/

## PWA
- `public/manifest.json`, `public/sw.js`, `public/icons/*`
- Registreras via `app/pwa-register.tsx`

## Notering
Denna app använder endast client-side rendering och localStorage.
