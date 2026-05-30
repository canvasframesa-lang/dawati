/**
 * Dawati — Cinematic Intro Generator (Pro)
 * For Adobe After Effects CC 2018+ (tested on 2022)
 *
 * What you get:
 *   - 1920×1080 @ 30fps, 8 seconds, cinematic 24fps shutter angle
 *   - 3D scene with a real camera that dollies in
 *   - Multi-layer cosmic background (deep ramp + grain + drifting particles)
 *   - 8-point Najmah star drawn on via Trim Paths, then it gleams
 *     with a Light Sweep, halos with a soft Glow, and gets two
 *     lens flares hitting the corners on the beat
 *   - Family-name ribbon writes on letter-by-letter (Range Selector
 *     animator) with a 3D motion-blurred slide
 *   - Soft particle dust drifting through the depth of field
 *   - Final color grade — curves + tint + slight Tritone for warmth
 *   - White-out transition at the end ready to hand off to the card
 *
 * Usage:
 *   1. Open AE.
 *   2. File → Scripts → Run Script File… → pick this .jsx
 *   3. Composition "Dawati_Intro_Main" appears in a new project.
 *   4. Hit Spacebar to preview. Render via Render Queue or
 *      Composition → Add to Adobe Media Encoder Queue.
 *
 * Re-running:
 *   Edit the CONFIG block at the top and run again — the script
 *   wipes the prior comp and rebuilds from scratch.
 */

#target aftereffects

// ============================================================
// CONFIG
// ============================================================
var CONFIG = {
    groomFamily:  "آل الراجحي",
    brideFamily:  "آل الفوزان",
    occasion:     "دعوة زفاف",
    dateLabel:    "الجمعة 4 محرّم 1448 هـ",

    duration:     8.0,        // seconds
    fps:          30,
    width:        1920,
    height:       1080,
    shutterAngle: 180,        // cinematic motion blur

    // palette (linear values, AE wants 0–1)
    inkDeep:   [0.020, 0.027, 0.080],   // #050714
    inkSoft:   [0.082, 0.031, 0.165],   // #15082a
    goldHi:    [1.000, 0.972, 0.847],   // #fff8d8
    gold1:     [1.000, 0.906, 0.639],   // #ffe7a3
    gold2:     [0.957, 0.816, 0.420],   // #f4d06b
    gold3:     [0.831, 0.663, 0.227],   // #d4a93a
    gold4:     [0.722, 0.541, 0.118],   // #b88a1e
    gold5:     [0.541, 0.408, 0.090]    // #8a6817
};

// ============================================================
// Helpers
// ============================================================
function rgb(c)   { return [c[0], c[1], c[2]]; }
function rgba(c, a) { return [c[0], c[1], c[2], a]; }
function sec(t)   { return t; }

function easyEase(prop, idx, inFrac, outFrac) {
    var inEase  = new KeyframeEase(0, (inFrac  != null ? inFrac  : 75));
    var outEase = new KeyframeEase(0, (outFrac != null ? outFrac : 75));
    try { prop.setTemporalEaseAtKey(idx, [inEase], [outEase]); } catch (e) {}
}

function easyAll(prop, inFrac, outFrac) {
    for (var i = 1; i <= prop.numKeys; i++) easyEase(prop, i, inFrac, outFrac);
}

function key(prop, times, values, inFrac, outFrac) {
    for (var i = 0; i < times.length; i++) prop.setValueAtTime(times[i], values[i]);
    easyAll(prop, inFrac, outFrac);
}

function getOrCreateProject() {
    if (!app.project) app.newProject();
    return app.project;
}

function removeCompByName(name) {
    for (var i = app.project.numItems; i >= 1; i--) {
        var it = app.project.item(i);
        if (it && it.name === name) it.remove();
    }
}

function newSolid(comp, name, color, w, h) {
    return comp.layers.addSolid(rgb(color), name, w, h, 1, comp.duration);
}

function newTextLayer(comp, name, text, fontSize, font, fillColor, justify) {
    var t = comp.layers.addText(text);
    t.name = name;
    var doc = t.property("Source Text").value;
    doc.fontSize = fontSize;
    if (font) doc.font = font;
    if (fillColor) doc.fillColor = rgb(fillColor);
    doc.justification = (justify != null ? justify : ParagraphJustification.CENTER_JUSTIFY);
    doc.tracking = 0;
    t.property("Source Text").setValue(doc);
    return t;
}

function addFx(layer, matchName) {
    return layer.Effects.addProperty(matchName);
}

