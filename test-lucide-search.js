const lucide = require('lucide-react');
const keys = Object.keys(lucide);

// Look for anything that might be social media related
const possibleSocial = keys.filter(key => {
  const lower = key.toLowerCase();
  // Check for common social media platform names or variations
  return (
    lower.includes('insta') ||
    lower.includes('gram') ||
    lower.indexOf('facebook') >= 0 ||
    lower.indexOf('fb') >= 0 ||
    lower.includes('youtube') ||
    lower.includes('tube') ||
    lower.includes('yt') ||
    lower.includes('twitter') ||
    lower.includes('tw') ||
    lower.indexOf('x ') >= 0 ||  // X (formerly Twitter)
    lower.includes('linkedin') ||
    lower.indexOf('in') >= 0 ||
    lower.includes('pinterest') ||
    lower.indexOf('pin') >= 0 ||
    lower.includes('tiktok') ||
    lower.indexOf('tt') >= 0
  );
});
console.log('Possible social media exports:', possibleSocial);
console.log('Count:', possibleSocial.length);