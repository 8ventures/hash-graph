import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Dropdown({ options, name, onSelect }) {
  const [selected, setSelected] = useState(null);
  const handleSelect = (value) => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <Menu as="div" className="relative inline-block text-left w-full">
      <div className="w-full">
        <Menu.Button className="w-full inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <span className="w-full truncate">{selected || name}</span>
          <ChevronDownIcon
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-full max-w-md origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options && options.length > 0 ? (
              options.map((option) => (
                <Menu.Item key={option} onClick={() => handleSelect(option)}>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm truncate'
                      )}
                    >
                      {option}
                    </a>
                  )}
                </Menu.Item>
              ))
            ) : (
              <Menu.Item disabled>
                <span className="block px-4 py-2 text-sm text-gray-500">
                  No options available
                </span>
              </Menu.Item>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default Dropdown;
