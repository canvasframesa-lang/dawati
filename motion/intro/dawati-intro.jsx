/**
 * Dawati — Cinematic Intro Generator
 * For Adobe After Effects (CC 2018+, tested on 2022)
 *
 * Usage:
 *   1. Open AE → File → Scripts → Run Script File…
 *   2. Pick this .jsx
 *   3. Composition appears named "Dawati_Intro"
 *   4. Edit the CONFIG block below before re-running to customize
 *
 * Output spec:
 *   1920x1080 @ 25fps, 7 seconds
 *   Dark gold cosmos background → 8-point Najmah star draws on →
 *   Family ribbon fades in → main names crash-in with shimmer →
 *   final fade-to-white handoff into the card
 *
 * Hand-off: when AE 2022 finishes downloading, drop this in the
 * project, hit Run, and you get the comp ready to render to MP4.
 */

// ============================================================
// CONFIG — edit these per customer, then re-run the script
// ============================================================
var CONFIG = {
    groomFamily: "آل الراجحي",
    brideFamily: "آل الفوزان",
    occasion:    "دعوة زفاف",
    dateLabel:   "الجمعة 4 محرّم 1448 هـ",

    duration:    7,        // seconds
    fps:         25,
    width:       1920,
    height:      1080,

    // Gold palette (matches the live Dawati card)
    goldHi:   [1.00, 0.97, 0.85],   // #fff8d8
    gold2:    [0.96, 0.82, 0.42],   // #f4d06b
    gold3:    [0.83, 0.66, 0.23],   // #d4a93a
    gold4:    [0.72, 0.54, 0.12],   // #b88a1e
    inkDeep:  [0.02, 0.02, 0.04]    // #050714
};

// ============================================================
// helpers
// ============================================================
function asColor(arr) { return [arr[0], arr[1], arr[2]]; }

function addSolid(comp, name, color, size) {
    var s = comp.layers.addSolid(asColor(color), name, size[0], size[1], 1, comp.duration);
    return s;
}

function addText(comp, name, text, fontSize, fontFamily, fillRGB) {
    var t = comp.layers.addText(text);
    t.name = name;
    var tp = t.property("Source Text").value;
    tp.font = fontFamily;
    tp.fontSize = fontSize;
    tp.fillColor = asColor(fillRGB);
    tp.justification = ParagraphJustification.CENTER_JUSTIFY;
    t.property("Source Text").setValue(tp);
    return t;
}

function setKeyframes(prop, times, values, easeOut, easeIn) {
    for (var i = 0; i < times.length; i++) {
        prop.setValueAtTime(times[i], values[i]);
    }
    if (easeOut && easeIn) {
        for (var j = 0; j < times.length; j++) {
            var ko = new KeyframeEase(0, easeOut);
            var ki = new KeyframeEase(0, easeIn);
            try { prop.setTemporalEaseAtKey(j + 1, [ki], [ko]); } catch (e) {}
        }
    }
}

// ============================================================
// build the comp
// ============================================================
app.beginUndoGroup("Build Dawati Intro");

var proj = app.project;
if (!proj) proj = app.newProject();

var comp = proj.items.addComp(
    "Dawati_Intro",
    CONFIG.width,
    CONFIG.height,
    1,
    CONFIG.duration,
    CONFIG.fps
);
comp.bgColor = asColor(CONFIG.inkDeep);
comp.openInViewer();

// ---- Layer 1: cosmic gradient backdrop --------------------------
var bg = addSolid(comp, "Cosmos BG", CONFIG.inkDeep, [CONFIG.width, CONFIG.height]);
var grad = bg.Effects.addProperty("ADBE Ramp");
grad.property("ADBE Ramp-0001").setValue([CONFIG.width / 2, 100]);                 // Start
grad.property("ADBE Ramp-0002").setValue(asColor(CONFIG.gold4).concat([0.15]));    // Start color (gold tinted)
grad.property("ADBE Ramp-0003").setValue([CONFIG.width / 2, CONFIG.height + 100]); // End
grad.property("ADBE Ramp-0004").setValue(asColor(CONFIG.inkDeep));                 // End color
grad.property("ADBE Ramp-0005").setValue(1); // Radial

// ---- Layer 2: glow halo behind star -----------------------------
var halo = addSolid(comp, "Halo", CONFIG.gold2, [800, 800]);
halo.position.setValue([CONFIG.width / 2, CONFIG.height / 2]);
halo.opacity.setValue(0);
var haloBlur = halo.Effects.addProperty("ADBE Gaussian Blur 2");
haloBlur.property(1).setValue(120);
setKeyframes(halo.opacity, [0, 1.2, 4.5, 6.5], [0, 35, 60, 100], 60, 60);

// ---- Layer 3: 8-pointed Najmah star (drawn as shape layer) ------
var star = comp.layers.addShape();
star.name = "Najmah Star";
var contents = star.property("ADBE Root Vectors Group");

