/**
 * Dawati — Per-Guest Batch Render
 *
 * Reads a CSV of guest names and renders one MP4 per row using the
 * "Dawati_Intro" composition (run dawati-intro.jsx first, or have any
 * composition with a text layer named "Guest Name").
 *
 * Workflow:
 *   1. Make sure dawati-intro.jsx (or any custom comp) is in the project
 *      with a text layer named exactly "Guest Name".
 *   2. Edit CONFIG.csvPath and CONFIG.outputFolder below.
 *   3. AE → File → Scripts → Run Script File → pick this .jsx
 *   4. Watch the Render Queue fill up; hit Render All when ready.
 *
 * Performance tip: H.264 / MP4 via the Adobe Media Encoder queue is
 * fastest. If you need speed for 500+ rows, render to a fast intermediate
 * (Animation codec) then transcode in HandBrake/FFmpeg.
 */

// ============================================================
// CONFIG — edit these
// ============================================================
var CONFIG = {
    // Full path to a UTF-8 CSV (no BOM). See guests-template.csv.
    csvPath:      "C:/Users/Welcome/Documents/dawati-guests.csv",

    // Where to drop the rendered MP4s
    outputFolder: "C:/Users/Welcome/Documents/dawati-renders/",

    // The composition to use as the template
    compName:     "Dawati_Intro",

    // The text layer in the template comp that holds the guest name
    nameLayerName: "Guest Name",

    // Output module template name (must exist in your AE preferences)
    outputModuleTemplate: "H.264 - Match Render Settings - 15 Mbps"
};

// ============================================================
// CSV parser — minimal, handles quoted fields
// ============================================================
function readCSV(path) {
    var f = new File(path);
    if (!f.exists) throw new Error("CSV not found: " + path);
    f.encoding = "UTF-8";
    f.open("r");
    var text = f.read();
    f.close();

    var lines = text.split(/\r?\n/);
    var headers = lines[0].split(",");
    var rows = [];
    for (var i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        var cells = lines[i].split(",");
        var row = {};
        for (var j = 0; j < headers.length; j++) {
            row[headers[j].trim()] = (cells[j] || "").trim().replace(/^"|"$/g, "");
        }
        rows.push(row);
    }
    return rows;
}

// ============================================================
// helpers
// ============================================================
function findComp(name) {
    for (var i = 1; i <= app.project.items.length; i++) {
        var it = app.project.items[i];
        if (it instanceof CompItem && it.name === name) return it;
    }
    return null;
}

function findTextLayer(comp, name) {
    for (var i = 1; i <= comp.layers.length; i++) {
        var ly = comp.layers[i];
        if (ly.name === name && ly instanceof TextLayer) return ly;
    }
    return null;
}

function safeFilename(s) {
    return s.replace(/[\\/:*?"<>|]/g, "_").replace(/\s+/g, "_");
}

// ============================================================
// main
// ============================================================
app.beginUndoGroup("Dawati Batch Render");

var template = findComp(CONFIG.compName);
if (!template) {
    alert("Template comp '" + CONFIG.compName + "' not found.\n" +
          "Run dawati-intro.jsx first, or update CONFIG.compName.");
    app.endUndoGroup();
}

var rows;
try {
    rows = readCSV(CONFIG.csvPath);
} catch (e) {
    alert("Couldn't read CSV: " + e.message);
    app.endUndoGroup();
}

if (rows && template) {
    var outFolder = new Folder(CONFIG.outputFolder);
    if (!outFolder.exists) outFolder.create();

    var queued = 0;
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        if (!row.guest_name_ar) continue;

        // Duplicate the template
        var dup = template.duplicate();
        dup.name = "Render_" + (i + 1).toString();

        // Patch the guest name layer
        var nameLayer = findTextLayer(dup, CONFIG.nameLayerName);
        if (nameLayer) {
            var ts = nameLayer.property("Source Text").value;
            ts.text = row.guest_name_ar;
            nameLayer.property("Source Text").setValue(ts);
        }

        // Add to render queue
        var rqItem = app.project.renderQueue.items.add(dup);

        // Output module
        var omSettings = {
            "Output File Info": {
                "Full Flat Path": CONFIG.outputFolder +
                    safeFilename(row.guest_name_ar) + "_" + (i + 1).toString() + ".mp4"
            }
        };
        try {
            rqItem.outputModules[1].applyTemplate(CONFIG.outputModuleTemplate);
        } catch (e) {
            // Template not found — leave on default. Render will still work.
        }
        rqItem.outputModules[1].setSettings(omSettings);

        queued++;
    }

    alert(
        "Queued " + queued + " renders.\n\n" +
        "Open the Render Queue (Ctrl+Alt+0) and hit 'Render All'.\n" +
        "Output folder: " + CONFIG.outputFolder
    );
}

app.endUndoGroup();
