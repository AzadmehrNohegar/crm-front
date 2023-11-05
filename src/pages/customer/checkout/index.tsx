import { getCartCart } from "@/api/cart";
import { useMutation, useQuery } from "react-query";
import { CheckoutItem } from "./partials/checkoutItem";
import { cart_item } from "@/model";
import { Fragment, useState } from "react";
import { Input } from "@/components/input";
import { Bookmark, InfoCircle, Wallet } from "react-iconly";
import { Checkbox } from "@/components/checkbox";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getAccountMyProfile } from "@/api/account";
import Skeleton from "react-loading-skeleton";
import clsx from "clsx";
import { postOrderCreateOrder } from "@/api/order";
import { CheckoutOfflineFileUploadDialog } from "./partials/checkoutOfflineFileUploadDialog";

function Checkout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [
    isCheckoutOfflineFileUploadDialogOpen,
    setIsCheckoutOfflineFileUploadDialogOpen,
  ] = useState(false);

  const navigate = useNavigate();

  const { data: cartData, isLoading: isCartDataLoading } = useQuery(
    "cart-cart",
    () => getCartCart()
  );
  const { data: userProfile, isLoading: isUserProfileLoading } = useQuery(
    "user-profile",
    () => getAccountMyProfile()
  );

  const checkoutCart = useMutation(postOrderCreateOrder, {
    onSuccess: (res) => {
      const { order_id } = res.data as { order_id: number };
      navigate(`/orders/${order_id}`);
    },
  });

  const handleCheckout = () => {
    const formData = new FormData();
    if (searchParams.get("need_tax")) {
      formData.append("need_tax", "true");
    } else {
      formData.append("need_tax", "false");
    }
    if (searchParams.get("use_wallet")) {
      formData.append("use_wallet", "true");
    } else {
      formData.append("use_wallet", "false");
    }
    formData.append(
      "payment_type",
      searchParams.get("payment_type") || "online"
    );
    checkoutCart.mutate({
      body: formData,
    });
  };

  const handlePaymentGateway = () => {
    if (searchParams.get("payment_type") === "online") {
      handleCheckout();
    } else {
      setIsCheckoutOfflineFileUploadDialogOpen(true);
    }
  };

  if (cartData?.data.results[0]?.cart_item?.length === 0)
    return (
      <div className="h-innerContainer flex flex-col items-center justify-center gap-y-4 max-w-3xl mx-auto">
        <img src="/images/cart-empty-1.png" alt="cart empty" />
        <span className="text-xl">سبد خرید شما خالی است.</span>
      </div>
    );

  return (
    <Fragment>
      <div className="flex items-start gap-x-4">
        <div className="w-full sm:w-8/12 h-innerContainer flex flex-col gap-y-4">
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
              value={searchParams.get("code") || ""}
              onChange={(e) => {
                searchParams.set("code", e.target.value);
                setSearchParams(searchParams);
              }}
              className="input input-bordered ltr text-end w-full"
            />
            <button
              className="btn btn-primary"
              disabled={!searchParams.get("code")}
            >
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
                  searchParams.set("need_tax", "true");
                  setSearchParams(searchParams);
                } else {
                  searchParams.delete("need_tax");
                  setSearchParams(searchParams);
                }
              }}
            />
          </div>
        </div>

        <div className="hidden sm:flex w-4/12 border border-grey-200 rounded-custom p-5 flex-col gap-y-4">
          <h2 className="text-xl">انتخاب نحوه پرداخت</h2>
          <div className="flex items-center justify-between">
            <span>پرداخت از کیف پول</span>
            <input
              type="checkbox"
              className="toggle toggle-primary toggle-sm -scale-x-100"
              checked={searchParams.get("use_wallet") === "true"}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  searchParams.set("use_wallet", "true");
                  setSearchParams(searchParams);
                } else {
                  searchParams.delete("use_wallet");
                  setSearchParams(searchParams);
                }
              }}
            />
          </div>
          {searchParams.get("use_wallet") === "true" ? (
            <Fragment>
              <span
                className={clsx(
                  "text-sm w-full flex items-center py-3 px-4 rounded-xl text-grey-600 gap-x-2 me-auto",
                  isUserProfileLoading && "bg-grey-100",
                  userProfile?.data.customer.wallet > 0 && " bg-secondary-100",
                  userProfile?.data.customer.wallet === 0 && " bg-danger-100"
                )}
              >
                <Wallet />
                موجودی کیف پول
                <span className="inline-flex items-center gap-x-2 ms-auto">
                  <strong
                    className={clsx(
                      "font-bold",
                      isUserProfileLoading && "text-grey-800",
                      userProfile?.data.customer.wallet === 0 && " text-danger"
                    )}
                  >
                    {isUserProfileLoading ? (
                      <Skeleton height={16} width={56} inline />
                    ) : (
                      Number(
                        userProfile?.data.customer?.wallet
                      ).toLocaleString()
                    )}{" "}
                  </strong>
                  تومان
                </span>
              </span>
              {userProfile?.data.customer?.wallet === 0 ? (
                <div className="py-5 px-4 flex flex-col gap-y-2 items-start bg-grey-100 rounded-custom">
                  <h4 className="font-bold text-base flex items-center gap-x-2">
                    <InfoCircle size="small" />
                    <span>موجودی کافی نیست</span>
                  </h4>
                  <p className="text-sm font-light text-grey-600">
                    کاربر عزیز موجودی کیف پول شما برای پرداخت کافی نمی‌باشد،
                    برای تسویه یکی از راه‌های زیر را انتخاب کنید .
                  </p>
                </div>
              ) : null}
            </Fragment>
          ) : null}
          <div className="w-full flex items-center gap-x-2">
            <input
              id="online"
              type="radio"
              className="radio radio-error radio-sm"
              checked={searchParams.get("payment_type") === "online"}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  searchParams.set("payment_type", "online");
                  setSearchParams(searchParams);
                } else {
                  searchParams.delete("need_tax");
                  setSearchParams(searchParams);
                }
              }}
            />
            <label htmlFor="online">درگاه اینترنتی</label>
            <input
              id="offline"
              type="radio"
              className="radio radio-error radio-sm"
              checked={searchParams.get("payment_type") === "offline"}
              onChange={(e) => {
                if (e.currentTarget.checked) {
                  searchParams.set("payment_type", "offline");
                  setSearchParams(searchParams);
                } else {
                  searchParams.delete("need_tax");
                  setSearchParams(searchParams);
                }
              }}
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
                  {isCartDataLoading ? (
                    <Skeleton height={16} width={56} inline />
                  ) : (
                    Number(
                      cartData?.data.results[0]?.total_amount
                    ).toLocaleString()
                  )}{" "}
                </strong>
                تومان
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-grey-600">موجودی کیف پول</span>
              <span className="text-xs text-grey-500">
                <strong className="text-base font-bold text-grey-800">
                  {isUserProfileLoading ? (
                    <Skeleton height={16} width={56} inline />
                  ) : (
                    Number(userProfile?.data.customer?.wallet).toLocaleString()
                  )}{" "}
                </strong>
                تومان
              </span>
            </li>
            {/* <li className="flex items-center justify-between">
            <span className="text-sm text-grey-600">کد تخفیف</span>
            <span className="text-xs text-grey-500">
              <strong className="text-base font-bold text-grey-800">0</strong>
              تومان
            </span>
          </li> */}
            <li className="flex items-center justify-between">
              <span className="text-sm text-grey-600">مالیات</span>
              <span className="text-xs text-grey-500">
                <strong className="text-base font-bold text-grey-800">
                  {searchParams.get("need_tax") ? 9 : 0}
                </strong>{" "}
                درصد
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-grey-600">مبلغ قابل پرداخت</span>
              <span className="bg-success-50 px-4 py-2 border-none text-xs text-grey-500 rounded-lg inline-flex gap-x-2 items-center">
                <strong className="text-sm font-bold text-success-500">
                  {isCartDataLoading ? (
                    <Skeleton height={16} width={56} inline />
                  ) : (
                    Number(
                      cartData?.data.results[0]?.total_amount
                    ).toLocaleString()
                  )}
                </strong>
                تومان
              </span>
            </li>
          </ul>
          <button
            className="btn btn-primary btn-block h-10"
            disabled={
              searchParams.get("use_wallet") === "true" &&
              userProfile?.data.customer.wallet === 0 &&
              searchParams.get("payment_type") === "online"
            }
            onClick={handlePaymentGateway}
          >
            تسویه حساب
          </button>
        </div>
      </div>
      <CheckoutOfflineFileUploadDialog
        isOpen={isCheckoutOfflineFileUploadDialogOpen}
        closeModal={() => setIsCheckoutOfflineFileUploadDialogOpen(false)}
      />
    </Fragment>
  );
}

export default Checkout;
