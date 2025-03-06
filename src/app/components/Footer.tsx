export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
      <footer className="bg-white shadow-inner py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">© {currentYear} College App. All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }