import { getCartCart } from "@/api/cart";
import { Popover, PopoverButton } from "@/components/popover";
import { cart_item } from "@/model";
import { Buy } from "react-iconly";
import { useQuery } from "react-query";
import { CartDropdownItem } from "./partials/cartDropdownItem";
import { Link } from "react-router-dom";
import { Fragment } from "react";

function CartDropdown() {
  const { data: cartData } = useQuery("cart-cart", () => getCartCart());

  return (
    <Popover
      className="w-full sm:w-[430px] max-w-screen top-full shadow-card rounded-custom shadow-ev3 z-30"
      orientation="left"
      popoverBtn={
        <PopoverButton className="btn btn-square btn-accent hover:bg-white decoration-transparent text-grey-800">
          <Buy />
        </PopoverButton>
      }
    >
      {cartData?.data.results[0]?.cart_item?.length === 0 ? (
        <div className="flex flex-col items-center h-[533px] my-auto gap-y-4 justify-center">
          <img
            src="/images/cart-empty-1.png"
            className="max-w-xs"
            alt="cart empty"
          />
          <span className="font-semibold">سبد خرید شما خالی است.</span>
        </div>
      ) : (
        <Fragment>
          <div className="my-4 flex flex-col gap-y-4 items-center h-96 overflow-y-auto divide-y">
            {cartData?.data.results[0]?.cart_item?.map((item: cart_item) => (
              <CartDropdownItem key={item.id} {...item} />
            ))}
          </div>
          <div className="flex items-center justify-between px-2 py-4 border-t border-t-grey-200">
            <span className="text-sm">مبلغ قابل پرداخت</span>
            <span className="bg-success-50 px-4 py-2 border-none text-xs text-grey-500 rounded-lg inline-flex gap-x-2 items-center">
              <strong className="text-sm font-bold text-success-500">
                {Number(
                  cartData?.data.results[0]?.total_amount
                ).toLocaleString()}
              </strong>
              تومان
            </span>
          </div>
          <div className="pb-4">
            <Link to="/checkout" className="btn btn-sm btn-block btn-primary">
              تسویه حساب
            </Link>
          </div>
        </Fragment>
      )}
    </Popover>
  );
}

export { CartDropdown };
