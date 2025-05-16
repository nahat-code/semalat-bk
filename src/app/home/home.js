'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';
import { usePathname } from 'next/navigation';

// Iconos
const Bars3Icon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);
const XMarkIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const ShoppingBagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalQuantity, isInitialized } = useCart() || { totalQuantity: 0, isInitialized: false };
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Productos', href: '/productos' },
    { name: 'Servicios', href: '/servicios' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-blue-900 dark:bg-black shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1 items-center space-x-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">GRUPO SEMALAT S.C.</span>
            <div className="leading-tight">
              <span className="text-xl font-extrabold tracking-tight text-white">GRUPO SEMALAT</span>
              <p className="text-xs text-gray-300">Soluciones Contables y Fiscales a tu Alcance</p>
            </div>
          </Link>
        </div>

        {/* Menú móvil: botón abrir */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Abrir menú principal</span>
            <Bars3Icon />
          </button>
        </div>

        {/* Navegación Desktop */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 ${
                pathname === item.href
                  ? 'text-[var(--color-primary)]'
                  : 'text-white hover:text-[var(--color-primary)]'
              } transition-colors duration-200`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Acceso y Carrito Desktop */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end items-center space-x-6">
          <Link href="/login" className="text-sm font-semibold text-white hover:text-[var(--color-primary)] transition-colors duration-200">
            Acceder
          </Link>
          <Link href="/carrito" className="relative text-white hover:text-[var(--color-primary)] transition-colors duration-200">
            <ShoppingBagIcon />
            {isInitialized && totalQuantity > 0 && (
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[var(--color-primary)] rounded-full shadow-md ring-2 ring-white">
                {totalQuantity}
              </span>
            )}
          </Link>
        </div>
      </nav>

      {/* Menú móvil expandido */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-40 bg-black/25" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-blue-900 dark:bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <div className="leading-tight">
                  <span className="text-lg font-bold text-white">GRUPO SEMALAT</span>
                  <p className="text-xs text-gray-300">Soluciones Contables y Fiscales a tu Alcance</p>
                </div>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Cerrar menú</span>
                <XMarkIcon />
              </button>
            </div>

            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-3 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`-mx-3 block rounded-lg px-4 py-3 text-base font-semibold leading-7 ${
                        pathname === item.href ? 'text-[var(--color-primary)]' : 'text-white hover:bg-blue-800 dark:hover:bg-gray-800'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                {/* Acceder y Carrito en móvil */}
                <div className="py-6 space-y-3">
                  <Link
                    href="/login"
                    className="-mx-3 block rounded-lg px-4 py-3 text-base font-semibold leading-7 text-white hover:bg-blue-800 dark:hover:bg-gray-800"
                  >
                    Acceder
                  </Link>
                  <Link
                    href="/carrito"
                    className="-mx-3 flex items-center rounded-lg px-4 py-3 text-base font-semibold leading-7 text-white hover:bg-blue-800 dark:hover:bg-gray-800"
                  >
                    <ShoppingBagIcon />
                    <span className="ml-2">Carrito</span>
                    {isInitialized && totalQuantity > 0 && (
                      <span className="ml-auto inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-[var(--color-primary)] rounded-full">
                        {totalQuantity}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
