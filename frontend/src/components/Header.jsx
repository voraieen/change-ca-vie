import React from 'react';
import { Button } from './ui/button';
import { Menu, BookOpen } from 'lucide-react';

const Header = ({ bookData, onToggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo et titre */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="lg:hidden"
            >
              <Menu size={20} />
            </Button>
            
            <div className="flex items-center space-x-3">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 leading-tight">
                  {bookData.title}
                </h1>
                <p className="text-sm text-gray-600 hidden sm:block">
                  {bookData.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            <div className="hidden sm:block text-sm text-gray-500">
              Par {bookData.author}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;