"use client";
import { useState } from "react";
import {
  Folder,
  Package,
  Layers,
  Tag,
  Star,
  Image,
  ShoppingCart,
  Users,
  Menu,
  X,
  Search,
  Plus,
  Edit,
  Trash2,
  ChevronDown,
} from "lucide-react";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import { ADMIN_CATEGORY_SHOW, ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";

const breadCrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: "", label: "Dashboard" },
];

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const sections = [
    { id: "categories", name: "Categories", icon: Folder, count: 24 },
    { id: "products", name: "Products", icon: Package, count: 156 },
    { id: "variants", name: "Product Variants", icon: Layers, count: 423 },
    { id: "coupons", name: "Coupons", icon: Tag, count: 18 },
    { id: "reviews", name: "Reviews", icon: Star, count: 89 },
    { id: "media", name: "Media", icon: Image, count: 567 },
    { id: "orders", name: "Orders", icon: ShoppingCart, count: 234 },
    { id: "customers", name: "Customers", icon: Users, count: 1.2 },
  ];

  const renderSectionContent = () => {
    const data = sectionData[activeSection] || [];

    return (
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {sections.find((s) => s.id === activeSection)?.name}
          </h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            <span>Add New</span>
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4 flex justify-between items-center">
            <div className="relative">
              <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex space-x-2">
              <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>All Status</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {data.length > 0 &&
                    Object.keys(data[0]).map(
                      (key) =>
                        key !== "id" && (
                          <th
                            key={key}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </th>
                        )
                    )}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    {Object.keys(item).map(
                      (key) =>
                        key !== "id" && (
                          <td
                            key={key}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                          >
                            {item[key]}
                          </td>
                        )
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Main content */}
      <div >
        <BreadCrumb breadCrumbData={breadCrumbData} />

        <main className="flex-1">
          <div className="">
            <div className=" px-4 sm:px-6 md:px-8">
              {/* Dashboard Overview */}
              {activeSection === "dashboard" && (
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                    {sections.map((section) => (
                      <div
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className="bg-white p-6 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <section.icon className="h-8 w-8 text-[#F89D89]" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">
                              {section.name}
                            </p>
                            <p className="text-2xl font-semibold text-gray-900">
                              {section.count}k
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section Content */}
              {activeSection !== "dashboard" && renderSectionContent()}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
