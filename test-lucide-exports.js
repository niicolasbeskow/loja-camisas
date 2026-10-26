const lucide = require('lucide-react');
console.log('All exports:', Object.keys(lucide));
console.log('Has instagram:', Object.prototype.hasOwnProperty.call(lucide, 'instagram'));
console.log('Has youtube:', Object.prototype.hasOwnProperty.call(lucide, 'youtube'));
console.log('Has facebook:', Object.prototype.hasOwnProperty.call(lucide, 'facebook'));