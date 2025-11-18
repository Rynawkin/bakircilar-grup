'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@bakircilar/ui';

interface CompanyCardProps {
  name: string;
  description: string;
  color: string;
  url: string;
  logo: string;
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  name,
  description,
  color,
  url,
  logo
}) => {
  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="block"
    >
      <Card hover className="h-full p-6 border-t-4" style={{ borderTopColor: color }}>
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Logo Placeholder */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-white font-bold text-2xl"
            style={{ backgroundColor: color }}
          >
            {name.split(' ')[1]?.charAt(0) || 'B'}
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">{name}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
          </div>

          <div className="pt-2">
            <span
              className="text-sm font-semibold hover:underline inline-flex items-center gap-2"
              style={{ color }}
            >
              Siteyi Ziyaret Et
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      </Card>
    </motion.a>
  );
};
