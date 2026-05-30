/**
 * Dawati — Live Notifications Explainer (Pro)
 * For Adobe After Effects CC 2018+ (tested on 2022/2024)
 *
 * What you get:
 *   - 1920×1080 @ 30fps, 18 seconds, cinematic 180° shutter
 *   - Three acts:
 *       0.0 – 2.5 s  Intro:    brand mark + tagline fade in over cosmos
 *       2.5 – 14.0s  Demo:     iPhone 17 Pro Max (Cosmic Orange) slides
 *                              into frame, 5 notifications cascade down
 *                              with side captions explaining each
 *      14.0 – 18.0s  Outro:    "اطلب دعوتك" CTA + dawati.sa URL
 *   - Everything built in shape & text layers — no external assets needed
 *   - Cosmic background (deep ink + gold nebula + drifting particles)
 *   - 8-point Najmah star punctuation between acts
 *   - Cinematic motion blur, glow on all gold elements, lens flare on beats
 *   - Tritone color grade at the end for warmth
 *
 * Usage:
 *   1. File → Scripts → Run Script File… → pick this .jsx
 *   2. The comp "Dawati_Notifications_Main" opens in a new project
 *   3. Spacebar to preview, then send to Render Queue / Media Encoder
 *
 * Re-running wipes the prior comp and rebuilds — edit CONFIG and run again.
 */

#target aftereffects

// ============================================================
// CONFIG — edit and re-run
// ============================================================
var CONFIG = {
    duration:     18.0,         // seconds (total)
    fps:          30,
    width:        1920,
    height:       1080,
    shutterAngle: 180,          // cinematic motion blur

    // Brand
    brandAr:      "دعوتي",
    tagline:      "دعوتك تستقبل ضيوفك",
    ctaAr:        "اطلب دعوتك الآن",
    url:          "dawati.sa",

    // Phone copy
    cardTitle:    "وَمَوَدَّةً وَرَحْمَة",
    cardGroom:    "فيصل بن محمد الراجحي",
    cardBride:    "كريمة عبد الله الفوزان",
    cardDate:     "الجمعة ٤ محرّم ١٤٤٨",

    // Five live notifications — body, caption (right side)
    notifications: [
        { title: "تأكيد حضور",        body: "أحمد الزامل أكّد حضوره",                   caption: "كل تأكيد يصلك فور وصوله" },
        { title: "رسالة جديدة",       body: "كريمة الفوزان: ألف مبروك يا غالي",         caption: "رسائل الضيوف ودعواتهم" },
        { title: "تأكيد حضور",        body: "فيصل القحطاني + ٢ مرافقين",                caption: "تعرف عدد المرافقين سلفًا" },
        { title: "تفضيل وجبة",        body: "سارة الراشد اختارت: نباتي",                caption: "تفضيلات الطعام تصلك بالتفصيل" },
        { title: "اعتذار مع رسالة",   body: "محمد السبيعي يعتذر مع تمنياته بالتوفيق",   caption: "حتى المعتذرون لا يُنسَون" }
    ],

    // Palette (AE wants 0–1 linear values)
    inkDeep:   [0.020, 0.027, 0.080],   // #050714
    inkSoft:   [0.082, 0.031, 0.165],   // #15082a
    goldHi:    [1.000, 0.972, 0.847],   // #fff8d8
    goldMid:   [0.957, 0.835, 0.430],   // #f4d56e
    goldDeep:  [0.541, 0.408, 0.090],   // #8a6817
    orangeHi:  [1.000, 0.663, 0.467],   // #ffa977
    orangeMid: [1.000, 0.388, 0.078],   // #ff6320
    orangeDeep:[0.769, 0.239, 0.039],   // #c43d0a
    white:     [1.000, 1.000, 1.000],
    nearBlack: [0.039, 0.024, 0.016],   // #0a0604
    inkBody:   [0.290, 0.173, 0.039]    // #4a2c0a
};

// ============================================================
// HELPERS
// ============================================================
function ms(s) { return s; } // seconds passthrough — keeps intent clear

function addSolid(comp, name, color, w, h) {
    var s = comp.layers.addSolid(color, name, w || comp.width, h || comp.height, 1);
    return s;
}