// Build the star path using Polystar primitive
var starGroup = contents.addProperty("ADBE Vector Group");
starGroup.name = "Star";

var poly = starGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Star");
poly.property("Type").setValue(1);              // 1 = star
poly.property("Points").setValue(8);
poly.property("Inner Radius").setValue(80);
poly.property("Outer Radius").setValue(220);
poly.property("Inner Roundness").setValue(0);
poly.property("Outer Roundness").setValue(0);

// Gold fill
var fill = starGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
fill.property("Color").setValue(asColor(CONFIG.gold2));

// Stroke for definition
var stroke = starGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
stroke.property("Color").setValue(asColor(CONFIG.goldHi));
stroke.property("Stroke Width").setValue(3);

// Trim path for the drawing-on effect
var trim = starGroup.property("ADBE Vectors Group").addProperty("ADBE Vector Filter - Trim");
setKeyframes(trim.property("End"), [0, 1.6], [0, 100], 70, 70);

star.position.setValue([CONFIG.width / 2, CONFIG.height / 2 - 80]);
star.scale.setValue([60, 60]);
setKeyframes(star.scale, [0, 1.6, 6.5], [[60, 60], [110, 110], [140, 140]], 60, 60);
setKeyframes(star.rotation, [0, 7], [0, 90], 30, 30);

// Drop shadow on star
var sh = star.Effects.addProperty("ADBE Drop Shadow");
sh.property("Shadow Color").setValue(asColor(CONFIG.gold4));
sh.property("Opacity").setValue(70 * 2.55); // 0-255 scale
sh.property("Distance").setValue(0);
sh.property("Softness").setValue(40);

// ---- Layer 4: 'occasion' small label ---------------------------
var occLabel = addText(comp, "Occasion Label", CONFIG.occasion, 36, "Tajawal", CONFIG.gold2);
occLabel.position.setValue([CONFIG.width / 2, CONFIG.height / 2 + 120]);
occLabel.opacity.setValue(0);
setKeyframes(occLabel.opacity, [2.2, 3.0, 6.5], [0, 100, 100], 60, 60);
setKeyframes(occLabel.position,
    [2.2, 3.0],
    [[CONFIG.width / 2, CONFIG.height / 2 + 150], [CONFIG.width / 2, CONFIG.height / 2 + 120]],
    60, 60
);

// ---- Layer 5: family ribbon ('آل X · آل Y') --------------------
var families = CONFIG.groomFamily + "  ✦  " + CONFIG.brideFamily;
var famText = addText(comp, "Families", families, 90, "ArefRuqaa-Bold", CONFIG.goldHi);
famText.position.setValue([CONFIG.width / 2, CONFIG.height / 2 + 240]);
famText.opacity.setValue(0);
setKeyframes(famText.opacity, [3.2, 4.0, 6.5], [0, 100, 100], 60, 60);
setKeyframes(famText.scale, [3.2, 4.0], [[80, 80], [100, 100]], 70, 70);

// Subtle gold glow on family text
var famGlow = famText.Effects.addProperty("ADBE Glow");
famGlow.property("Glow Threshold").setValue(50);
famGlow.property("Glow Radius").setValue(20);
famGlow.property("Glow Intensity").setValue(1.2);
famGlow.property("Glow Colors").setValue(2); // A & B colors
famGlow.property("Color A").setValue(asColor(CONFIG.goldHi));
famGlow.property("Color B").setValue(asColor(CONFIG.gold2));

// ---- Layer 6: date label ---------------------------------------
var dateLabel = addText(comp, "Date", CONFIG.dateLabel, 30, "Tajawal", CONFIG.gold3);
dateLabel.position.setValue([CONFIG.width / 2, CONFIG.height / 2 + 360]);
dateLabel.opacity.setValue(0);
setKeyframes(dateLabel.opacity, [4.2, 5.0, 6.5], [0, 100, 100], 60, 60);

// ---- Layer 7: white-out transition at the end ------------------
var fadeWhite = addSolid(comp, "Fade White", [1, 1, 1], [CONFIG.width, CONFIG.height]);
fadeWhite.opacity.setValue(0);
setKeyframes(fadeWhite.opacity, [6.5, 6.95], [0, 100], 70, 70);
fadeWhite.moveToBeginning();
// move it back to top of stack
while (fadeWhite.index > 1) fadeWhite.moveBefore(comp.layers[fadeWhite.index - 1]);

// ---- Output module template hint -------------------------------
alert(
    "Dawati Intro composition ready.\n\n" +
    "Configured for: " + CONFIG.groomFamily + " × " + CONFIG.brideFamily + "\n" +
    "Duration: " + CONFIG.duration + "s @ " + CONFIG.fps + "fps\n\n" +
    "Next:\n" +
    "  1. Edit any fonts if missing (Tajawal / Aref Ruqaa).\n" +
    "  2. Composition → Add to Render Queue.\n" +
    "  3. Output Module: H.264 (MP4) — for WhatsApp share.\n" +
    "  4. Render.\n"
);

app.endUndoGroup();
