'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  label: string;
  href: string;
  external?: boolean;
}

interface HeaderProps {
  logo: React.ReactNode;
  menuItems: MenuItem[];
  brandColor?: string;
  onLanguageChange?: (lang: string) => void;
  currentLanguage?: string;
}

export const Header: React.FC<HeaderProps> = ({
  logo,
  menuItems,
  brandColor = '#3b82f6',
  onLanguageChange,
  currentLanguage = 'tr'
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const languages = [
    { code: 'tr', label: 'TR' },
    { code: 'en', label: 'EN' },
    { code: 'de', label: 'DE' },
    { code: 'es', label: 'ES' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 backdrop-blur-md bg-opacity-95 shadow-xl border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 md:h-22">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            {logo}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              item.external ? (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-400 transition-colors duration-200 font-semibold text-base"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={index}
                  href={item.href}
                  className="text-white hover:text-blue-300 transition-all duration-200 font-medium text-base relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              )
            ))}

            {/* Language Selector */}
            {onLanguageChange && (
              <div className="flex space-x-2 border-l border-gray-600 pl-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => onLanguageChange(lang.code)}
                    className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-all ${
                      currentLanguage === lang.code
                        ? 'bg-blue-500 text-white shadow-lg scale-110'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-700"
            >
              <div className="py-4 space-y-3">
                {menuItems.map((item, index) => (
                  item.external ? (
                    <a
                      key={index}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block py-2 text-white hover:text-blue-400 transition-colors font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={index}
                      href={item.href}
                      className="block py-2 text-white hover:text-blue-400 transition-colors font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )
                ))}

                {/* Mobile Language Selector */}
                {onLanguageChange && (
                  <div className="flex space-x-2 pt-3 border-t border-gray-700">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          onLanguageChange(lang.code);
                          setIsMenuOpen(false);
                        }}
                        className={`px-3 py-1.5 text-sm font-bold rounded-lg transition-all ${
                          currentLanguage === lang.code
                            ? 'bg-blue-500 text-white shadow-lg'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
