export const ExpenseReport = () => {
  return (
    <div className="w-full">
      <div className="">
        <table className="w-full table-fixed border border-gray-700">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Project Name
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Total Expense
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Monthly Expense
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Weekly Expense
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Daily Expense
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                ...
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};
