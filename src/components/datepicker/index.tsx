import {
  DatePickerProps,
  CalendarProps,
  default as MultiDatePicker,
} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import clsx from "clsx";
import { useRef } from "react";
import "react-multi-date-picker/styles/colors/red.css";
import { Calendar } from "react-iconly";

type CalendarPropsGeneral = DatePickerProps & CalendarProps;
interface IDatePicker extends CalendarPropsGeneral {
  containerClassName?: string;
}

function DatePicker(props: IDatePicker) {
  const ref = useRef<HTMLDivElement>(null);
  const { containerClassName, ...rest } = props;

  const handleRefClick = () => {
    if (ref.current) ref.current.click();
  };

  return (
    <div
      className={clsx(
        "border border-grey-200 w-full focus:border-info-200 rounded-lg relative ps-12",
        containerClassName
      )}
    >
      <div
        role="button"
        onClick={handleRefClick}
        className="absolute start-0 inset-y-0 rounded-s-lg flex items-center justify-center h-full aspect-square bg-grey-50 text-grey-600"
      >
        <Calendar />
      </div>
      <MultiDatePicker
        ref={ref}
        calendar={persian}
        locale={persian_fa}
        monthYearSeparator="|"
        calendarPosition="bottom-right"
        editable={false}
        containerClassName="w-full"
        className="border border-grey-200 green"
        arrowClassName="border-r-0 border-l-0"
        inputClass="w-full px-3 py-[11px] outline-none border-none relative z-10 rounded-lg"
        {...rest}
      />
    </div>
  );
}

export { DatePicker };