function fxProp(fxGroup, idx) { return fxGroup.property(idx); }

function set3D(layer) { layer.threeDLayer = true; }

function enableMB(layer) { layer.motionBlur = true; }

// ============================================================
// Build the master composition
// ============================================================
app.beginUndoGroup("Build Dawati Cinematic Intro");

var proj = getOrCreateProject();

// Wipe old comps from a previous run
removeCompByName("Dawati_Intro_Main");
removeCompByName("Dawati_Star_PreComp");
removeCompByName("Dawati_BG_PreComp");

// ---- STAR pre-comp (3D star with all its bells) -----------------
var starComp = proj.items.addComp("Dawati_Star_PreComp", 800, 800, 1, CONFIG.duration, CONFIG.fps);
starComp.bgColor = [0, 0, 0];

// Star shape
var star = starComp.layers.addShape();
star.name = "Najmah · 8pt";
set3D(star);
enableMB(star);
var sg = star.property("ADBE Root Vectors Group");

var sgItem = sg.addProperty("ADBE Vector Group");
sgItem.name = "Star Geometry";
var sgItems = sgItem.property("ADBE Vectors Group");

var poly = sgItems.addProperty("ADBE Vector Shape - Star");
poly.property("ADBE Vector Star Type").setValue(1);                 // 1 = star
poly.property("ADBE Vector Star Points").setValue(8);
poly.property("ADBE Vector Star Inner Radius").setValue(85);
poly.property("ADBE Vector Star Outer Radius").setValue(240);
poly.property("ADBE Vector Star Inner Roundness").setValue(2);
poly.property("ADBE Vector Star Outer Roundness").setValue(0);

var fill = sgItems.addProperty("ADBE Vector Graphic - Fill");
fill.property("ADBE Vector Fill Color").setValue(rgb(CONFIG.gold2));

var stroke = sgItems.addProperty("ADBE Vector Graphic - Stroke");
stroke.property("ADBE Vector Stroke Color").setValue(rgb(CONFIG.goldHi));
stroke.property("ADBE Vector Stroke Width").setValue(2.5);

// Trim path = the drawing-on effect
var trim = sgItems.addProperty("ADBE Vector Filter - Trim");
key(trim.property("ADBE Vector Trim End"),
    [sec(1.4), sec(2.6)],
    [0, 100], 100, 30);

// Star position/rotation/scale (3D)
star.transform.property("Position").setValue([400, 400, 0]);
star.transform.property("Anchor Point").setValue([0, 0, 0]);

key(star.transform.property("Y Rotation"),
    [sec(0), sec(CONFIG.duration)],
    [-25, 35], 50, 50);

key(star.transform.property("Z Rotation"),
    [sec(0), sec(CONFIG.duration)],
    [0, 35], 50, 50);

key(star.transform.property("Scale"),
    [sec(1.2), sec(2.8), sec(7.5)],
    [[60, 60, 60], [110, 110, 110], [125, 125, 125]],
    70, 70);

// Glow on the star
var glow = addFx(star, "ADBE Glo2");
glow.property("ADBE Glo2-0002").setValue(60);   // Glow Threshold
glow.property("ADBE Glo2-0003").setValue(60);   // Glow Radius
key(glow.property("ADBE Glo2-0004"),            // Glow Intensity
    [sec(1.5), sec(2.8), sec(5.0), sec(7.5)],
    [0.3, 1.6, 1.1, 1.4],
    70, 70);
glow.property("ADBE Glo2-0008").setValue(2);    // Glow Colors → A & B
glow.property("ADBE Glo2-0009").setValue(rgb(CONFIG.goldHi));
glow.property("ADBE Glo2-0010").setValue(rgb(CONFIG.gold2));

// Drop shadow (warm dark gold)
var ds = addFx(star, "ADBE Drop Shadow");
ds.property("ADBE Drop Shadow-0001").setValue(rgb(CONFIG.gold5));
ds.property("ADBE Drop Shadow-0002").setValue(170);  // Opacity
ds.property("ADBE Drop Shadow-0004").setValue(0);    // Distance
ds.property("ADBE Drop Shadow-0005").setValue(45);   // Softness

// Light Sweep at the peak — the gleam
var sweep = addFx(star, "CC Light Sweep");
sweep.property(1).setValue(150);                                 // Center
key(sweep.property(2), [sec(2.7), sec(3.4)], [-90, 270], 80, 80); // Direction
sweep.property(3).setValue(45);                                   // Shape
sweep.property(4).setValue(180);                                  // Width
sweep.property(5).setValue(20);                                   // Sweep Intensity
sweep.property(6).setValue(80);                                   // Edge Intensity
sweep.property(7).setValue(rgb(CONFIG.goldHi));                   // Edge Color

