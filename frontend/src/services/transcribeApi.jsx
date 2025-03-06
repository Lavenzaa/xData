const API_BASE_URL = "http://localhost:8000"; // adjust as needed

export const transcribeApis = {
  postTranscribe: async (formData) => {
    const response = await fetch(`${API_BASE_URL}/transcribe`, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Upload failed");
    }
    return response.json();
  },

  getTranscriptions: async () => {
    const response = await fetch(`${API_BASE_URL}/transcriptions`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to fetch transcriptions");
    }
    return response.json();
  },

  // Future: searchTranscriptions: async (filename) => { ... }
};
