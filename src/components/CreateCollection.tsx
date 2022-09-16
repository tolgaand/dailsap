/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletConnectButton } from "./WalletConnectButton";
import { create, test, enforce } from "vest";
import { vestResolver } from "@hookform/resolvers/vest";
import { useForm } from "react-hook-form";
import { CreateCollectionPayload } from "framework/DailsapClient";
import { useCreateCollection } from "hooks/useCollections";

type FormValues = Omit<CreateCollectionPayload, "collectionId">;

type CreateCollectionProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const validationSuite = create((data: FormValues) => {
  test("name", "Name is required", () => {
    enforce(data.name).isNotBlank();
  });

  test("description", "Description is required", () => {
    enforce(data.description).isNotBlank();
  });

  test("image", "Image url is required", () => {
    enforce(data.image).isNotBlank();
  });
});

export const CreateCollection = (props: CreateCollectionProps) => {
  const { publicKey } = useWallet();
  const {
    register,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useForm<FormValues>({ resolver: vestResolver(validationSuite) });

  const createCollection = useCreateCollection();

  const { open, setOpen } = props;

  const cancelButtonRef = useRef(null);

  useEffect(() => {
    reset({
      name: "",
      description: "",
      image: "",
    });
  }, [open, reset]);

  const onSubmit = async (values: FormValues) => {
    await createCollection.mutateAsync(values);
    setOpen(false);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        Create Collection
                      </Dialog.Title>
                      <div className="mt-5">
                        <div>
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Collection Name
                          </label>
                          <input
                            type="text"
                            {...register("name")}
                            placeholder="Please write your name and last name"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                          />
                        </div>

                        <div className="mt-2">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Description
                          </label>
                          <textarea
                            rows={6}
                            {...register("description")}
                            placeholder="Please write your address"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 resize-none"
                          />
                        </div>

                        <div className="mt-2">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Image url
                          </label>
                          <input
                            type="url"
                            {...register("image")}
                            placeholder="Please write your name and last name"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    {!publicKey && <WalletConnectButton />}
                    {publicKey && (
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-orange-500 hover:bg-orange-600 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2  focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                      >
                        Create
                      </button>
                    )}

                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      ref={cancelButtonRef}
                      onClick={() => setOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