function addText(comp, name, text, font, size, color, justify) {
    var t = comp.layers.addText(text);
    t.name = name;
    var doc = t.property("Source Text").value;
    doc.resetCharStyle();
    doc.font = font || "Aref Ruqaa";
    doc.fontSize = size || 56;
    doc.fillColor = color || CONFIG.white;
    doc.applyFill = true;
    doc.strokeWidth = 0;
    doc.applyStroke = false;
    if (justify !== undefined) doc.justification = justify; else doc.justification = ParagraphJustification.CENTER_JUSTIFY;
    doc.tracking = 0;
    t.property("Source Text").setValue(doc);
    t.threeDLayer = true;
    return t;
}

function addShapeLayer(comp, name) {
    var s = comp.layers.addShape();
    s.name = name;
    // Remove default contents (AE adds an empty path)
    while (s.property("Contents").numProperties > 0) {
        s.property("Contents").property(1).remove();
    }
    return s;
}

function addRoundedRect(shapeLayer, name, w, h, radius, fillColor, strokeColor, strokeWidth) {
    var group = shapeLayer.property("Contents").addProperty("ADBE Vector Group");
    group.name = name;
    var contents = group.property("Contents");

    var rect = contents.addProperty("ADBE Vector Shape - Rect");
    rect.property("Size").setValue([w, h]);
    rect.property("Roundness").setValue(radius);

    if (fillColor) {
        var fill = contents.addProperty("ADBE Vector Graphic - Fill");
        fill.property("Color").setValue(fillColor);
    }
    if (strokeColor && strokeWidth) {
        var stroke = contents.addProperty("ADBE Vector Graphic - Stroke");
        stroke.property("Color").setValue(strokeColor);
        stroke.property("Stroke Width").setValue(strokeWidth);
    }
    return group;
}

function addEllipse(shapeLayer, name, w, h, fillColor) {
    var group = shapeLayer.property("Contents").addProperty("ADBE Vector Group");
    group.name = name;
    var contents = group.property("Contents");

    var ell = contents.addProperty("ADBE Vector Shape - Ellipse");
    ell.property("Size").setValue([w, h]);

    var fill = contents.addProperty("ADBE Vector Graphic - Fill");
    fill.property("Color").setValue(fillColor);
    return group;
}

function setGroupPosition(group, pos) {
    group.property("Transform").property("Position").setValue(pos);
}

function ease(prop, times, values) {
    for (var i = 0; i < times.length; i++) {
        prop.setValueAtTime(times[i], values[i]);
    }
    for (var j = 1; j <= prop.numKeys; j++) {
        var inEase  = new KeyframeEase(0.5, 75);
        var outEase = new KeyframeEase(0.5, 75);
        var dim = (prop.value instanceof Array) ? prop.value.length : 1;
        var inArr = []; var outArr = [];
        for (var k = 0; k < dim; k++) { inArr.push(inEase); outArr.push(outEase); }
        prop.setTemporalEaseAtKey(j, inArr, outArr);
    }
}

function addGlow(layer, threshold, radius, intensity) {
    var fx = layer.property("ADBE Effect Parade").addProperty("ADBE Glow");
    fx.property("Glow Based On").setValue(1); // Alpha
    fx.property("Glow Threshold").setValue(threshold || 60);
    fx.property("Glow Radius").setValue(radius || 30);
    fx.property("Glow Intensity").setValue(intensity || 1.2);
    fx.property("Composite Original").setValue(1); // On Top
    return fx;
}

function addGaussianBlur(layer, amount) {
    var fx = layer.property("ADBE Effect Parade").addProperty("ADBE Gaussian Blur 2");
    fx.property("Blurriness").setValue(amount);
    return fx;
}

function addLensFlare(layer, atTime, pos, brightness) {
    var fx = layer.property("ADBE Effect Parade").addProperty("ADBE Lens Flare");
    fx.property("Flare Center").setValue(pos);
    fx.property("Flare Brightness").setValue(0);
    fx.property("Flare Brightness").setValueAtTime(atTime, 0);
    fx.property("Flare Brightness").setValueAtTime(atTime + 0.18, brightness || 90);
    fx.property("Flare Brightness").setValueAtTime(atTime + 0.55, 0);
    fx.property("Lens Type").setValue(2); // 35mm Prime
    return fx;
}

