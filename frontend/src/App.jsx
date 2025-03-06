import React, { useState } from "react";
import Upload from "./features/upload/upload";
import Transcriptions from "./features/transcriptions/transcriptions";
import Search from "./features/Search/Search";
import TranscriptionsTable from "./components/transcriptionsTable";

function App() {
  const [tableData, setTableData] = useState([]);
  return (
    <div className="h-screen bg-gradient-to-r from-red-200 to-yellow-200 flex flex-col items-center justify-center">
      {/* Feature row: Upload and Search side by side */}
      <h1 className="pb-5 font-bold font-mono whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-900">
        xData Technical Test
      </h1>
      <div className="flex flex-row justify-center items-center gap-1 w-screen mb-8">
        <Upload />
        <Search setTableData={setTableData} />
        <span class="bg-white rounded-4xl">
          <Transcriptions setTableData={setTableData} />
        </span>
      </div>
      <div className="w-3/4">
        {tableData.length > 0 && <TranscriptionsTable data={tableData} />}
      </div>
    </div>
  );
}

export default App;
