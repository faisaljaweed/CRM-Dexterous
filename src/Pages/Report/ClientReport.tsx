export const ClientReport = () => {
  return (
    <div className="w-full">
      <div className="">
        <table className="w-full table-fixed border border-gray-700">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Clients
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Projects
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Phone
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Country
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Payment
              </th>
              <th className="w-1/5 text-center border border-gray-700 text-[12px]">
                Status
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