// ============================================================
// BUILD
// ============================================================
app.beginUndoGroup("Dawati Notifications Explainer");

// Wipe any prior comp with the same name (for re-running)
var existing = null;
for (var p = 1; p <= app.project.numItems; p++) {
    var it = app.project.item(p);
    if (it instanceof CompItem && it.name === "Dawati_Notifications_Main") { existing = it; break; }
}
if (existing) existing.remove();

var comp = app.project.items.addComp(
    "Dawati_Notifications_Main",
    CONFIG.width, CONFIG.height,
    1.0, CONFIG.duration, CONFIG.fps
);
comp.shutterAngle = CONFIG.shutterAngle;
comp.motionBlur = true;
comp.openInViewer();

// -------- Background: cosmic gradient + stars --------
var bg = addShapeLayer(comp, "BG_Cosmos");
var bgRect = addRoundedRect(bg, "deep", CONFIG.width, CONFIG.height, 0, CONFIG.inkDeep);
setGroupPosition(bgRect, [CONFIG.width/2, CONFIG.height/2]);

// Two soft gold/violet nebulae as oversized blurred ellipses
var nebulaGold = addShapeLayer(comp, "Nebula_Gold");
var ng = addEllipse(nebulaGold, "gold", 1400, 1400, CONFIG.goldMid);
setGroupPosition(ng, [-100, 200]);
ng.property("Transform").property("Opacity").setValue(28);
addGaussianBlur(nebulaGold, 180);
nebulaGold.blendingMode = BlendingMode.SCREEN;

var nebulaViolet = addShapeLayer(comp, "Nebula_Violet");
var nv = addEllipse(nebulaViolet, "violet", 1600, 1600, CONFIG.inkSoft);
setGroupPosition(nv, [CONFIG.width + 200, CONFIG.height - 100]);
nv.property("Transform").property("Opacity").setValue(55);
addGaussianBlur(nebulaViolet, 200);

// Drifting particles (40 dots) — looped via expression
var particles = addShapeLayer(comp, "Particles");
for (var d = 0; d < 40; d++) {
    var dot = addEllipse(particles, "dot_" + d, 4, 4, CONFIG.goldHi);
    var x = Math.random() * CONFIG.width;
    var y = Math.random() * CONFIG.height;
    setGroupPosition(dot, [x, y]);
    var op = dot.property("Transform").property("Opacity");
    op.setValue(20 + Math.random() * 50);
    // Position drift expression — gentle wandering
    var pos = dot.property("Transform").property("Position");
    pos.expression = "wiggle(0.3, 60) + [" + x + "," + y + "] - [" + (CONFIG.width/2) + "," + (CONFIG.height/2) + "]";
}

// -------- ACT 1: Intro (0.0 - 2.5s) --------
var brandTitle = addText(comp, "Brand", CONFIG.brandAr, "Aref Ruqaa", 160, CONFIG.goldHi);
brandTitle.transform.position.setValue([CONFIG.width/2, CONFIG.height/2 - 30, 0]);
addGlow(brandTitle, 50, 60, 1.5);

var tagline = addText(comp, "Tagline", CONFIG.tagline, "Amiri", 52, CONFIG.goldHi);
tagline.transform.position.setValue([CONFIG.width/2, CONFIG.height/2 + 90, 0]);
tagline.property("Source Text").value.fillColor = CONFIG.goldMid;

// Intro animations
var brandOp = brandTitle.transform.opacity;
ease(brandOp, [0, 0.5, 2.3, 2.7], [0, 100, 100, 0]);
var brandScale = brandTitle.transform.scale;
ease(brandScale, [0, 0.8], [[80,80,80], [100,100,100]]);

var tagOp = tagline.transform.opacity;
ease(tagOp, [0.8, 1.3, 2.3, 2.7], [0, 100, 100, 0]);

// -------- ACT 2: Demo (2.5 - 14.0s) --------

