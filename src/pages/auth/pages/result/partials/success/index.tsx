import { Calling, Location, Message } from "react-iconly";

function AuthResultSuccess() {
  return (
    <div className="w-full flex flex-col items-start justify-center gap-y-4 border border-success rounded-custom p-5">
      <h2 className="text-success">درخواست موفق</h2>
      <span className="text-sm sm:text-base text-grey-600">
        درخواست شما با موفقیت ارسال شد. همکاران ما بعد از بررسی اطلاعات شما حساب
        شما را تایید خواهند کرد.
      </span>
      <div className="w-full bg-grey-50 flex flex-col items-start justify-center gap-y-4 rounded-custom p-5">
        <h1>با ما در ارتباط باشید</h1>
        <span className="text-sm sm:text-base text-grey-600">
          برای ارتباط با ما کافی است فرم را تکمیل کنید تا در اسرع وقت کارشناسان
          با شما تماس بگیرند و یا از طریق راه‌های ارتباطی می‌توانید با بازرگانی
          موثق در ارتباط باشید.
        </span>
        <ul className="w-full">
          <li className="flex items-center justify-between">
            <span className="inline-flex items-center gap-x-2 text-sm text-grey-600">
              <div className="bg-grey-100 rounded-lg p-1">
                <Message />
              </div>
              ایمیل
            </span>
            <span>movasagh@gmail.com</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="inline-flex items-center gap-x-2 text-sm text-grey-600">
              <div className="bg-grey-100 rounded-lg p-1">
                <Calling />
              </div>
              شماره تماس
            </span>
            <span>۰۹۱۲۶۳۷۲۹۳۴</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="inline-flex items-center gap-x-2 text-sm text-grey-600">
              <div className="bg-grey-100 rounded-lg p-1">
                <Location />
              </div>
              آدرس
            </span>
            <address className="not-italic text-sm text-justify sm:text-base max-w-[50%]">
              تهران، بازار بزرگ، بازار نوروز خان، سرای عزیزیان، پلاک ۶۷
            </address>
          </li>
        </ul>
      </div>
    </div>
  );
}

export { AuthResultSuccess };
