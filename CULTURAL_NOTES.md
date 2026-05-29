# Cultural Notes · دعوتي

> The platform is Saudi-first, with strong Sudanese and Khaleeji adjacency. Honor the conventions below or the card will feel "off" to native readers — even if the typography is flawless.

---

## 1. Audience tone (brand voice)

### Primary: Saudi Najdi conversational, sprinkled with classical Arabic for occasion-specific lines.

**Marketing & UI chrome → Najdi colloquial**
- "صمّم دعوتك في دقائق وأرسلها واتس فوري"
- "دعوتك تستاهل الأفضل — خلّها تليق بمناسبتك"
- "ما يحتاج تطبع ولا تنتظر — كل ضيوفك يستلمونها بضغطة"
- "اختر القالب، اكتب الأسماء، وادفع — كذا فقط"
- "تبي تشوف اللي بيحضر؟ افتح لوحتك أيّ وقت"

**Card content (inside the invitation itself) → Classical Arabic with tashkeel**
- "يَتَشَرَّفُ آلُ [X] وآلُ [Y] بِدَعوَتِكم..."
- "بارَكَ اللهُ لَهُما وبارَكَ عَلَيهِما وجَمَعَ بَينَهُما في خَير"
- "تَقَبَّلَ اللهُ مِنّا ومِنكُم صالِحَ الأعمال"

**Confirmation messages (when guest RSVPs) → Najdi with formal closing**
- "شَرَّفتَنا يا [name] — ننتظركم بحفاوة"
- "جزاك الله خير — رسالتك توصل العروسين بإذن الله"
- "كل عام وأنت بخير — حضورك يكمّل فرحتنا"

### Words to use freely
- "تستاهل" (you deserve)
- "تبي / ودّك" (you want)
- "خلّ / خلّها" (let it / let it be)
- "كذا" (like this — informal "thus")
- "ما يحتاج" (no need to)
- "تليق" (befits)
- "نفس الفكرة" (same idea)
- "ضغطة" (one click/tap)
- "أكيد" (sure)
- "تشتغل" (it works)
- "وقت ما تبي" (whenever you want)

### Words to avoid
- "وش" (what) — too colloquial for marketing copy
- "كيف الحال" — too oral for written UI
- Egyptian markers: "إزاي / دلوقتي / كده" — wrong dialect, alienates Saudis
- Levantine markers: "هلق / كتير / منيح" — same problem
- Over-formal classical for chrome: "إنّ هذا التطبيق يتيح لك..." — feels like a 1990s government form
- Pure transliteration of English UX terms: "كليك", "سيرفر" — translate or use the English word as-is in Latin

### When in doubt
Najdi has a built-in formality lever: same word, slightly different vowel = more or less formal. "تبي" = casual, "تريد" = formal, "تَرغَب في" = very formal. For UI buttons use casual; for occasion blessings use classical.

---

## 2. Invitation conventions (the card itself)

### Naming
- **Groom:** full name including kunya. "أبو عُبَيدة عبد المجيد محمد النويري".
- **Bride (Sudanese / conservative Saudi convention):** identified by father's full name. **First name does NOT appear in the prose invitation line.** "كَريمة آل تولا بنت أحمد حسن تولا". Her first name can appear in:
  - The names centerpiece (large display, paired with groom)
  - The OG image (smaller, paired with groom)
  - Never alone in the invitation prose
- **Bride (more liberal Saudi convention):** her first name + family is OK throughout. **Make this a configurable toggle** in the form: "إظهار اسم العروس الأول في نص الدعوة" — default OFF (safer).
- **Families:** "آل [X]" not "عائلة [X]" for traditional tone. For more modern/Saudi: "أسرة [X]" works too. Let the user pick.

### Verses (Quranic)
Always source from a curated library. **Never let users type Quranic text** (typo risk + cultural sensitivity). Default verse mappings:

| Occasion | Verse | Reference |
|---|---|---|
| Wedding | "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ" | الروم: 21 |
| Engagement (خطوبة) | Same as wedding, or "وَأَنكِحُوا الْأَيَامَىٰ مِنكُمْ وَالصَّالِحِينَ مِنْ عِبَادِكُمْ" | النور: 32 |
| Eid Adha | "وَأَذِّن فِي النَّاسِ بِالْحَجِّ" | الحج: 27 |
| Eid Fitr | "وَلِتُكْمِلُوا الْعِدَّةَ وَلِتُكَبِّرُوا اللَّهَ عَلَىٰ مَا هَدَاكُمْ" | البقرة: 185 |
| Aqiqa / new baby | Hadith: "كل غلام مرتهن بعقيقته" (with attribution) | متفق عليه — أحمد |
| Graduation (تخرّج) | "وَقُل رَّبِّ زِدْنِي عِلْمًا" | طه: 114 |
| General gathering | "وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ" | المائدة: 2 |