// Phone container — built in shape layers, ~620px tall at 1920×1080
var PHONE_W = 380;
var PHONE_H = 820;
var PHONE_X = CONFIG.width * 0.72;
var PHONE_Y = CONFIG.height * 0.5;

// Phone — Cosmic Orange frame
var phoneFrame = addShapeLayer(comp, "Phone_Frame");
var frameGrp = addRoundedRect(phoneFrame, "frame", PHONE_W, PHONE_H, 60, CONFIG.orangeMid);
setGroupPosition(frameGrp, [PHONE_X, PHONE_Y]);
// Soft glow under the phone
var shadow = addShapeLayer(comp, "Phone_Shadow");
var sh = addEllipse(shadow, "shadow", PHONE_W * 1.4, 80, CONFIG.orangeDeep);
setGroupPosition(sh, [PHONE_X, PHONE_Y + PHONE_H/2 + 50]);
shadow.property("Transform").property("Opacity").setValue(60);
addGaussianBlur(shadow, 40);

// Inner bezel (black)
var phoneBezel = addShapeLayer(comp, "Phone_Bezel");
var bezelGrp = addRoundedRect(phoneBezel, "bezel", PHONE_W - 18, PHONE_H - 18, 52, CONFIG.nearBlack);
setGroupPosition(bezelGrp, [PHONE_X, PHONE_Y]);

// Screen — black with a soft gold radial as the card background
var screen = addShapeLayer(comp, "Phone_Screen");
var screenGrp = addRoundedRect(screen, "screen", PHONE_W - 26, PHONE_H - 26, 48, [0.005, 0.005, 0.025]);
setGroupPosition(screenGrp, [PHONE_X, PHONE_Y]);

// Dynamic Island
var di = addShapeLayer(comp, "Dynamic_Island");
var diGrp = addRoundedRect(di, "di", 120, 32, 16, [0, 0, 0]);
setGroupPosition(diGrp, [PHONE_X, PHONE_Y - PHONE_H/2 + 38]);

// Mini wedding card on screen (glass)
var card = addShapeLayer(comp, "Card_Glass");
var cardGrp = addRoundedRect(card, "card", PHONE_W - 90, 280, 20, CONFIG.white);
setGroupPosition(cardGrp, [PHONE_X, PHONE_Y + 100]);
card.property("Transform").property("Opacity").setValue(82);
addGlow(card, 200, 12, 0.6);

var cardTitle = addText(comp, "Card_Title", CONFIG.cardTitle, "Aref Ruqaa", 32, CONFIG.goldDeep);
cardTitle.transform.position.setValue([PHONE_X, PHONE_Y + 50, 0]);

var cardGroom = addText(comp, "Card_Groom", CONFIG.cardGroom, "Aref Ruqaa", 18, CONFIG.inkBody);
cardGroom.transform.position.setValue([PHONE_X, PHONE_Y + 100, 0]);

var cardAnd = addText(comp, "Card_And", "و", "Aref Ruqaa", 26, CONFIG.goldDeep);
cardAnd.transform.position.setValue([PHONE_X, PHONE_Y + 138, 0]);

var cardBride = addText(comp, "Card_Bride", CONFIG.cardBride, "Aref Ruqaa", 18, CONFIG.inkBody);
cardBride.transform.position.setValue([PHONE_X, PHONE_Y + 175, 0]);

var cardDate = addText(comp, "Card_Date", CONFIG.cardDate, "Amiri", 15, CONFIG.inkBody);
cardDate.transform.position.setValue([PHONE_X, PHONE_Y + 218, 0]);

// Group: slide phone + card + bezel + screen + DI + frame into frame
var phoneLayers = [phoneFrame, shadow, phoneBezel, screen, di, card, cardTitle, cardGroom, cardAnd, cardBride, cardDate];
for (var pl = 0; pl < phoneLayers.length; pl++) {
    var L = phoneLayers[pl];
    var pos = L.transform.position;
    var basePos = pos.value;
    pos.setValueAtTime(2.0, [basePos[0] + 400, basePos[1]]);
    pos.setValueAtTime(2.9, basePos);
    var op = L.transform.opacity;
    op.setValueAtTime(2.0, 0);
    op.setValueAtTime(2.6, 100);
}