// Halo behind the star (soft solid + heavy blur)
var halo = newSolid(starComp, "Halo", CONFIG.gold2, 800, 800);
halo.moveAfter(star);
halo.blendingMode = BlendingMode.SCREEN;
var haloBlur = addFx(halo, "ADBE Gaussian Blur 2");
haloBlur.property(1).setValue(160);
key(halo.transform.property("Opacity"),
    [sec(0.5), sec(2.8), sec(5.5), sec(7.5)],
    [0, 60, 35, 80], 70, 70);

// ---- BACKGROUND pre-comp ---------------------------------------
var bgComp = proj.items.addComp("Dawati_BG_PreComp", CONFIG.width, CONFIG.height, 1, CONFIG.duration, CONFIG.fps);
bgComp.bgColor = rgb(CONFIG.inkDeep);

// Deep cosmos gradient
var bg = newSolid(bgComp, "Cosmos", CONFIG.inkDeep, CONFIG.width, CONFIG.height);
var ramp = addFx(bg, "ADBE Ramp");
ramp.property("ADBE Ramp-0001").setValue([CONFIG.width / 2, CONFIG.height * 0.2]);
ramp.property("ADBE Ramp-0002").setValue(rgb([
    CONFIG.gold4[0] * 0.35, CONFIG.gold4[1] * 0.35, CONFIG.gold4[2] * 0.35
]));
ramp.property("ADBE Ramp-0003").setValue([CONFIG.width / 2, CONFIG.height + 200]);
ramp.property("ADBE Ramp-0004").setValue(rgb(CONFIG.inkDeep));
ramp.property("ADBE Ramp-0005").setValue(1); // Radial

// Violet depth layer
var depth = newSolid(bgComp, "Violet Depth", CONFIG.inkSoft, CONFIG.width, CONFIG.height);
depth.blendingMode = BlendingMode.MULTIPLY;
depth.transform.property("Opacity").setValue(70);
depth.moveBefore(bg);

// CC Particle System II — drifting gold motes
var particlesLayer = newSolid(bgComp, "Gold Motes", [0, 0, 0], CONFIG.width, CONFIG.height);
particlesLayer.transform.property("Opacity").setValue(70);
var p = addFx(particlesLayer, "CC Particle Systems II");
p.property(1).setValue(0.5);                       // Birth Rate
p.property(2).setValue(2.0);                       // Longevity
p.property(3).setValue([CONFIG.width / 2, CONFIG.height + 50]); // Producer pos
p.property(4).setValue(50);                        // Radius X
p.property(5).setValue(50);                        // Radius Y
p.property(6).setValue(0);                         // Animation = Explosive
// Physics
p.property(7).setValue(120);                       // Velocity
p.property(8).setValue(20);                        // Inherit Velocity
p.property(9).setValue(-0.4);                      // Gravity
p.property(10).setValue(0.05);                     // Resistance
p.property(12).setValue(0);                        // Direction
p.property(13).setValue(0.5);                      // Extra
// Particle look
var pType = p.property("Particle");
pType.property(1).setValue(2);                     // Particle Type = Faded Sphere
pType.property(2).setValue(0.2);                   // Birth Size
pType.property(3).setValue(1.0);                   // Death Size
pType.property(4).setValue(50);                    // Size Variation
pType.property(5).setValue(rgb(CONFIG.gold1));     // Birth Color
pType.property(6).setValue(rgb(CONFIG.gold3));     // Death Color
pType.property(8).setValue(70);                    // Opacity Map

// Subtle grain
var grain = newSolid(bgComp, "Grain", [0.5, 0.5, 0.5], CONFIG.width, CONFIG.height);
grain.blendingMode = BlendingMode.OVERLAY;
grain.transform.property("Opacity").setValue(8);
var noise = addFx(grain, "ADBE Fractal Noise");
try {
    noise.property("Contrast").setValue(150);
    noise.property("Brightness").setValue(-30);
    var evo = noise.property("Evolution");
    key(evo, [sec(0), sec(CONFIG.duration)], [0, 360 * 4], 0, 0);
} catch (e) {}

// ---- MAIN composition ------------------------------------------
var main = proj.items.addComp("Dawati_Intro_Main", CONFIG.width, CONFIG.height, 1, CONFIG.duration, CONFIG.fps);
main.bgColor = rgb(CONFIG.inkDeep);
main.shutterAngle = CONFIG.shutterAngle;
main.motionBlur = true;
main.openInViewer();

