const fs = require('fs');
const path = require('path');

const sites = [
  { name: 'ambalaj', port: 3001, title: 'Bakırcılar Ambalaj', color: '#3b82f6', description: 'Ambalaj çözümleri ve üretimi' },
  { name: 'yazilim', port: 3002, title: 'Bakırcılar Yazılım', color: '#8b5cf6', description: 'Yazılım geliştirme ve danışmanlık' },
  { name: 'danismanlik', port: 3003, title: 'Bakırcılar Danışmanlık', color: '#10b981', description: 'İş danışmanlığı ve stratejik planlama' },
  { name: 'emlak', port: 3004, title: 'Bakırcılar Emlak', color: '#f97316', description: 'Gayrimenkul yatırım ve danışmanlık' },
  { name: 'otomotiv', port: 3005, title: 'Bakırcılar Otomotiv', color: '#ef4444', description: 'Otomotiv ürün ve hizmetleri' },
  { name: 'yolpilot', port: 3006, title: 'Yolpilot', color: '#2563eb', description: 'Navigasyon ve sürüş yardımcısı uygulaması' }
];

const appsDir = path.join(__dirname, '../apps');

sites.forEach(site => {
  const siteDir = path.join(appsDir, site.name);

  // Create directory structure
  if (!fs.existsSync(siteDir)) {
    fs.mkdirSync(siteDir, { recursive: true });
  }

  // Create app directory
  const appDir = path.join(siteDir, 'app/[locale]');
  fs.mkdirSync(appDir, { recursive: true });

  // Create package.json
  const packageJson = {
    name: site.name,
    version: "0.1.0",
    private: true,
    scripts: {
      dev: `next dev -p ${site.port}`,
      build: "next build",
      start: "next start",
      lint: "next lint"
    },
    dependencies: {
      "@bakircilar/ui": "*",
      "@bakircilar/i18n": "*",
      "next": "14.2.18",
      "next-intl": "^3.22.0",
      "react": "^18.3.1",
      "react-dom": "^18.3.1",
      "framer-motion": "^11.11.17",
      "axios": "^1.7.7"
    },
    devDependencies: {
      "@types/node": "^22",
      "@types/react": "^18",
      "@types/react-dom": "^18",
      "autoprefixer": "^10",
      "postcss": "^8",
      "tailwindcss": "^3.4.1",
      "typescript": "^5"
    }
  };

  fs.writeFileSync(
    path.join(siteDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  console.log(`✅ Created ${site.name} site`);
});

console.log('\n🎉 All sites created successfully!');
