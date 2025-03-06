import React from "react";
import Upload from "./features/upload/upload";
import Transcriptions from "./features/Transcriptions/Transcriptions";
import Search from "./features/Search/Search";

function App() {
  return (
    <div className="h-screen bg-gradient-to-r from-red-200 to-yellow-200 flex flex-col items-center justify-center">
      {/* Feature row: Upload and Search side by side */}
      <div className="flex flex-row justify-center items-center gap-1 w-screen mb-8">
        <Search />
        <Upload />
      </div>
      {/* Transcriptions list spanning full width below */}
      <div className="w-full max-w-4xl">
        <Transcriptions />
      </div>
    </div>
  );
}

export default App;
