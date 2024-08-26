export const AllTransaction = () => {
  return (
    <div className="w-full">
      <div className="">
        <table className="w-full table-fixed border border-gray-700">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Name
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Date
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Account
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Account Number
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Transaction ID
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Amount
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                . . .
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};
