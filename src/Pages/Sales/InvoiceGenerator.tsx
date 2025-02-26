import { useLocation } from "react-router-dom";
import logo from "../../Images/logo.webp";
const InvoiceGenerator = () => {
  // const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const user = location.state;
  return (
    <div>
      <div className="flex items-center justify-center">
        <img className="w-32 h-32" src={logo} />
      </div>
      <div className="flex flex-col items-start justify-start p-6 bg-white shadow-md rounded-lg mb-2">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Invoice To</h2>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
        <p className="text-gray-700 mb-1">
          <span className="font-medium">ID:</span> {user.id}
        </p>
        <p className="text-gray-700 mb-1">
          <span className="font-medium">Address:</span> {user.address}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Contact:</span> {user.contact}
        </p>
      </div>

      <table>
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              ITEM CODE
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600 w-1/2">
              DESCRIPTION
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              PRICE
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">
              AMOUNT
            </th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          <tr className="hover:bg-gray-100">
            <td className="px-4 py-2 text-sm text-gray-900">{user.id}</td>
            <td className="px-4 py-2 text-sm text-gray-900">{user.name}</td>
            <td className="px-4 py-2 text-sm text-gray-900">{user.amount}</td>
            <td className="px-4 py-2 text-sm text-gray-900">{user.address}</td>
          </tr>
        </tbody>
      </table>

      <ul className="space-y-2 text-gray-700">
        <li className="flex justify-between px-4 py-2 text-sm border-b border-gray-200">
          <span>Sub total</span>
          <span>{user.address}</span>
        </li>
        <li className="flex justify-between px-4 py-2 text-sm border-b border-gray-200">
          <span>Processing fees</span>
          <span>$10.00</span>
        </li>
        <li className="flex justify-between px-4 py-2 text-sm border-b border-gray-200">
          <span>Tax</span>
          <span>$43.50</span>
        </li>
        <li className="flex justify-between px-4 py-2 text-sm font-bold">
          <span>Grand Total</span>
          <span>${(parseFloat(user.amount) + 10.0 + 43.5).toFixed(2)}</span>
        </li>
      </ul>

      {/* Add your invoice generation logic here */}
    </div>
  );
};

export default InvoiceGenerator;
