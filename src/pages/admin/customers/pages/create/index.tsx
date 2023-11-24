import { useState } from "react";
import { CustomersCreateReal } from "./partials/real";
import { contract_types, customer } from "@/model";
import { CustomersCreateJuridical } from "./partials/juridical";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getAccountAdminAccountById } from "@/api/account";
import Skeleton from "react-loading-skeleton";

function CustomersCreate() {
  const [type, setType] = useState<contract_types>("REAL");

  const { account_id } = useParams();

  const { isLoading } = useQuery(
    `account-${account_id}`,
    () =>
      getAccountAdminAccountById({
        id: account_id,
      }),
    {
      enabled: !!account_id,
      onSuccess: (res) => {
        const { contract_type } = res?.data.customer as customer;
        setType(contract_type);
      },
    }
  );

  if (isLoading) return <Skeleton height={768} />;

  return (
    <div className="h-full flex flex-col">
      {!account_id ? (
        <div className="w-full flex flex-wrap gap-4">
          <h1 className="text-lg inline-block basis-full">
            نوع حساب کاربری خود را مشخص کنید{" "}
          </h1>
          <div className="text-sm flex items-center gap-x-2">
            <input
              id="real"
              type="radio"
              className="radio radio-secondary radio-sm"
              checked={type === "REAL"}
              onChange={() => setType("REAL")}
            />
            <label
              htmlFor="real"
              className={type === "REAL" ? "text-secondary font-semibold" : ""}
            >
              حقیقی
            </label>
          </div>
          <div className="text-sm flex items-center gap-x-2">
            <input
              id="juridical"
              type="radio"
              className="radio radio-secondary radio-sm"
              checked={type === "JURIDICAL"}
              onChange={() => setType("JURIDICAL")}
            />
            <label
              htmlFor="juridical"
              className={
                type === "JURIDICAL" ? "text-secondary font-semibold" : ""
              }
            >
              حقوقی
            </label>
          </div>
        </div>
      ) : null}
      {type === "REAL" ? <CustomersCreateReal /> : null}
      {type === "JURIDICAL" ? <CustomersCreateJuridical /> : null}
    </div>
  );
}

export default CustomersCreate;