Use **Tanzil Uthmani text with full diacritics**. Cite the source in the data structure (`verse.source: { surah: 'الروم', ayah: 21 }`) but only display it as a small caption *if the customer wants it*.

### Dua (the host's own words, ends with prayers)
Common closing patterns:
- **Wedding:** "بارَكَ اللهُ لَهُما وبارَكَ عَلَيهِما وجَمَعَ بَينَهُما في خَير"
- **Engagement:** "اللهم بارك واحفظ واهدِ"
- **Eid:** "تَقَبَّلَ اللهُ مِنّا ومِنكُم صالِحَ الأعمال"
- **Aqiqa:** "بارَكَ اللهُ لَكُم في المَولُود"

### Sender voice & gendered verbs
- Single host (groom): "يَتَشَرَّفُ" (masculine sg.) → "سائلًا اللهَ"
- Single hostess (bride / mother): "تَتَشَرَّفُ" (feminine sg.) → "سائلةً اللهَ"
- Both families: "يَتَشَرَّفُ آلُ X وآلُ Y" treated as masc. plural agreement → "سائلينَ اللهَ"
- Both individuals (couple inviting jointly): "يَتَشَرَّفان" (dual) → "سائلَين"

**Implementation:** `data.sender_voice: 'groom' | 'bride' | 'families' | 'couple'` → drives verb conjugation throughout the templated card. Don't ship a card with a gender-grammar mismatch — it reads as a typo to natives.

### Hijri date
- Always show alongside Gregorian. Format: "السبت ١٣ ذو الحجة ١٤٤٧ هـ — الموافق ٣٠ مايو ٢٠٢٦ م"
- Use Arabic-Indic numerals (`٠١٢٣٤٥٦٧٨٩`) in Arabic context, even for years. CSS: `font-feature-settings: "ss01"` doesn't change this — it's a character substitution. JS: `n.toLocaleString('ar-EG')` or hand-map.
- Use `@umalqura/core` (Umm al-Qura calendar — the official Saudi one). Not the simple "Hijri" calendar which can be off by a day.

### Location / venue
- Saudi cities: prefer "الرياض"، "جدة"، "مكة المكرّمة"، "المدينة المنورة" (use full honorific for Mecca & Medina).
- Neighborhood pattern: "حَيُّ [name]" (e.g. "حَيُّ الأندَلُس").
- For wedding halls: "قاعَةُ [name]" or "صالات [name]" or "قَصرُ الأفراحِ [name]".
- Google Maps link: collect optionally, render as a button "📍 موقع القاعة" (Najdi: "اضغط للموقع").

---

## 3. Religious / etiquette guardrails

- **Bismillah** opens every card. Format: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ" with full tashkeel and the alif khanjariyya on الرَّحْمَٰنِ.
- **No emojis in Quranic quotes** (ever). Decorative `✦` and `❀` are fine elsewhere.
- **Avoid imagery of:** alcohol, music instruments, full faces (in case of Saudi conservative customer base). Stick to abstract / calligraphic / geometric.
- **Avoid mixed-gender visual implications** in the card art. The Nuwairi card's two date palms framing a star is read as the two families uniting — neutral and safe.
- **Mecca/Medina mentions** always with honorific: "مكة المكرّمة"، "المدينة المنورة".
- **The Prophet's name** ﷺ (`صلى الله عليه وسلم`) when mentioned — use the Unicode character `ﷺ` (U+FDFA) for visual elegance.

---

## 4. RTL / typography edge cases that bite

- **Bidi mirroring:** numbers + Latin letters in an RTL container reorder visually. "30 · MAY · 2026" can render as "MAY · 2026 · 30". Wrap Latin runs in `<span dir="ltr">` to preserve order.
- **Arabic comma:** use `،` (U+060C) not `,`. Same for question mark: `؟` (U+061F) and semicolon `؛`.
- **Arabic quotes:** the curly `« »` are stylish; `“ ”` works but reads as English to some.
- **Hyphens between names:** use the long dash `—` not the hyphen `-` for elegance.
- **Word spacing:** Arabic doesn't need narrower word-spacing — leave it alone. Don't `letter-spacing` Arabic text either (it breaks the cursive connection).
- **Font-feature-settings:** for Aref Ruqaa, no special features needed. For Amiri, `"liga"`/`"calt"` are on by default and required for proper ligatures.

