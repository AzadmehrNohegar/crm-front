import { getAccountAdminAccountById } from "@/api/account";
import {
  getPaymentWalletTransaction,
  postPaymentWalletTransaction,
} from "@/api/payment";
import { Input } from "@/components/input";
import { useState } from "react";
import { ArrowUp, Search, Wallet } from "react-iconly";
import Skeleton from "react-loading-skeleton";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { useDebounce, useMediaQuery } from "usehooks-ts";
import { MobileWalletTabTable } from "./partials/mobileWalletTabTable";
import { WalletTabTable } from "./partials/walletTabTable";
import { Pagination } from "@/shared/pagination";
import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { Close } from "@/assets/icons/Close";
import { toast } from "react-toastify";

interface ICustomersDetailsWalletTabForm {
  amount: string;
  description: string;
}

function CustomersDetailsWalletTab() {
  const { account_id } = useParams();
  const { search: locationSearch } = useLocation();
  const matches = useMediaQuery("(max-width: 1280px)");

  const queryClient = useQueryClient();

  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedIndex, setSelectedIndex] = useState<number>();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty, dirtyFields },
    reset,
  } = useForm<ICustomersDetailsWalletTabForm>({
    defaultValues: {
      amount: "",
      description: "",
    },
  });

  const { data: accountData, isLoading } = useQuery(
    `account-${account_id}`,
    () =>
      getAccountAdminAccountById({
        id: account_id,
      }),
    {
      enabled: !!account_id,
    }
  );

  const { data: walletTransactions, isLoading: isWalletTransactionsLoading } =
    useQuery(
      ["wallet-transactions", debouncedSearch, locationSearch],
      () =>
        getPaymentWalletTransaction({
          params: {
            customer__id: accountData?.data.customer.id,
            search: debouncedSearch,
            page: searchParams.get("page") || 1,
            page_size: searchParams.get("page_size") || 10,
            ...(searchParams.get("ordering")
              ? { ordering: searchParams.get("ordering") || "" }
              : {}),
            ...(searchParams.get("date")
              ? { date: searchParams.get("date") || "" }
              : {}),
          },
        }),
      {
        enabled: !!accountData,
      }
    );

  const createWalletTransaction = useMutation(postPaymentWalletTransaction, {
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast("تراکنش ایجاد شد.", {
        type: "info",
      });
      reset();
    },
  });

  const onDeposit = (values: ICustomersDetailsWalletTabForm) =>
    createWalletTransaction.mutate({
      body: {
        type: "deposit",
        amount: +values.amount,
        description: values.description,
        customer: accountData?.data.customer?.id,
      },
    });

  const onWithdraw = (values: ICustomersDetailsWalletTabForm) =>
    createWalletTransaction.mutate({
      body: {
        type: "withdraw",
        amount: +values.amount,
        description: values.description,
        customer: accountData?.data.customer?.id,
      },
    });

  return (
    <div className="flex flex-col gap-y-4 relative">
      <Tab.Group
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
        as="div"
      >
        <Tab.List className="flex items-center gap-x-4">
          <Tab></Tab>
          <Tab
            as="button"
            className={({ selected }) =>
              clsx("btn", selected && "btn-success", !selected && "btn-ghost")
            }
          >
            <ArrowUp />
            افزایش موجودی
          </Tab>
          <Tab
            as="button"
            className={({ selected }) =>
              clsx("btn", selected && "btn-error", !selected && "btn-ghost")
            }
          >
            <ArrowUp />
            کاهش موجودی
          </Tab>
          <span className="text-sm basis-full xl:basis-auto inline-flex bg-secondary-100 items-center py-3 px-4 rounded-xl text-grey-600 gap-x-2 ms-auto">
            <Wallet />
            موجودی کیف پول
            <span className="inline-flex items-center gap-x-2 ms-auto xl:ms-10">
              <strong className="text-grey-800">
                {isLoading ? (
                  <Skeleton height={16} width={56} inline />
                ) : (
                  Number(accountData?.data.customer?.wallet).toLocaleString()
                )}{" "}
              </strong>
              تومان
            </span>
          </span>
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel></Tab.Panel>
          <Tab.Panel
            as="form"
            className="flex items-end gap-x-4 my-4"
            onSubmit={handleSubmit(onDeposit)}
          >
            <Controller
              control={control}
              name="amount"
              rules={{
                required: "این فیلد اجباری است.",
              }}
              render={({ field: { value, onChange } }) => (
                <NumericFormat
                  customInput={Input}
                  type="text"
                  placeholder="ثبت مبلغ دلخواه"
                  className="input input-bordered w-full"
                  iconEnd={
                    <span className="absolute end-0 inset-y-auto bg-grey-200 flex items-center px-2 rounded-e-lg h-full text-grey-600">
                      <span>تومان</span>
                    </span>
                  }
                  value={value}
                  onValueChange={({ value }) => onChange(value)}
                  thousandSeparator
                />
              )}
            />
            <Input
              placeholder="شرح تراکنش"
              className="input input-bordered w-full"
              error={errors.description}
              iconEnd={
                dirtyFields.description ? (
                  <button
                    type="button"
                    className="absolute end-4 inset-y-auto text-grey-600"
                    onClick={() => setValue("description", "")}
                  >
                    <Close />
                  </button>
                ) : null
              }
              {...register("description")}
            />
            <button
              className="btn btn-secondary w-48 disabled:bg-grey-200"
              disabled={!isValid || !isDirty}
            >
              اعمال
            </button>
          </Tab.Panel>
          <Tab.Panel
            as="form"
            className="flex items-end gap-x-4 my-4"
            onSubmit={handleSubmit(onWithdraw)}
          >
            <Controller
              control={control}
              name="amount"
              rules={{
                required: "این فیلد اجباری است.",
              }}
              render={({ field: { value, onChange } }) => (
                <NumericFormat
                  customInput={Input}
                  type="text"
                  placeholder="ثبت مبلغ دلخواه"
                  className="input input-bordered w-full"
                  iconEnd={
                    <span className="absolute end-0 inset-y-auto bg-grey-200 flex items-center px-2 rounded-e-lg h-full text-grey-600">
                      <span>تومان</span>
                    </span>
                  }
                  value={value}
                  onValueChange={({ value }) => onChange(value)}
                  thousandSeparator
                />
              )}
            />
            <Input
              placeholder="شرح تراکنش"
              className="input input-bordered w-full"
              error={errors.description}
              iconEnd={
                dirtyFields.description ? (
                  <button
                    type="button"
                    className="absolute end-4 inset-y-auto text-grey-600"
                    onClick={() => setValue("description", "")}
                  >
                    <Close />
                  </button>
                ) : null
              }
              {...register("description")}
            />
            <button
              className="btn btn-secondary w-48 disabled:bg-grey-200"
              disabled={!isValid || !isDirty}
            >
              اعمال
            </button>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
      {matches ? (
        <div className="mt-6 mb-36 xl:mb-24">
          <Input
            className="input input-bordered h-10 ms-auto input-ghost max-w-full w-96"
            containerClassName="my-4"
            placeholder="جست‌وجو"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            iconEnd={
              <button className="btn btn-secondary btn-square btn-sm absolute end-1 inset-y-auto">
                <Search size="small" />
              </button>
            }
          />
          <div className="rounded-custom border border-grey-200">
            <div className="flex items-center bg-secondary-50 rounded-t-custom justify-between p-4 xl:py-0">
              <h3 className="text-sm xl:text-base w-full">سوابق کیف پول</h3>
            </div>
            <MobileWalletTabTable
              wallet_transactions={walletTransactions?.data.results}
              isLoading={isWalletTransactionsLoading}
            />
          </div>
        </div>
      ) : (
        <div className="mt-6 mb-36 xl:mb-24">
          <div className="flex items-center bg-secondary-50 rounded-t-custom justify-between p-4 xl:py-0">
            <h3 className="text-sm xl:text-base w-full">سوابق کیف پول</h3>
            <Input
              className="input input-bordered h-10 ms-auto input-ghost max-w-full w-96"
              containerClassName="my-4"
              placeholder="جست‌وجو"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              iconEnd={
                <button className="btn btn-secondary btn-square btn-sm absolute end-1 inset-y-auto">
                  <Search />
                </button>
              }
            />
          </div>
          <WalletTabTable
            wallet_transactions={walletTransactions?.data.results}
            isLoading={isWalletTransactionsLoading}
          />
        </div>
      )}
      <Pagination
        count={walletTransactions?.data.count}
        next={walletTransactions?.data.next}
        page={+searchParams.get("page")! || 1}
        perPage={+searchParams.get("page_size")! || 10}
        prev={walletTransactions?.data.prev}
        setPage={(val) => {
          searchParams.set("page", String(val));
          setSearchParams(searchParams);
        }}
        setPerPage={(val) => {
          searchParams.set("page_size", String(val));
          searchParams.set("page", "1");
          setSearchParams(searchParams);
        }}
      />
    </div>
  );
}

export { CustomersDetailsWalletTab };
