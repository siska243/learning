import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { RegisterController } from "../../server/controllers/RegisterController";
import { useEffect } from "react";
const Register = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  useEffect(() => {
    RegisterController.roles().then((e) => setRoles(e.data));
  }, []);
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = e.target.name.value;
    const lastName = e.target.lastname.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    const email = e.target.email.value;
    const roles=e.target.typeUser.value
    const data = {
      firstName,
      lastName,
      password,
      confirmPassword,
      email,
      roles
    };

    const res = await RegisterController.adduser(data);
  };

  return (
    <>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto  sm:pr-0">
        <div className="hidden md:block">
          <button
            className="bg-purple hover:bg-purple hover:text-white text-white text-15px font-medium ml-8 py-2 px-5 rounded"
            onClick={openModal}
          >
            Register
          </button>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                      <div>
                        <img
                          className="mx-auto h-12 w-auto"
                          src="/assets/logo/Logo.svg"
                          alt="Your Company"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                          Register your account
                        </h2>
                      </div>
                      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input
                          type="hidden"
                          name="remember"
                          defaultValue="true"
                        />
                        <div className="rounded-md shadow-sm mb-3">
                          <div className="mb-3">
                            <label htmlFor="lastname" className="sr-only">
                              Prénom
                            </label>
                            <input
                              id="lastname"
                              name="lastname"
                              type="text"
                              autoComplete="name"
                              required
                              className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              placeholder="Votre prénom"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="name" className="sr-only">
                              Nom
                            </label>
                            <input
                              id="name"
                              name="name"
                              type="text"
                              autoComplete="name"
                              required
                              className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              placeholder="Votre nom"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="email-address" className="sr-only">
                              Email
                            </label>
                            <input
                              id="email-address"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              className="relative block w-full appearance-none rounded-none rounded-t-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              placeholder="Email address"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="password" className="sr-only">
                              Password
                            </label>
                            <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              required
                              className="relative block w-full appearance-none rounded-none rounded-b-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              placeholder="Password"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="confirm-password"
                              className="sr-only"
                            >
                              Confirmation de mot password
                            </label>
                            <input
                              id="confirm-password"
                              name="confirmPassword"
                              type="password"
                              autoComplete="current-password"
                              required
                              className="relative block w-full appearance-none rounded-none rounded-b-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                              placeholder="Confirmation de mot password"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="typeUser">Vous êtes</label>
                            <select
                              id="typeUser"
                              name="typeUser"
                              required
                              className="relative block w-full appearance-none rounded-none rounded-b-md border border-grey500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                            >
                              <option value="">--Selectionner --</option>
                              {roles.map((role) => {
                                return (
                                  <option value={role?.slug} key={role?.slug}>
                                    {role?.title}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple py-2 px-4 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <LockClosedIcon
                                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                aria-hidden="true"
                              />
                            </span>
                            Register Now
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 "
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Register;
