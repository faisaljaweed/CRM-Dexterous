export const DealingInfo = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <h2>Dealing Information</h2>
      </div>

      <div className="">
        <table className="w-full table-fixed border border-gray-700">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Owner Name
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Deals Attened
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Deals Win
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Deals Lost
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Total Deals Value
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Avg Deals Value
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Rank
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