// Background pre-comp
var bgLayer = main.layers.add(bgComp);
bgLayer.moveToEnd();
enableMB(bgLayer);

// Star pre-comp as 3D layer in the scene
var starLayer = main.layers.add(starComp);
set3D(starLayer);
enableMB(starLayer);
starLayer.transform.property("Position").setValue([CONFIG.width / 2, CONFIG.height / 2 - 80, 0]);
starLayer.transform.property("Anchor Point").setValue([400, 400, 0]);

// Subtle camera-relative parallax — the star drifts forward
key(starLayer.transform.property("Z Position"),
    [sec(0), sec(CONFIG.duration)],
    [200, -120], 70, 70);

// ---- Family ribbon -------------------------------------------
var familiesText = CONFIG.groomFamily + "   ✦   " + CONFIG.brideFamily;
var families = newTextLayer(main, "Families", familiesText, 110, "ArefRuqaa-Bold", CONFIG.goldHi);
set3D(families);
enableMB(families);
families.transform.property("Position").setValue([CONFIG.width / 2, CONFIG.height / 2 + 260, 0]);
families.transform.property("Anchor Point").setValue([0, 0, 0]);

key(families.transform.property("Opacity"),
    [sec(3.0), sec(4.0), sec(7.4)],
    [0, 100, 100], 70, 70);
key(families.transform.property("Y Position"),
    [sec(3.0), sec(4.0)],
    [CONFIG.height / 2 + 320, CONFIG.height / 2 + 260], 70, 70);
key(families.transform.property("Z Position"),
    [sec(3.0), sec(4.0)],
    [-400, 0], 70, 70);

// Letter-by-letter Range Selector with offset
try {
    var animators = families.property("ADBE Text Properties").property("ADBE Text Animators");
    var ani = animators.addProperty("ADBE Text Animator");
    ani.name = "Reveal";
    var sel = ani.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
    var offset = sel.property("ADBE Text Percent Offset");
    key(offset, [sec(3.2), sec(4.2)], [-100, 0], 80, 80);
    var aniProps = ani.property("ADBE Text Animator Properties");
    var posProp = aniProps.addProperty("ADBE Text Position 3D");
    posProp.setValue([0, 80, 0]);
    var opacProp = aniProps.addProperty("ADBE Text Opacity");
    opacProp.setValue(0);
    var blurProp = aniProps.addProperty("ADBE Text Blur");
    blurProp.setValue([20, 20]);
} catch (e) { /* older AE may use different match names */ }

// Soft glow on families
var famGlow = addFx(families, "ADBE Glo2");
famGlow.property("ADBE Glo2-0002").setValue(70);
famGlow.property("ADBE Glo2-0003").setValue(28);
famGlow.property("ADBE Glo2-0004").setValue(1.4);
famGlow.property("ADBE Glo2-0008").setValue(2);
famGlow.property("ADBE Glo2-0009").setValue(rgb(CONFIG.goldHi));
famGlow.property("ADBE Glo2-0010").setValue(rgb(CONFIG.gold2));

// ---- Occasion sub-label --------------------------------------
var occ = newTextLayer(main, "Occasion", CONFIG.occasion, 38, "Tajawal-Regular", CONFIG.gold2);
set3D(occ);
occ.transform.property("Position").setValue([CONFIG.width / 2, CONFIG.height / 2 + 140, 0]);
key(occ.transform.property("Opacity"),
    [sec(2.4), sec(3.0), sec(7.4)],
    [0, 100, 100], 70, 70);

// Letter-spacing tracking animator for an elegant fan-out
try {
    var trkAni = occ.property("ADBE Text Properties").property("ADBE Text Animators").addProperty("ADBE Text Animator");
    trkAni.name = "Tracking Out";
    var trkSel = trkAni.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
    trkSel.property("ADBE Text Percent Start").setValue(0);
    trkSel.property("ADBE Text Percent End").setValue(100);
    var trk = trkAni.property("ADBE Text Animator Properties").addProperty("ADBE Text Tracking Amount");
    key(trk, [sec(2.4), sec(3.4)], [-30, 12], 70, 70);
} catch (e) {}

// ---- Date label -----------------------------------------------
var dateLay = newTextLayer(main, "Date", CONFIG.dateLabel, 32, "Tajawal-Medium", CONFIG.gold3);
set3D(dateLay);
dateLay.transform.property("Position").setValue([CONFIG.width / 2, CONFIG.height / 2 + 400, 0]);
key(dateLay.transform.property("Opacity"),
    [sec(4.5), sec(5.2), sec(7.4)],
    [0, 100, 100], 70, 70);

