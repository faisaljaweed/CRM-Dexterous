export const EmployeeSalaryList = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <h2>Employee Salary List</h2>
      </div>
      <div className="">
        <table className="w-full table-fixed border border-gray-700">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Name
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Position
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Account Number
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Baasic
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Highest
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Overtime
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
