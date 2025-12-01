# 🔍 سفید یاب | Sefid Yab

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Website](https://img.shields.io/badge/Website-tawana.online-orange)](https://tawana.online)
[![ORCID](https://img.shields.io/badge/ORCID-0009--0005--6825--6728-green)](https://orcid.org/0009-0005-6825-6728)
[![Google Scholar](https://img.shields.io/badge/Scholar-VP8O0a4AAAAJ-red)](https://scholar.google.com/citations?user=VP8O0a4AAAAJ)
[![GitHub](https://img.shields.io/github/stars/tawanamohammadi/sefidyab?style=social)](https://github.com/tawanamohammadi/sefidyab)

**ابزار هوشمند شناسایی سیمکارت سفید در X | Smart White SIM Detector for X (Twitter)**

---

## 📢 اخبار | News

**🎉 1 دسامبر 2025 - آغاز رسمی پروژه**

پروژه سفید یاب به صورت رسمی توسط **توانا محمدی** و تیم **توانا پروکسی** آغاز شد. این ابزار اوپن‌سورس برای شناسایی و تحلیل اتصالات مشکوک در شبکه اجتماعی X طراحی شده است.

**🎉 December 1, 2025 - Official Project Launch**

Sefid Yab project officially launched by **Tawana Mohammadi** and **Tawana Proxy** team. This open-source tool is designed to identify and analyze suspicious connections on X social network.

---

## 🎯 درباره پروژه | About

**سفید یاب** یک ابزار پیشرفته OSINT (اطلاعات منبع باز) برای شناسایی و تحلیل اتصالات مشکوک در شبکه اجتماعی X (توییتر سابق) است. این ابزار به کاربران کمک می‌کند تا کاربرانی که از سیمکارت‌های سفید (اتصالات بدون VPN/پروکسی از مناطق محدود شده) استفاده می‌کنند را شناسایی کنند.

**Sefid Yab** is an advanced OSINT (Open Source Intelligence) tool for identifying and analyzing suspicious connections on X (formerly Twitter) social network. This tool helps users identify accounts using white SIMs (direct connections without VPN/proxy from restricted regions).

---

## ✨ ویژگی‌های کلیدی | Key Features

### 🔍 1. Timeline Scanner
- اسکن اتوماتیک تایملاین و استخراج خودکار یوزرنیم‌ها
- Automatic timeline scanning and username extraction

### 🕵️ 2. Profile Forensics
- تحلیل عمیق پروفایل کاربران (موقعیت جغرافیایی، دستگاه، تاریخ ساخت حساب)
- Deep profile analysis (location, device, account creation date)

### ⚠️ 3. Anomaly Detector
- تشخیص هوشمند ناهنجاری‌ها:
  - 🛡️ **سپر فعال** (VPN/پروکسی فعال)
  - ✅ **اتصال مستقیم امن**
  - ⚠️ **ناهنجاری** (سیمکارت سفید - اتصال مستقیم از ایران بدون VPN)
  - 🔴 **هویت پنهان** (اطلاعات ناشناس)

### 🎯 4. Auto Tracker
- ردیابی اتوماتیک کاربران جدید
- Automatic tracking of new users

### 💾 5. Database Sync
- ذخیره‌سازی محلی با localStorage
- همگام‌سازی خودکار با GitHub
- Local storage with localStorage
- Automatic GitHub synchronization

### 📊 6. Advanced Features
- صادرات داده به فرمت CSV/JSON
- پردازش دسته‌ای (Batch Processing)
- بلاک انبوه (Mass Block)
- داشبورد تحلیلی پیشرفته
- Data export to CSV/JSON formats
- Batch processing
- Mass blocking
- Advanced analytics dashboard

---

## 🗺️ نقشه راه | Roadmap

### 📅 فاز 1: پایه‌گذاری (دسامبر 2025)
- [x] طراحی معماری پروژه
- [x] ساخت اسکریپت Tampermonkey اصلی
- [x] پیاده‌سازی Timeline Scanner
- [x] پیاده‌سازی Profile Forensics
- [ ] تست‌های اولیه

### 📅 فاز 2: ویژگی‌های پیشرفته (ژانویه 2026)
- [ ] پیاده‌سازی Anomaly Detector کامل
- [ ] سیستم Auto Tracker
- [ ] داشبورد تحلیلی
- [ ] همگام‌سازی GitHub

### 📅 فاز 3: بهینه‌سازی (فوریه 2026)
- [ ] بهبود عملکرد
- [ ] افزودن زبان‌های بیشتر
- [ ] مستندات جامع
- [ ] راهنمای ویدیویی

### 📅 فاز 4: گسترش (مارس 2026)
- [ ] API عمومی
- [ ] پلاگین مرورگر مستقل
- [ ] اپلیکیشن موبایل
- [ ] یکپارچه‌سازی با ابزارهای OSINT دیگر

---

## 🚀 نصب و راه‌اندازی | Installation

### 💻 Desktop (Chrome, Firefox, Edge, Opera)

1. **نصب Tampermonkey**
   - Chrome: [Tampermonkey در Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
   - Firefox: [Tampermonkey در Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
   - Edge: [Tampermonkey در Microsoft Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)
   - Opera: [Tampermonkey در Opera Add-ons](https://addons.opera.com/en/extensions/details/tampermonkey-beta/)

2. **نصب اسکریپت سفید یاب**
   - به [صفحه اصلی پروژه](https://github.com/tawanamohammadi/sefidyab) بروید
   - روی فایل `sefidyab.user.js` کلیک کنید
   - دکمه "Raw" را بزنید
   - Tampermonkey به طور خودکار نصب را پیشنهاد می‌دهد
   - روی "Install" کلیک کنید

3. **استفاده**
   - به [X.com](https://x.com) یا [Twitter.com](https://twitter.com) بروید
   - اسکریپت به طور خودکار فعال می‌شود
   - داشبورد سفید یاب را در گوشه صفحه خواهید دید

### 📱 Android (Kiwi Browser, Firefox)

**روش 1: Kiwi Browser (توصیه می‌شود)**
1. [Kiwi Browser](https://play.google.com/store/apps/details?id=com.kiwibrowser.browser) را نصب کنید
2. Tampermonkey را از Chrome Web Store نصب کنید
3. مراحل بالا را دنبال کنید

**روش 2: Firefox Mobile**
1. Firefox Mobile را نصب کنید
2. Tampermonkey را از Firefox Add-ons نصب کنید
3. مراحل بالا را دنبال کنید

### 🍎 iOS (Safari)

**توجه:** iOS محدودیت‌هایی برای اسکریپت‌های کاربری دارد. گزینه‌های موجود:

1. **Userscripts (Safari)**
   - اپلیکیشن [Userscripts](https://apps.apple.com/us/app/userscripts/id1463298887) را نصب کنید
   - فایل `sefidyab.user.js` را باز کنید
   - آن را به Userscripts اضافه کنید

2. **استفاده از Desktop**
   - برای بهترین تجربه، از نسخه دسکتاپ استفاده کنید

---

## 📖 مستندات | Documentation

- [راهنمای نصب کامل](docs/INSTALL.md)
- [نقشه راه توسعه](docs/ROADMAP.md)
- [راهنمای مشارکت](docs/CONTRIBUTING.md)

---

## ❓ سوالات متداول | FAQ

### چرا سفید یاب؟
سفید یاب به کاربران کمک می‌کند تا امنیت دیجیتال خود را افزایش دهند و اتصالات مشکوک را شناسایی کنند.

### آیا استفاده از سفید یاب قانونی است؟
بله، سفید یاب فقط از اطلاعات عمومی و API رسمی X استفاده می‌کند.

### آیا سفید یاب رایگان است؟
بله، سفید یاب یک پروژه اوپن‌سورس و کاملاً رایگان است.

### آیا اطلاعات من ذخیره می‌شود؟
تمام اطلاعات به صورت محلی در مرورگر شما ذخیره می‌شوند. هیچ اطلاعاتی به سرور خارجی ارسال نمی‌شود.

### چگونه می‌توانم مشارکت کنم؟
لطفاً [راهنمای مشارکت](docs/CONTRIBUTING.md) را مطالعه کنید.

---

## 👤 توسعه‌دهنده | Developer

**توانا محمدی | Tawana Mohammadi**

- 🌐 وبسایت: [tawana.online](https://tawana.online)
- 📧 ایمیل: [info@tawana.online](mailto:info@tawana.online)
- 📱 تلفن: +98 990 112 0235
- 🐙 GitHub: [@tawanamohammadi](https://github.com/tawanamohammadi) | [@TAwR00T](https://github.com/TAwR00T)
- 🎓 ORCID: [0009-0005-6825-6728](https://orcid.org/0009-0005-6825-6728)
- 📚 Google Scholar: [VP8O0a4AAAAJ](https://scholar.google.com/citations?user=VP8O0a4AAAAJ)
- ✍️ Medium: [tawanamohammadi.medium.com](https://tawanamohammadi.medium.com/)
- 📝 Substack: [tawanamohammadi.substack.com](https://tawanamohammadi.substack.com/)

---

## 🤝 مشارکت | Contributing

ما از مشارکت شما استقبال می‌کنیم! لطفاً:

1. این مخزن را Fork کنید
2. یک Branch جدید بسازید (`git checkout -b feature/amazing-feature`)
3. تغییرات خود را Commit کنید (`git commit -m 'Add amazing feature'`)
4. به Branch خود Push کنید (`git push origin feature/amazing-feature`)
5. یک Pull Request باز کنید

برای اطلاعات بیشتر، [راهنمای مشارکت](docs/CONTRIBUTING.md) را مطالعه کنید.

---

## 📜 لایسنس | License

این پروژه تحت لایسنس GNU General Public License v3.0 منتشر شده است. برای جزئیات بیشتر، فایل [LICENSE](LICENSE) را ببینید.

```
سفید یاب - ابزار هوشمند شناسایی سیمکارت سفید در X
Copyright (C) 2025 Tawana Mohammadi

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
```

---

## ⭐ حمایت | Support

اگر این پروژه برای شما مفید بود:

- ⭐ به این مخزن ستاره بدهید
- 🐦 آن را در شبکه‌های اجتماعی به اشتراک بگذارید
- 🐛 باگ‌ها را گزارش دهید
- 💡 ویژگی‌های جدید پیشنهاد دهید

---

## 🔑 کلمات کلیدی | Keywords

سفید یاب، سیم کارت سفید، OSINT، توییتر، ایکس، VPN، ایران، توانا محمدی، شناسایی ناهنجاری، امنیت دیجیتال، تحلیل شبکه اجتماعی، Sefid Yab, White SIM, OSINT, Twitter, X, Iran, VPN detection, Tawana Mohammadi, anomaly detector, digital security, social network analysis

---

<div align="center">

**ساخته شده با ❤️ توسط [توانا محمدی](https://tawana.online) و تیم توانا پروکسی**

**Made with ❤️ by [Tawana Mohammadi](https://tawana.online) and Tawana Proxy Team**

</div>
