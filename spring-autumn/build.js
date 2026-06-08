/*global Bun */
const replaceContent = (html, css, js) => {
  html = html.replace(
    /<link\s+[^>]*?href\s*=\s*['"]\.\/style\.css['"][^>]*>/i,
    `<style>${css}</style>`,
  );

  html = html.replace(
    /<script\s+[^>]*?src\s*=\s*['"]\.\/script\.js['"][^>]*><\/script>/i,
    `<script>${js}</script>`,
  );

  return html;
};
const bunBuild = async () => {
  await Bun.build({
    entrypoints: ["./style.css"],
    outdir: "dist",
    minify: true,
  });

  await Bun.build({
    entrypoints: ["./script.js"],
    outdir: "dist",
    minify: true,
  });

  let html = replaceContent(
    await Bun.file("index.html").text(),
    await Bun.file("dist/style.css").text(),
    await Bun.file("dist/script.js").text(),
  );
  await Bun.write("dist/spring-autumn.html", html);
  await Bun.file("dist/style.css").delete();
  await Bun.file("dist/script.js").delete();
};

const nodeBuild = async () => {
  const { readFileSync, writeFileSync } = await import("node:fs");
  let html = replaceContent(
    readFileSync("./index.html").toString(),
    readFileSync("./style.css").toString(),
    readFileSync("./script.js").toString(),
  );
  writeFileSync("dist/spring-autumn.html", html);
};

if (typeof Bun !== "object") {
  await nodeBuild();
} else {
  await bunBuild();
}
