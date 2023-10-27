import { Link } from "react-router-dom";
import { DashboardIntroProducts } from "./partials/introProducts";
import { DashboardSuggestedProducts } from "./partials/suggestedProducts";

function Dashboard() {
  return (
    <div className="h-screen">
      <Link to="/">
        <img
          src="/images/bannger-dashboard-temp.png"
          className="w-full"
          alt="banner temp"
        />
      </Link>
      <div className="my-5">
        <h2 className="text-xl">دسته بندی محصولات</h2>
        <div className="flex items-center justify-between gap-x-4 mt-6">
          <Link
            to="/products"
            className="flex flex-col items-center justify-center gap-y-4 shadow-ev2 hover:shadow-ev3 w-full py-8 rounded-custom transition-all"
          >
            <div className="w-16 bg-grey-50 h-16 flex items-center justify-center rounded-xl p-2">
              <img src="/images/category-6.png" alt="category 6" />
            </div>
            <span className="text-base">قهوه</span>
          </Link>
          <Link
            to="/products"
            className="flex flex-col items-center justify-center gap-y-4 shadow-ev2 hover:shadow-ev3 w-full py-8 rounded-custom transition-all"
          >
            <div className="w-16 bg-grey-50 h-16 flex items-center justify-center rounded-xl p-2">
              <img src="/images/category-2.png" alt="category 2" />
            </div>
            <span className="text-base">چای و دمنوش</span>
          </Link>
          <Link
            to="/products"
            className="flex flex-col items-center justify-center gap-y-4 shadow-ev2 hover:shadow-ev3 w-full py-8 rounded-custom transition-all"
          >
            <div className="w-16 bg-grey-50 h-16 flex items-center justify-center rounded-xl p-2">
              <img src="/images/category-1.png" alt="category 1" />
            </div>
            <span className="text-base">نوشیدنی پودری و فوری</span>
          </Link>
          <Link
            to="/products"
            className="flex flex-col items-center justify-center gap-y-4 shadow-ev2 hover:shadow-ev3 w-full py-8 rounded-custom transition-all"
          >
            <div className="w-16 bg-grey-50 h-16 flex items-center justify-center rounded-xl p-2">
              <img src="/images/category-3.png" alt="category 3" />
            </div>
            <span className="text-base">ادویه‌جات</span>
          </Link>
          <Link
            to="/products"
            className="flex flex-col items-center justify-center gap-y-4 shadow-ev2 hover:shadow-ev3 w-full py-8 rounded-custom transition-all"
          >
            <div className="w-16 bg-grey-50 h-16 flex items-center justify-center rounded-xl p-2">
              <img src="/images/category-4.png" alt="category 4" />
            </div>
            <span className="text-base">خشکبار</span>
          </Link>
          <Link
            to="/products"
            className="flex flex-col items-center justify-center gap-y-4 shadow-ev2 hover:shadow-ev3 w-full py-8 rounded-custom transition-all"
          >
            <div className="w-16 bg-grey-50 h-16 flex items-center justify-center rounded-xl p-2">
              <img src="/images/category-5.png" alt="category 5" />
            </div>
            <span className="text-base">حبوبات</span>
          </Link>
        </div>
      </div>
      <DashboardIntroProducts />
      <DashboardSuggestedProducts />
    </div>
  );
}

export default Dashboard;