---

## 5. Saudi-specific niceties (small touches that signal "made for me")

- **Date format defaults to Hijri-first** (Saudis read Hijri primarily for religious/official dates).
- **Phone number input:** default to `+966` with the flag, accept both formats `05x xxx xxxx` and `5x xxx xxxx`.
- **CCY shown is SAR** by default — write as "ر.س" not "SAR" or "$" in customer-facing copy: "٤٩ ر.س".
- **Vat calculation:** 15% VAT is standard. Show prices both ways: "٤٩ ر.س (شامل الضريبة)".
- **Working week:** Sun-Thu. Wedding nights are usually Thursday → Friday in KSA. Default date picker starts on Sunday.
- **Holidays awareness:** prompt different verses near Eid season, suggest aqiqa-template if recently after a known birth registry (later, AI feature).
- **Mada is the dominant card:** put Mada logo first in checkout, then Apple Pay, then STC Pay, then Visa/MC.

---

## 6. Sample copy bank (steal from this for the landing & UI)

### Hero headlines
- "دَعوَتُك تستاهل تلمَع 🌙"
- "صَمِّم دعوة عرسك في دقائق — وأرسلها للضيوف من جوّالك"
- "بطاقات دعوة فاخرة، تفاعلية، وبأقل من ثمن الطباعة"

### Subheadlines
- "اختر القالب، اكتب الأسماء والتاريخ، وادفع — والباقي علينا"
- "كل ضيف يفتح الرابط على جواله ويسجّل حضوره، وأنت تتابع من لوحة خاصة"

### CTA buttons
- "ابدأ دعوتك" (start your invitation) — primary
- "شف عيّنة" (see a sample) — secondary
- "كيف يشتغل؟" (how does it work)

### Pricing labels (Najdi-friendly)
- "أساسية" / "مميّزة" / "ملكية"  — instead of "Basic / Premium / VIP"
- "اختار الباقة اللي تناسبك"

### Form labels
- "اسم العريس" / "اسم العروس" / "عائلة العريس" / "عائلة العروس"
- "متى الزفاف؟"
- "وين القاعة؟"
- "تبي تستقبل ردود الحضور؟" (toggle)
- "كلمة سر لوحتك" (admin password)

### RSVP success
- "شرّفتنا 🌹 — قاعدين ننتظرك"

### RSVP apology
- "جزاك الله خير — دعوتك توصل لهم"

### Empty states
- "ولا رد بعد — شارك الرابط على واتس وستبدأ الردود تجي"
- "هذي الصفحة فاضية الحين، لكن لما تنشر دعوتك بتشوف هنا كل اللي يحضر"

### Error states
- "صار خطأ — جرّب مرة ثانية"
- "ما قدرنا نوصل للسيرفر — تأكد من الاتصال"

### Confirmation emails
- Subject: "دعوتك جاهزة 🌹"
- Body: "السلام عليكم [name]، تم نشر دعوتك. شاركها مع ضيوفك على واتس من هنا: [link]. ولوحة الردود عندك في: [admin link]. أيّ سؤال؟ ردّ على هذا الإيميل."

---

## 7. Things customers will ask for — and how to answer

| Ask | Answer |
|---|---|
| "أقدر أُغيّر التصميم؟" | في المرحلة الأولى: تختار من القوالب المتوفّرة. تخصيص الألوان والنصوص متاح. تصميم مخصّص بالكامل بإذن الله في المرحلة الجاية. |
| "تطبعون لي البطاقة؟" | لا نطبع — البطاقة رقمية تفاعلية. لكن نوفّر تصدير PDF لو تبي تطبعها بنفسك. |
| "دعوة كم شخص أرسل؟" | بدون حد — لكل ضيف رابط واحد، وأنت تشارك الرابط لأي عدد. |
| "هل البطاقة تنتهي؟" | الأساسية تنتهي بعد ٣٠ يوم من النشر، الملكية بعد سنة كاملة. تقدر تجدّد. |
| "إذا غيّرت رأيي بعد ما دفعت؟" | تقدر تعدّل الدعوة لمدة ٢٤ ساعة بعد النشر مجانًا. الاسترداد متاح قبل ما يفتحها أيّ ضيف. |
| "أبغى أضيف صورة لنا" | (Phase 2) — تقدر ترفع صورة كخلفية إضافية. حاليًا التصميم بدون صور للحفاظ على الفخامة. |
| "تشتغل بدون نت؟" | المعاينة لا — لكن بعد النشر، البطاقة سريعة جدًا وتفتح حتى على شبكة ضعيفة. |