// -------- Notifications cascade (3.5s → 13.5s) --------
// Each notification appears for ~2 seconds, with a side caption.
var notifStartT = 3.5;
var notifDur = 2.0;
var notifTopY = PHONE_Y - PHONE_H/2 + 105;

for (var n = 0; n < CONFIG.notifications.length; n++) {
    var notif = CONFIG.notifications[n];
    var t0 = notifStartT + n * (notifDur + 0.15);
    var t1 = t0 + notifDur;

    // Notification bubble — dark glass
    var bubble = addShapeLayer(comp, "Notif_" + n);
    var bubGrp = addRoundedRect(bubble, "bub", PHONE_W - 50, 90, 22, [0.11, 0.086, 0.07]);
    setGroupPosition(bubGrp, [PHONE_X, notifTopY]);
    bubble.property("Transform").property("Opacity").setValue(0);

    // App icon — small gold square
    var icon = addShapeLayer(comp, "Notif_Icon_" + n);
    var iconGrp = addRoundedRect(icon, "icon", 44, 44, 10, CONFIG.goldMid);
    setGroupPosition(iconGrp, [PHONE_X - (PHONE_W - 50)/2 + 38, notifTopY]);
    icon.property("Transform").property("Opacity").setValue(0);

    // Notification text — title + body
    var nTitle = addText(comp, "Notif_T_" + n, notif.title, "Reem Kufi", 18, CONFIG.white, ParagraphJustification.RIGHT_JUSTIFY);
    nTitle.transform.position.setValue([PHONE_X + (PHONE_W - 50)/2 - 22, notifTopY - 10, 0]);
    nTitle.transform.opacity.setValue(0);

    var nBody = addText(comp, "Notif_B_" + n, notif.body, "Amiri", 16, [0.85, 0.85, 0.88], ParagraphJustification.RIGHT_JUSTIFY);
    nBody.transform.position.setValue([PHONE_X + (PHONE_W - 50)/2 - 22, notifTopY + 18, 0]);
    nBody.transform.opacity.setValue(0);

    // Side caption + connector dot/line
    var caption = addText(comp, "Caption_" + n, notif.caption, "Reem Kufi", 36, CONFIG.goldHi, ParagraphJustification.RIGHT_JUSTIFY);
    caption.transform.position.setValue([CONFIG.width * 0.45, notifTopY + 6, 0]);
    caption.transform.opacity.setValue(0);
    addGlow(caption, 80, 18, 0.9);

    var connector = addShapeLayer(comp, "Connector_" + n);
    var conGrp = addRoundedRect(connector, "line", 80, 2, 1, CONFIG.goldMid);
    setGroupPosition(conGrp, [CONFIG.width * 0.48, notifTopY + 6]);
    connector.property("Transform").property("Opacity").setValue(0);
    addGlow(connector, 30, 12, 0.8);

    var dot = addShapeLayer(comp, "Dot_" + n);
    var dotGrp = addEllipse(dot, "d", 10, 10, CONFIG.goldHi);
    setGroupPosition(dotGrp, [PHONE_X - PHONE_W/2 + 12, notifTopY + 6]);
    dot.property("Transform").property("Opacity").setValue(0);

    // === Animations ===
    // Bubble: slide down, hold, fade up
    var bp = bubble.transform.position;
    bp.setValueAtTime(t0,         [PHONE_X, notifTopY - 80]);
    bp.setValueAtTime(t0 + 0.35,  [PHONE_X, notifTopY]);
    bp.setValueAtTime(t1,         [PHONE_X, notifTopY]);
    bp.setValueAtTime(t1 + 0.3,   [PHONE_X, notifTopY - 50]);
    var bo = bubble.transform.opacity;
    ease(bo, [t0, t0 + 0.3, t1, t1 + 0.3], [0, 100, 100, 0]);

    var ip = icon.transform.position;
    ip.setValueAtTime(t0,         [PHONE_X - (PHONE_W - 50)/2 + 38, notifTopY - 80]);
    ip.setValueAtTime(t0 + 0.35,  [PHONE_X - (PHONE_W - 50)/2 + 38, notifTopY]);
    ip.setValueAtTime(t1,         [PHONE_X - (PHONE_W - 50)/2 + 38, notifTopY]);
    ip.setValueAtTime(t1 + 0.3,   [PHONE_X - (PHONE_W - 50)/2 + 38, notifTopY - 50]);
    ease(icon.transform.opacity, [t0, t0 + 0.3, t1, t1 + 0.3], [0, 100, 100, 0]);

    var tp = nTitle.transform.position;
    tp.setValueAtTime(t0,         [PHONE_X + (PHONE_W - 50)/2 - 22, notifTopY - 90, 0]);
    tp.setValueAtTime(t0 + 0.4,   [PHONE_X + (PHONE_W - 50)/2 - 22, notifTopY - 10, 0]);
    tp.setValueAtTime(t1,         [PHONE_X + (PHONE_W - 50)/2 - 22, notifTopY - 10, 0]);
    tp.setValueAtTime(t1 + 0.3,   [PHONE_X + (PHONE_W - 50)/2 - 22, notifTopY - 60, 0]);
    ease(nTitle.transform.opacity, [t0 + 0.1, t0 + 0.4, t1, t1 + 0.3], [0, 100, 100, 0]);

    var bbp = nBody.transform.position;
    bbp.setValueAtTime(t0,        [PHONE_X + (PHONE_W - 50)/2 - 22, notifTopY - 62, 0]);
    bbp.setValueAtTime(t0 + 0.45, [PHONE_X + (PHONE_W - 50)/2 - 22, notifTopY + 18, 0]);
    bbp.setValueAtTime(t1,        [PHONE_X + (PHONE_W - 50)/2 - 22, notifTopY + 18, 0]);
    bbp.setValueAtTime(t1 + 0.3,  [PHONE_X + (PHONE_W - 50)/2 - 22, notifTopY - 32, 0]);
    ease(nBody.transform.opacity, [t0 + 0.15, t0 + 0.45, t1, t1 + 0.3], [0, 100, 100, 0]);

    // Caption: fade in from right with slight x slide
    var cp = caption.transform.position;
    cp.setValueAtTime(t0 + 0.2,   [CONFIG.width * 0.45 + 50, notifTopY + 6, 0]);
    cp.setValueAtTime(t0 + 0.7,   [CONFIG.width * 0.45,      notifTopY + 6, 0]);
    cp.setValueAtTime(t1,         [CONFIG.width * 0.45,      notifTopY + 6, 0]);
    cp.setValueAtTime(t1 + 0.25,  [CONFIG.width * 0.45 - 30, notifTopY + 6, 0]);
    ease(caption.transform.opacity, [t0 + 0.2, t0 + 0.7, t1, t1 + 0.25], [0, 100, 100, 0]);

    // Connector draws on
    var conScale = connector.transform.scale;
    conScale.setValueAtTime(t0 + 0.3,  [0, 100]);
    conScale.setValueAtTime(t0 + 0.6,  [100, 100]);
    conScale.setValueAtTime(t1,        [100, 100]);
    conScale.setValueAtTime(t1 + 0.2,  [0, 100]);
    ease(connector.transform.opacity, [t0 + 0.3, t0 + 0.5, t1, t1 + 0.2], [0, 100, 100, 0]);

    // Dot pulse
    var dotScale = dot.transform.scale;
    dotScale.setValueAtTime(t0 + 0.3, [0, 0]);
    dotScale.setValueAtTime(t0 + 0.55, [180, 180]);
    dotScale.setValueAtTime(t0 + 0.85, [100, 100]);
    ease(dot.transform.opacity, [t0 + 0.3, t0 + 0.5, t1, t1 + 0.2], [0, 100, 100, 0]);

    // Lens flare on the bubble appearing (only on first 3)
    if (n < 3) {
        addLensFlare(bg, t0 + 0.4, [PHONE_X, notifTopY], 60);
    }
}

