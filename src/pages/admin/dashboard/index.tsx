import {
  AddUser,
  Buy,
  Calling,
  ArrowLeft,
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
      <div className="border border-grey-200 rounded-custom">
        <div className="bg-secondary-50 rounded-t-custom px-5 py-4 flex items-center justify-between">
          <h4 className="text-base font-semibold">لیست سفارش</h4>
          <Link
            to="/orders"
            className="btn btn-link btn-sm btn-ghost decoration-transparent text-grey-800"
          >
            مشاهده همه
            <ArrowLeft />
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
                    <span className="badge bg-secondary-50 text-secondary">
                      در حال تامین
                    </span>
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
                    <span className="badge bg-secondary-50 text-secondary">
                      در حال تامین
                    </span>
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
                    <span className="badge bg-secondary-50 text-secondary">
                      در حال تامین
                    </span>
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
                    <span className="badge bg-secondary-50 text-secondary">
                      در حال تامین
                    </span>
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
                    <span className="badge bg-secondary-50 text-secondary">
                      در حال تامین
                    </span>
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
                    <span className="badge bg-secondary-50 text-secondary">
                      در حال تامین
                    </span>
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
                    <span className="badge bg-secondary-50 text-secondary">
                      در حال تامین
                    </span>
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
                    <span className="badge bg-secondary-50 text-secondary">
                      در حال تامین
                    </span>
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
      <div className="flex items-start gap-x-4 w-full">
        <div className="border border-grey-200 rounded-custom w-2/3">
          <div className="bg-grey-50 rounded-t-custom px-5 py-4 flex items-center justify-between">
            <h4 className="text-base font-semibold flex items-center gap-x-2">
              <Calling />
              <span>پشتیبانی</span>
            </h4>
            <Link
              to="/orders"
              className="btn btn-link btn-sm btn-ghost decoration-transparent text-grey-800"
            >
              مشاهده همه
              <ArrowLeft />
            </Link>
          </div>
          <Link to="/" className="py-2.5 px-5 flex flex-col gap-y-2.5">
            <div className="flex items-ceter justify-between">
              <span className="font-semibold text-sm">سارا احمدی</span>
              <span className="font-light text-sm text-grey-600">
                {new Intl.DateTimeFormat("fa-IR", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date())}
              </span>
            </div>
            <div className="flex items-ceter justify-between">
              <span className="text-xs text-secondary">درحال بررسی</span>
              <span className="font-light text-xs inline-block w-5 py-0.5 rounded-full bg-warning text-center">
                2
              </span>
            </div>
          </Link>
          <Link to="/" className="py-2.5 px-5 flex flex-col gap-y-2.5">
            <div className="flex items-ceter justify-between">
              <span className="font-semibold text-sm">سارا احمدی</span>
              <span className="font-light text-sm text-grey-600">
                {new Intl.DateTimeFormat("fa-IR", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date())}
              </span>
            </div>
            <div className="flex items-ceter justify-between">
              <span className="text-xs text-secondary">درحال بررسی</span>
              <span className="font-light text-xs inline-block w-5 py-0.5 rounded-full bg-warning text-center">
                2
              </span>
            </div>
          </Link>
          <Link to="/" className="py-2.5 px-5 flex flex-col gap-y-2.5">
            <div className="flex items-ceter justify-between">
              <span className="font-semibold text-sm">سارا احمدی</span>
              <span className="font-light text-sm text-grey-600">
                {new Intl.DateTimeFormat("fa-IR", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date())}
              </span>
            </div>
            <div className="flex items-ceter justify-between">
              <span className="text-xs text-secondary">درحال بررسی</span>
              <span className="font-light text-xs inline-block w-5 py-0.5 rounded-full bg-warning text-center">
                2
              </span>
            </div>
          </Link>
          <Link to="/" className="py-2.5 px-5 flex flex-col gap-y-2.5">
            <div className="flex items-ceter justify-between">
              <span className="font-semibold text-sm">سارا احمدی</span>
              <span className="font-light text-sm text-grey-600">
                {new Intl.DateTimeFormat("fa-IR", {
                  dateStyle: "short",
                  timeStyle: "short",
                }).format(new Date())}
              </span>
            </div>
            <div className="flex items-ceter justify-between">
              <span className="text-xs text-secondary">درحال بررسی</span>
              <span className="font-light text-xs inline-block w-5 py-0.5 rounded-full bg-warning text-center">
                2
              </span>
            </div>
          </Link>
        </div>
        <div className="border border-grey-200 rounded-custom w-full">
          <div className="bg-secondary-50 rounded-t-custom px-5 py-4 flex items-center justify-between">
            <h4 className="text-base font-semibold">درخواست‌های ثبت نام</h4>
            <Link
              to="/orders"
              className="btn btn-link btn-sm btn-ghost decoration-transparent text-grey-800"
            >
              مشاهده همه
              <ArrowLeft />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table table-auto text-start">
              <thead className="bg-secondary-50">
                <tr>
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
                      نوع کاربر
                      <button className="btn btn-ghost btn-square btn-sm">
                        <Swap />
                      </button>
                    </span>
                  </th>
                  <th align="right">
                    <span className="inline-flex items-center text-sm text-grey-800">
                      زمان درخواست
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
                  <td>سارا احمدی</td>
                  <td>
                    <span className="badge bg-success-50 text-success-700">
                      حقیقی
                    </span>
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("fa-IR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date())}
                  </td>
                  <td align="left">
                    <Link
                      to="/orders/2"
                      className="btn btn-ghost text-grey-800"
                    >
                      <Show />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>سارا احمدی</td>
                  <td>
                    <span className="badge bg-success-50 text-success-700">
                      حقیقی
                    </span>
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("fa-IR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date())}
                  </td>
                  <td align="left">
                    <Link
                      to="/orders/2"
                      className="btn btn-ghost text-grey-800"
                    >
                      <Show />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>سارا احمدی</td>
                  <td>
                    <span className="badge bg-success-50 text-success-700">
                      حقیقی
                    </span>
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("fa-IR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date())}
                  </td>
                  <td align="left">
                    <Link
                      to="/orders/2"
                      className="btn btn-ghost text-grey-800"
                    >
                      <Show />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>سارا احمدی</td>
                  <td>
                    <span className="badge bg-success-50 text-success-700">
                      حقیقی
                    </span>
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("fa-IR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date())}
                  </td>
                  <td align="left">
                    <Link
                      to="/orders/2"
                      className="btn btn-ghost text-grey-800"
                    >
                      <Show />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>سارا احمدی</td>
                  <td>
                    <span className="badge bg-success-50 text-success-700">
                      حقیقی
                    </span>
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("fa-IR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date())}
                  </td>
                  <td align="left">
                    <Link
                      to="/orders/2"
                      className="btn btn-ghost text-grey-800"
                    >
                      <Show />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>سارا احمدی</td>
                  <td>
                    <span className="badge bg-success-50 text-success-700">
                      حقیقی
                    </span>
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("fa-IR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date())}
                  </td>
                  <td align="left">
                    <Link
                      to="/orders/2"
                      className="btn btn-ghost text-grey-800"
                    >
                      <Show />
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td>سارا احمدی</td>
                  <td>
                    <span className="badge bg-success-50 text-success-700">
                      حقیقی
                    </span>
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("fa-IR", {
                      dateStyle: "short",
                      timeStyle: "short",
                    }).format(new Date())}
                  </td>
                  <td align="left">
                    <Link
                      to="/orders/2"
                      className="btn btn-ghost text-grey-800"
                    >
                      <Show />
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
