import { getCartCart } from "@/api/cart";
import { Popover, PopoverButton } from "@/components/popover";
import { Buy } from "react-iconly";
import { useQuery } from "react-query";

function CartDropdown() {
  const { data, isLoading } = useQuery("cart-cart", () => getCartCart());
  console.log(data);
  return (
    <Popover
      className="w-full sm:w-[430px] max-w-screen top-full shadow-card rounded-large"
      orientation="left"
      popoverBtn={
        <PopoverButton className="btn btn-square btn-accent">
          <Buy />
        </PopoverButton>
      }
    >
      <div className="my-4 flex items-center justify-between">
        <h6 className="font-semibold text-base">لیست اعلانات</h6>
        {/* <button className="text-primary">
          علامت به عنوان خوانده شده
        </button> */}
      </div>
      {/* <div className="divide-y max-h-96 overflow-y-auto">
        {notif.map((item, index) => (
          <NotificationItem item={item} key={index} />
        ))}
      </div> */}
      <div className="border-t">
        {/* <Link to="/notification" className="btn btn-link block my-4 w-full">
          مشاهده همه
        </Link> */}
      </div>
    </Popover>
  );
}

export { CartDropdown };
