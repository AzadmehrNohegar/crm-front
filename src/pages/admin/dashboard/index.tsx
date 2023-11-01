import {
  AddUser,
  Buy,
  ChevronLeft,
  Show,
  Swap,
  TwoUsers,
  Wallet,
} from "react-iconly";
import { DashboardCard } from "./partials/dashboardCard";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-innerContainer flex flex-col gap-y-5">
      <div className="flex items-center justify-between gap-x-4">
        <DashboardCard
          growth={11.2}
          icon={<Buy />}
          title="کل سفارش‌ها"
          type="secondary"
          unit="سفارش"
          value={20}
        />
        <DashboardCard
          growth={0}
          icon={<Wallet />}
          title="وجوه ورودی"
          type="success"
          unit="تومان"
          value="2450000"
        />
        <DashboardCard
          growth={-11.2}
          icon={<TwoUsers />}
          title="مشتری فعال"
          type="warning"
          unit="نفر"
          value={12}
        />
        <DashboardCard
          growth={11.2}
          icon={<AddUser />}
          title="درخواست ثبت نام"
          type="danger"
          unit="درخواست"
          value={16}
        />
      </div>
      <div className="border border-grey-200 rounded-t-custom">
        <div className="bg-secondary-50 rounded-t-custom px-5 py-4 flex items-center justify-between">
          <h4 className="text-base font-semibold">لیست سفارش</h4>
          <Link
            to="/orders"
            className="btn btn-link btn-ghost decoration-transparent text-grey-800"
          >
            مشاهده همه
            <ChevronLeft />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-auto text-start">
            <thead className="bg-secondary-50">
              <tr>
                <th align="right">
                  <span className="text-2xl font-light">#</span>
                </th>
                <th align="right">
                  <span className="inline-flex items-center text-sm text-grey-800">
                    شماره سفارش‌
                    <button className="btn btn-ghost btn-square btn-sm">
                      <Swap />
                    </button>
                  </span>
                </th>
                <th align="right">
                  <span className="inline-flex items-center text-sm text-grey-800">
                    نام کاربر
                    <button className="btn btn-ghost btn-square btn-sm">
                      <Swap />
                    </button>
                  </span>
                </th>

                <th align="right">
                  <span className="inline-flex items-center text-sm text-grey-800">
                    نوع پرداخت
                    <button className="btn btn-ghost btn-square btn-sm">
                      <Swap />
                    </button>
                  </span>
                </th>
                <th align="right">
                  <span className="inline-flex items-center text-sm text-grey-800">
                    مبلغ
                    <button className="btn btn-ghost btn-square btn-sm">
                      <Swap />
                    </button>
                  </span>
                </th>
                <th align="right">
                  <span className="inline-flex items-center text-sm text-grey-800">
                    زمان خرید
                    <button className="btn btn-ghost btn-square btn-sm">
                      <Swap />
                    </button>
                  </span>
                </th>
                <th align="right">
                  <span className="inline-flex items-center text-sm text-grey-800">
                    وضعیت
                    <button className="btn btn-ghost btn-square btn-sm">
                      <Swap />
                    </button>
                  </span>
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>1460</td>
                <td>سارا احمدی</td>
                <td>کیف پول</td>
                <td>{Number(145000).toLocaleString()} تومان</td>
                <td>
                  {new Intl.DateTimeFormat("fa-IR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date())}
                </td>
                <td>
                  <span className="text-success-400">
                    <span className="badge badge-secondary">در حال تامین</span>
                  </span>
                </td>
                <td align="left">
                  <Link to="/orders/2" className="btn btn-ghost text-grey-800">
                    <Show />
                  </Link>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>1460</td>
                <td>سارا احمدی</td>
                <td>کیف پول</td>
                <td>{Number(145000).toLocaleString()} تومان</td>
                <td>
                  {new Intl.DateTimeFormat("fa-IR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date())}
                </td>
                <td>
                  <span className="text-success-400">
                    <span className="badge badge-secondary">در حال تامین</span>
                  </span>
                </td>
                <td align="left">
                  <Link to="/orders/2" className="btn btn-ghost text-grey-800">
                    <Show />
                  </Link>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>1460</td>
                <td>سارا احمدی</td>
                <td>کیف پول</td>
                <td>{Number(145000).toLocaleString()} تومان</td>
                <td>
                  {new Intl.DateTimeFormat("fa-IR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date())}
                </td>
                <td>
                  <span className="text-success-400">
                    <span className="badge badge-secondary">در حال تامین</span>
                  </span>
                </td>
                <td align="left">
                  <Link to="/orders/2" className="btn btn-ghost text-grey-800">
                    <Show />
                  </Link>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>1460</td>
                <td>سارا احمدی</td>
                <td>کیف پول</td>
                <td>{Number(145000).toLocaleString()} تومان</td>
                <td>
                  {new Intl.DateTimeFormat("fa-IR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date())}
                </td>
                <td>
                  <span className="text-success-400">
                    <span className="badge badge-secondary">در حال تامین</span>
                  </span>
                </td>
                <td align="left">
                  <Link to="/orders/2" className="btn btn-ghost text-grey-800">
                    <Show />
                  </Link>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>1460</td>
                <td>سارا احمدی</td>
                <td>کیف پول</td>
                <td>{Number(145000).toLocaleString()} تومان</td>
                <td>
                  {new Intl.DateTimeFormat("fa-IR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date())}
                </td>
                <td>
                  <span className="text-success-400">
                    <span className="badge badge-secondary">در حال تامین</span>
                  </span>
                </td>
                <td align="left">
                  <Link to="/orders/2" className="btn btn-ghost text-grey-800">
                    <Show />
                  </Link>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>1460</td>
                <td>سارا احمدی</td>
                <td>کیف پول</td>
                <td>{Number(145000).toLocaleString()} تومان</td>
                <td>
                  {new Intl.DateTimeFormat("fa-IR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date())}
                </td>
                <td>
                  <span className="text-success-400">
                    <span className="badge badge-secondary">در حال تامین</span>
                  </span>
                </td>
                <td align="left">
                  <Link to="/orders/2" className="btn btn-ghost text-grey-800">
                    <Show />
                  </Link>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>1460</td>
                <td>سارا احمدی</td>
                <td>کیف پول</td>
                <td>{Number(145000).toLocaleString()} تومان</td>
                <td>
                  {new Intl.DateTimeFormat("fa-IR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date())}
                </td>
                <td>
                  <span className="text-success-400">
                    <span className="badge badge-secondary">در حال تامین</span>
                  </span>
                </td>
                <td align="left">
                  <Link to="/orders/2" className="btn btn-ghost text-grey-800">
                    <Show />
                  </Link>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>1460</td>
                <td>سارا احمدی</td>
                <td>کیف پول</td>
                <td>{Number(145000).toLocaleString()} تومان</td>
                <td>
                  {new Intl.DateTimeFormat("fa-IR", {
                    dateStyle: "short",
                    timeStyle: "short",
                  }).format(new Date())}
                </td>
                <td>
                  <span className="text-success-400">
                    <span className="badge badge-secondary">در حال تامین</span>
                  </span>
                </td>
                <td align="left">
                  <Link to="/orders/2" className="btn btn-ghost text-grey-800">
                    <Show />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
