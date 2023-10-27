import { getCartCart } from "@/api/cart";
import { useQuery } from "react-query";
import { CheckoutItem } from "./partials/checkoutItem";
import { cart_item } from "@/model";
import { useState } from "react";
import { Input } from "@/components/input";
import { Bookmark } from "react-iconly";
import { Checkbox } from "@/components/checkbox";
import { useSearchParams } from "react-router-dom";

function Checkout() {
  const { data: cartData } = useQuery("cart-cart", () => getCartCart());

  const [searchParams, setSearchParams] = useSearchParams();

  const [code, setCode] = useState("");

  const [paymentType, setPaymentType] = useState<"online" | "offline" | null>(
    null
  );

  return (
    <div className="flex items-start gap-x-4">
      <div className="w-3/5 h-innerContainer flex flex-col gap-y-4">
        <h4 className="font-bold">محصولات انتخابی شما:</h4>
        <div className="w-full flex flex-col divide-y gap-y-4 max-h-1/2 overflow-y-auto">
          {cartData?.data.results[0]?.cart_item?.map((item: cart_item) => (
            <CheckoutItem key={item.id} {...item} />
          ))}
        </div>
        <h4 className="font-bold mb-4 mt-auto">کد تخفیف</h4>
        <div className="flex items-center gap-x-4">
          <Input
            containerClassName="w-full"
            placeholder="کد تخفیف رو وارد کنید"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="input input-bordered ltr text-end w-full"
          />
          <button className="btn btn-primary" disabled={!code}>
            اعمال کد
          </button>
        </div>
        <div className="bg-grey-50 p-5 rounded-custom flex flex-col gap-y-5">
          <h5 className="text-base font-semibold flex items-center gap-x-2">
            <span className="bg-secondary p-1.5 rounded-lg text-white">
              <Bookmark size="small" />
            </span>
            فاکتور رسمی
          </h5>
          <p>
            کاربر عزیز شما میتونید از این قسمت با پرداخت ۹ درصد مالیات ارزش بر
            افزوده درخواست فاکتور رسمی داشته باشید.
          </p>
          <Checkbox
            label="درخواست فاکتور رسمی دارم"
            containerClassName="w-fit"
            className="checkbox-sm"
            checked={searchParams.get("need_tax") === "true"}
            onChange={(e) => {
              if (e.currentTarget.checked) {
                searchParams.set("need_tax", `true`);
                setSearchParams(searchParams);
              } else {
                searchParams.delete("need_tax");
                setSearchParams(searchParams);
              }
            }}
          />
        </div>
      </div>

      <div className="w-2/5 border border-grey-200 rounded-custom p-5 flex flex-col gap-y-4">
        <h2 className="text-xl">انتخاب نحوه پرداخت</h2>
        <div className="flex items-center justify-between">
          <span>پرداخت از کیف پول</span>
          <input
            type="checkbox"
            className="toggle toggle-primary toggle-sm -scale-x-100"
          />
        </div>
        <div className="w-full flex items-center gap-x-2">
          <input
            id="online"
            type="radio"
            className="radio radio-error radio-sm"
            checked={paymentType === "online"}
            onChange={() => setPaymentType("online")}
          />
          <label htmlFor="online">درگاه اینترنتی</label>

          <input
            id="offline"
            type="radio"
            className="radio radio-error radio-sm"
            checked={paymentType === "offline"}
            onChange={() => setPaymentType("offline")}
          />
          <label htmlFor="offline">پرداخت آفلاین</label>
        </div>
        <h2 className="text-xl">جزئیات پرداخت</h2>
        <ul className="flex flex-col gap-y-4 py-4">
          <li className="flex items-center justify-between">
            <span className="text-sm text-grey-600">
              مبلغ کل ({cartData?.data.results[0]?.cart_item?.length} کالا)
            </span>
            <span className="text-xs text-grey-500">
              <strong className="text-base font-bold text-grey-800">
                {Number(
                  cartData?.data.results[0]?.total_amount
                ).toLocaleString()}{" "}
              </strong>
              تومان
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-grey-600">موجودی کیف پول</span>
            <span className="text-xs text-grey-500">
              <strong className="text-base font-bold text-grey-800">0</strong>
              تومان
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-grey-600">کد تخفیف</span>
            <span className="text-xs text-grey-500">
              <strong className="text-base font-bold text-grey-800">0</strong>
              تومان
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-sm text-grey-600">مبلغ قابل پرداخت</span>
            <span className="bg-success-50 px-4 py-2 border-none text-xs text-grey-500 rounded-lg inline-flex gap-x-2 items-center">
              <strong className="text-sm font-bold text-success-500">
                {Number(
                  cartData?.data.results[0]?.total_amount
                ).toLocaleString()}
              </strong>
              تومان
            </span>
          </li>
        </ul>
        <button className="btn btn-primary btn-block h-10">تسویه حساب</button>
      </div>
    </div>
  );
}

export default Checkout;
