import { ALL_POSTS } from './src/lib/postsIndex';
const p: any = ALL_POSTS.find((x) => x.layout === 'premium');
console.log('ID:', p.id);
console.log('cta:', p.cta);
console.log('site:', p.site);