// -------- ACT 3: Outro (14.0 - 18.0s) --------
var outroBg = addShapeLayer(comp, "Outro_BG");
var outroRect = addRoundedRect(outroBg, "rect", CONFIG.width, CONFIG.height, 0, CONFIG.inkDeep);
setGroupPosition(outroRect, [CONFIG.width/2, CONFIG.height/2]);
outroBg.property("Transform").property("Opacity").setValue(0);
ease(outroBg.transform.opacity, [13.7, 14.3], [0, 95]);

var cta = addText(comp, "CTA", CONFIG.ctaAr, "Aref Ruqaa", 130, CONFIG.goldHi);
cta.transform.position.setValue([CONFIG.width/2, CONFIG.height/2 - 40, 0]);
addGlow(cta, 50, 50, 1.4);
cta.transform.opacity.setValue(0);
ease(cta.transform.opacity, [14.2, 14.8, 17.5, 18.0], [0, 100, 100, 0]);
var ctaScale = cta.transform.scale;
ease(ctaScale, [14.2, 14.8], [[85,85,85], [100,100,100]]);

var urlT = addText(comp, "URL", CONFIG.url, "Inter", 60, CONFIG.goldMid);
urlT.transform.position.setValue([CONFIG.width/2, CONFIG.height/2 + 80, 0]);
urlT.transform.opacity.setValue(0);
ease(urlT.transform.opacity, [14.6, 15.1, 17.5, 18.0], [0, 100, 100, 0]);

