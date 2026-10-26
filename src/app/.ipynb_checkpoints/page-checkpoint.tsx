import TabbedProducts from '@/components/TabbedProducts';
import BenefitColumns from '@/components/BenefitColumns';
import FeaturedProduct from '@/components/FeaturedProduct';
import CollectionSection from '@/components/CollectionSection';
import ImageComparison from '@/components/ImageComparison';
import ReviewsSection from '@/components/ReviewsSection';

export default function Home() {
  return (
    <main className="min-h-[calc(100vh-64px)] bg-white dark:bg-gray-800">
      <FeaturedProduct />
      <BenefitColumns />
      <CollectionSection />
      <ImageComparison />
      <ReviewsSection />
      <TabbedProducts />
    </main>
  );
}