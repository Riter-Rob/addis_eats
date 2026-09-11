import fs from 'node:fs'

// Copies dist/index.html to dist/404.html for GitHub Pages SPA client-side routing
fs.copyFileSync('dist/index.html', 'dist/404.html')
console.log('✓ Created dist/404.html for GitHub Pages SPA support')
