export const Attandence = () => {
  const attendance = 0;
  return (
    <div className="w-full">
      <div className="flex justify-between pb-3">
        <div className="flex justify-start flex-col items-start">
          <h2 className="text-xl">Expense Attedance History</h2>
          <p>You have total {attendance} employee's </p>
        </div>
      </div>
      <div>
        <table className="w-full table-fixed border border-gray-700">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700">ID</th>
              <th className="w-1/5 text-center border border-gray-700">Date</th>
              <th className="w-1/5 text-center border border-gray-700">
                InTime
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                OutTime
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Hours
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="w-1/5 text-center text-[12px] border border-gray-700">
                EMP-09
              </td>
              <td className="w-1/5 text-center text-[12px] border border-gray-700">
                14 Jan 2024
              </td>
              <td className="w-1/5 text-center text-[12px] border border-gray-700">
                09:56
              </td>
              <td className="w-1/5 text-center text-[12px] border border-gray-700">
                18:26
              </td>
              <td className="w-1/5 text-center text-[12px] border border-gray-700">
                08:30
              </td>
              <td className="w-1/5 text-center text-[12px] border border-gray-700">
                Present
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
