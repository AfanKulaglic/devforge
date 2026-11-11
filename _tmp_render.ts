import { renderPostSlides, setFormat } from "./src/lib/postRender";
import { ALL_POSTS } from "./src/lib/postsIndex";
const p04 = ALL_POSTS.find((p: any) => p.id === "p04")!;
setFormat("3:4" as any);
const slides = renderPostSlides(p04 as any);
const fs = require("fs");
slides.forEach((s: string, i: number) => fs.writeFileSync(`backups/s${i + 1}.svg`, s));
console.log("SLIDES=" + slides.length);
