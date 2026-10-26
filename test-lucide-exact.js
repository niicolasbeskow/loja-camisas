const lucide = require('lucide-react');
const keys = Object.keys(lucide);

// Look for exact matches or very close variations
const exactMatches = [];
const InstagramVariants = keys.filter(key =>
  key === 'Instagram' ||
  key.toLowerCase() === 'instagram'
);
const YoutubeVariants = keys.filter(key =>
  key === 'Youtube' ||
  key === 'YouTube' ||
  key.toLowerCase() === 'youtube' ||
  key.toLowerCase() === 'youtube'
);
const FacebookVariants = keys.filter(key =>
  key === 'Facebook' ||
  key.toLowerCase() === 'facebook'
);

console.log('Instagram variants:', InstagramVariants);
console.log('Youtube variants:', YoutubeVariants);
console.log('Facebook variants:', FacebookVariants);

// Also check for common prefixes/suffixes that lucide might use
const prefixedInstagram = keys.filter(key =>
  key.startsWith('Instagram') ||
  key.endsWith('Instagram') ||
  key.toLowerCase().startsWith('instagram') ||
  key.toLowerCase().endsWith('instagram')
);
const prefixedYoutube = keys.filter(key =>
  key.startsWith('Youtube') ||
  key.startsWith('YouTube') ||
  key.endsWith('Youtube') ||
  key.endsWith('YouTube') ||
  key.toLowerCase().startsWith('youtube') ||
  key.toLowerCase().endsWith('youtube') ||
  key.toLowerCase().startsWith('yt') ||
  key.toLowerCase().endsWith('yt')
);
const prefixedFacebook = keys.filter(key =>
  key.startsWith('Facebook') ||
  key.endsWith('Facebook') ||
  key.toLowerCase().startsWith('facebook') ||
  key.toLowerCase().endsWith('facebook') ||
  key.toLowerCase().startsWith('fb') ||
  key.toLowerCase().endsWith('fb')
);

console.log('Prefixed Instagram:', prefixedInstagram);
console.log('Prefixed Youtube:', prefixedYoutube);
console.log('Prefixed Facebook:', prefixedFacebook);