const lucide = require('lucide-react');
const keys = Object.keys(lucide);
const social = keys.filter(key =>
  key.toLowerCase().includes('instagram') ||
  key.toLowerCase().includes('youtube') ||
  key.toLowerCase().includes('facebook')
);
console.log('Social media related exports:', social);
console.log('Count:', social.length);