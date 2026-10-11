const lucide = require('lucide-react');
console.log('lucide.instagram:', lucide.instagram);
if (lucide.instagram !== undefined) {
  console.log('Type:', typeof lucide.instagram);
  console.log('Is it a function?', typeof lucide.instagram === 'function');
  console.log('Is it an object?', typeof lucide.instagram === 'object');
  if (lucide.instagram !== null && typeof lucide.instagram === 'object') {
    console.log('Has $$typeof:', lucide.instagram['$$typeof']);
    console.log('Has render:', typeof lucide.instagram.render);
  }
}