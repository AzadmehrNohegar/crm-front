import { getAccountMyProfile } from "@/api/account";
import { getCartCart } from "@/api/cart";
import { postOrderCreateOrder } from "@/api/order";
import { Close } from "@/assets/icons/Close";
import { Dialog } from "@/components/dialog";
import { IExtendedDialogProps } from "@/model";
import clsx from "clsx";
import { Fragment } from "react";
import { InfoCircle, Wallet } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

interface ICheckoutFinalDialogProps extends IExtendedDialogProps {
  openOfflineDialog: () => void;
}

function CheckoutFinalDialog({
  closeModal,
  isOpen,
  openOfflineDialog,
}: ICheckoutFinalDialogProps) {
  const [searchParams, setSearchParams] = useSearchParams();

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
      toast("سفارش شما با موفقیت ثبت شد.", {
        type: "success",
      });
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
      openOfflineDialog();
    }
  };

  return (
    <Dialog isOpen={isOpen} closeModal={closeModal} placement="center">
      <Dialog.Title
        as="div"
        className="p-3.5 xl:p-5 text-start shadow-header flex items-center justify-between"
      >
        <h2 className="text-base xl:text-xl">جزئیات</h2>
        <button
          className="btn btn-ghost btn-sm xl:btn-md btn-link btn-square text-grey-800 decoration-transparent"
          onClick={closeModal}
        >
          <Close className="sclae-100 xl:scale-125" />
        </button>
      </Dialog.Title>
      <Dialog.Panel>
        <div className="flex w-full p-5 flex-col gap-y-4">
          <h2 className="text-base xl:text-xl">انتخاب نحوه پرداخت</h2>
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
          <h2 className="text-base xl:text-xl">جزئیات پرداخت</h2>
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
      </Dialog.Panel>
    </Dialog>
  );
}

export default CheckoutFinalDialog;