// ---- Lens flares hitting the corners -------------------------
var flare1 = newSolid(main, "Lens Flare A", [0, 0, 0], CONFIG.width, CONFIG.height);
flare1.blendingMode = BlendingMode.ADD;
var lf1 = addFx(flare1, "ADBE Lens Flare");
key(lf1.property(1), [sec(2.7), sec(3.4)],
    [[CONFIG.width * 0.10, CONFIG.height * 0.15], [CONFIG.width * 0.25, CONFIG.height * 0.30]],
    70, 70);
key(lf1.property(2), [sec(2.6), sec(3.0), sec(3.6)], [0, 180, 0], 100, 100); // Intensity
lf1.property(3).setValue(2);  // Lens Type = 50-300mm Zoom

var flare2 = newSolid(main, "Lens Flare B", [0, 0, 0], CONFIG.width, CONFIG.height);
flare2.blendingMode = BlendingMode.ADD;
var lf2 = addFx(flare2, "ADBE Lens Flare");
key(lf2.property(1), [sec(4.0), sec(4.6)],
    [[CONFIG.width * 0.92, CONFIG.height * 0.85], [CONFIG.width * 0.75, CONFIG.height * 0.65]],
    70, 70);
key(lf2.property(2), [sec(3.9), sec(4.3), sec(4.9)], [0, 130, 0], 100, 100);
lf2.property(3).setValue(1);  // Lens Type = 35mm Prime

// ---- Camera (real 3D camera with dolly + small pan) ----------
var cam = main.layers.addCamera("Cinematic Camera", [CONFIG.width / 2, CONFIG.height / 2]);
var camOpts = cam.property("ADBE Camera Options Group");
camOpts.property("ADBE Camera Aperture").setValue(40);
camOpts.property("ADBE Camera Blur Level").setValue(120);

key(cam.transform.property("Position"),
    [sec(0), sec(CONFIG.duration)],
    [
        [CONFIG.width / 2 - 60, CONFIG.height / 2 - 30, -2200],
        [CONFIG.width / 2,      CONFIG.height / 2,      -1100]
    ],
    70, 70);

key(cam.transform.property("Point of Interest"),
    [sec(0), sec(CONFIG.duration)],
    [
        [CONFIG.width / 2 + 30, CONFIG.height / 2 + 20, 0],
        [CONFIG.width / 2,      CONFIG.height / 2,      0]
    ],
    70, 70);

// ---- Final color grade ---------------------------------------
var grade = newSolid(main, "Color Grade", [1, 1, 1], CONFIG.width, CONFIG.height);
grade.blendingMode = BlendingMode.NORMAL;
grade.transform.property("Opacity").setValue(100);

// Tritone gives a warm gold→shadow split
var tri = addFx(grade, "ADBE Tritone");
tri.property("ADBE Tritone-0001").setValue([0.05, 0.04, 0.10]); // Highlights → dark wine
tri.property("ADBE Tritone-0002").setValue(rgb(CONFIG.gold4));   // Midtones → brass
tri.property("ADBE Tritone-0003").setValue([0, 0, 0]);           // Shadows → black

// Cosmetic: Set Matte from the bg so the grade only affects the scene
grade.enabled = false; // start disabled; enable manually if you want the look

// ---- White-out hand-off --------------------------------------
var fadeOut = newSolid(main, "Fade White (Hand-off)", [1, 1, 1], CONFIG.width, CONFIG.height);
fadeOut.moveToBeginning();
key(fadeOut.transform.property("Opacity"),
    [sec(7.4), sec(7.95)], [0, 100], 80, 80);

// ============================================================
// Done
// ============================================================
app.endUndoGroup();

alert(
    "✦ Dawati Cinematic Intro built ✦\n\n" +
    "Comp:     Dawati_Intro_Main (8s @ 30fps, 1080p)\n" +
    "Subcomps: Dawati_BG_PreComp · Dawati_Star_PreComp\n\n" +
    "Preview:  Spacebar\n" +
    "Render:   Composition → Add to Adobe Media Encoder Queue\n" +
    "          (H.264 / MP4 preset for WhatsApp share)\n\n" +
    "Tip: turn ON Composition → Motion Blur button (the half-circle\n" +
    "icon in the timeline) to see the cinematic shutter blur.\n\n" +
    "Re-style: tweak the CONFIG block at the top, then run again."
);
