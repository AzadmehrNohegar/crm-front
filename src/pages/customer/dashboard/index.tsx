import { DashboardIntroProducts } from "./partials/introProducts";
import { DashboardSuggestedProducts } from "./partials/suggestedProducts";
import { DashboardCategoryProducts } from "./partials/categoryProducts";
import { DashboardBrandProducts } from "./partials/brandProducts";
import { DashboardCarouselProducts } from "./partials/carouselProducts";

function Dashboard() {
  return (
    <div className="min-h-screen">
      <DashboardCarouselProducts />
      <DashboardCategoryProducts />
      <DashboardIntroProducts />
      <DashboardSuggestedProducts />
      <DashboardBrandProducts />
    </div>
  );
}

export default Dashboard;
