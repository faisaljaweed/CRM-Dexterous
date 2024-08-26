export const ArchivedTask = () => {
  return (
    <div className="w-full">
      <div className="flex justify-between pb-3">
        <h1>Archived Task</h1>
      </div>
      <div className="">
        <table className="w-full table-fixed border border-gray-700">
          <thead>
            <tr>
              <th className="w-1/5 text-center border border-gray-700">
                Task Name{" "}
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Status
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Start Date
              </th>
              <th className="w-1/5 text-center border border-gray-700">
                Assing to
              </th>
              <th className="w-1/5 text-center border border-gray-700">Tag </th>
              <th className="w-1/5 text-center border border-gray-700">
                Status{" "}
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
};
