const lucide = require('lucide-react');
const keys = Object.keys(lucide);
// Search for common variations
const social = keys.filter(key => {
  const lower = key.toLowerCase();
  return lower.includes('insta') ||
         lower.includes('gram') ||
         lower.includes('tube') ||
         lower.includes('yo') ||
         lower.includes('face') ||
         lower.includes('book');
});
console.log('Social media related exports:', social);
console.log('Count:', social.length);