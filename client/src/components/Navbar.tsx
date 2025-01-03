const NavbarLogin: React.FC = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a
          href="https://flowbite.com/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://www.svgrepo.com/show/88088/book-opened-outline-from-top-view.svg"
            className="h-9 bg-blue-300 rounded-full p-2 "
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Book Fly
          </span>
        </a>
        <div className="flex md:order-2 space-x-3 gap-x-2 md:space-x-0 rtl:space-x-reverse">
          <span className="flex self-center">Alex</span>
          <img
            className="h-9 w-9 rounded-full"
            src="https://www.svgrepo.com/show/108357/avatar.svg"
            alt="avatar"
          />
          {/* <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get started
          </button> */}
        </div>
      </div>
    </nav>
  );
};
export default NavbarLogin;
