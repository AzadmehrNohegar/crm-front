import { Link } from "react-router-dom";
import { DashboardIntroProducts } from "./partials/introProducts";
import { DashboardSuggestedProducts } from "./partials/suggestedProducts";
import { DashboardCategoryProducts } from "./partials/categoryProducts";

function Dashboard() {
  return (
    <div className="min-h-screen">
      <Link to="/">
        <img
          src="/images/bannger-dashboard-temp.png"
          className="w-full"
          alt="banner temp"
        />
      </Link>
      <DashboardCategoryProducts />
      <DashboardIntroProducts />
      <DashboardSuggestedProducts />
    </div>
  );
}

export default Dashboard;