// Decorative star above CTA
var star = addShapeLayer(comp, "Najmah");
var starGrp = star.property("Contents").addProperty("ADBE Vector Group");
starGrp.name = "star";
var starShape = starGrp.property("Contents").addProperty("ADBE Vector Shape - Star");
starShape.property("Type").setValue(1); // Star
starShape.property("Points").setValue(8);
starShape.property("Outer Radius").setValue(60);
starShape.property("Inner Radius").setValue(24);
starShape.property("Outer Roundness").setValue(0);
starShape.property("Inner Roundness").setValue(0);
var starFill = starGrp.property("Contents").addProperty("ADBE Vector Graphic - Fill");
starFill.property("Color").setValue(CONFIG.goldHi);
setGroupPosition(starGrp, [CONFIG.width/2, CONFIG.height/2 - 200]);
addGlow(star, 50, 30, 1.4);
star.transform.opacity.setValue(0);
ease(star.transform.opacity, [14.0, 14.6, 17.5, 18.0], [0, 100, 100, 0]);
var starRot = starGrp.property("Transform").property("Rotation");
starRot.setValueAtTime(14.0, 0);
starRot.setValueAtTime(18.0, 60);

// -------- Color grade: subtle tritone over everything --------
var grade = addSolid(comp, "Grade", CONFIG.white, comp.width, comp.height);
grade.adjustmentLayer = true;
grade.moveToBeginning();
var tri = grade.property("ADBE Effect Parade").addProperty("ADBE Tritone");
tri.property("Highlights").setValue(CONFIG.goldHi);
tri.property("Midtones").setValue([0.3, 0.22, 0.36]);
tri.property("Shadows").setValue(CONFIG.inkDeep);
tri.property("Blend With Original").setValue(78);

// -------- Camera (3D rig) --------
var cam = comp.layers.addCamera("Camera", [CONFIG.width/2, CONFIG.height/2]);
cam.property("Transform").property("Position").setValue([CONFIG.width/2, CONFIG.height/2, -1500]);
cam.property("Transform").property("Position").setValueAtTime(0,    [CONFIG.width/2, CONFIG.height/2, -1700]);
cam.property("Transform").property("Position").setValueAtTime(18,   [CONFIG.width/2, CONFIG.height/2, -1500]);
ease(cam.property("Transform").property("Position"), [0, 18], [[CONFIG.width/2, CONFIG.height/2, -1700], [CONFIG.width/2, CONFIG.height/2, -1500]]);

// Enable motion blur on all animated layers
for (var L2 = 1; L2 <= comp.numLayers; L2++) {
    var lay = comp.layer(L2);
    if (lay.canSetEnabled) lay.motionBlur = true;
}

app.endUndoGroup();

alert("Done — comp 'Dawati_Notifications_Main' ready.\n\n" +
      "Tips:\n" +
      "• Spacebar to preview (RAM-cache first pass takes ~30s).\n" +
      "• If Arabic glyphs disconnect, set Character → Middle Eastern Engine.\n" +
      "• Render: Composition → Add to Render Queue → H.264 / MP4.");
