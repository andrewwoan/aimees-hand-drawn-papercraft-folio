import fs from "fs";
import path from "path";
import { execSync } from "child_process";

// --- CONFIGURATION ---
const INPUT_DIR = process.argv[2] || "./raw_assets";
const OUTPUT_JSX_DIR = process.argv[3] || "./Experience/models";
const OUTPUT_GLB_DIR = process.argv[4] || "./public/models";

const TEXTURE_PATH_PREFIX = "/textures/";
const MODEL_PATH_PREFIX = "/models/";
const UTILS_IMPORT_PATH = "../utils/ktxLoader";

if (!fs.existsSync(OUTPUT_JSX_DIR))
  fs.mkdirSync(OUTPUT_JSX_DIR, { recursive: true });
if (!fs.existsSync(OUTPUT_GLB_DIR))
  fs.mkdirSync(OUTPUT_GLB_DIR, { recursive: true });

const files = fs
  .readdirSync(INPUT_DIR)
  .filter(
    (file) => path.extname(file) === ".glb" && !file.includes("-transformed"),
  );

files.forEach((file) => {
  const fileNameNoExt = path.parse(file).name; // e.g., "Scene_4_Fall"
  const inputFile = path.join(INPUT_DIR, file);
  const tempJsxFile = `${fileNameNoExt}.jsx`;
  const tempGlbFile = `${fileNameNoExt}-transformed.glb`;
  const finalJsxPath = path.join(OUTPUT_JSX_DIR, tempJsxFile);
  const finalGlbPath = path.join(OUTPUT_GLB_DIR, tempGlbFile);

  try {
    console.log(`\n📦 Processing: ${file}`);
    execSync(`npx gltfjsx "${inputFile}" -T -j -M`, { stdio: "inherit" });

    if (fs.existsSync(tempGlbFile)) {
      fs.renameSync(tempGlbFile, finalGlbPath);
    }

    let content = fs.readFileSync(tempJsxFile, "utf-8");
    let lines = content.split("\n");
    let newLines = [];

    let importsAdded = false;
    let hooksAdded = false;
    let currentActiveTextureNum = "1"; // Fallback

    // Prepare Texture Hooks
    const textureHooks = [];
    for (let i = 1; i <= 4; i++) {
      textureHooks.push(
        `  const texture_${i} = useTexture("${TEXTURE_PATH_PREFIX}${fileNameNoExt}_${i}.webp");`,
      );
    }

    for (let line of lines) {
      // A. Import Fix
      if (
        !importsAdded &&
        (line.includes("import React") || line.includes("import {"))
      ) {
        newLines.push(`import { useTexture } from "${UTILS_IMPORT_PATH}";`);
        importsAdded = true;
      }

      // B. Export Default Fix
      if (line.includes("export function Model")) {
        line = line.replace(
          "export function Model",
          "export default function Model",
        );
      }

      // C. Model Path Fix
      if (line.includes(`/${fileNameNoExt}-transformed.glb`)) {
        line = line.replace(
          `/${fileNameNoExt}-transformed.glb`,
          `${MODEL_PATH_PREFIX}${fileNameNoExt}-transformed.glb`,
        );
      }

      // D. Inject Hooks
      if (!hooksAdded && line.includes("const { nodes, materials }")) {
        newLines.push(line);
        newLines.push("", ...textureHooks, "");
        hooksAdded = true;
        continue;
      }

      // E. PRECISION MESH LOGIC
      const geoMatch = line.match(/geometry=\{nodes\.(.+?)\.geometry\}/);
      if (geoMatch) {
        const meshName = geoMatch[1];

        // We escape the fileName (e.g. Scene_4_Fall) and look for the number AFTER it
        // Pattern: Scene_4_Fall_([1-4])
        const escapedName = fileNameNoExt.replace(
          /[.*+?^${}()|[\]\\]/g,
          "\\$&",
        );
        const precisionRegex = new RegExp(`${escapedName}_([1-4])`);

        const numMatch = meshName.match(precisionRegex);
        if (numMatch) {
          currentActiveTextureNum = numMatch[1];
          console.log(
            `   ✅ Mesh: ${meshName.padEnd(40)} -> texture_${currentActiveTextureNum}`,
          );
        }
      }

      // F. Material Replacement
      if (line.includes("material={")) {
        line = line.replace(
          /material=\{[^}]+\}/,
          `material={texture_${currentActiveTextureNum}}`,
        );
      }

      newLines.push(line);
    }

    fs.writeFileSync(finalJsxPath, newLines.join("\n"));
    if (fs.existsSync(tempJsxFile)) fs.unlinkSync(tempJsxFile);
    console.log(`🚀 Generated: ${finalJsxPath}`);
  } catch (err) {
    console.error(`❌ Error in ${file}:`, err.message);
  }
});
