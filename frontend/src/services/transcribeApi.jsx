const API_BASE_URL = "http://localhost:8000";

export const transcribeApis = {
  // For calling the post/transcribe endpoint
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

  // For calling the get/transcriptions endpoint
  getTranscriptions: async () => {
    const response = await fetch(`${API_BASE_URL}/transcriptions`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to fetch transcriptions");
    }
    return response.json();
  },

  // For calling the get/search endpoint
  searchTranscriptions: async (filename) => {
    const response = await fetch(
      `${API_BASE_URL}/search?filename=${encodeURIComponent(filename)}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to fetch search results");
    }
    return response.json();
  },
};
