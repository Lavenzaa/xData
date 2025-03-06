const API_BASE_URL = "http://localhost:8000"; // adjust as needed

// calls endpoint post/transcribe
export const transcribeApi = {
  uploadFiles: async (formData) => {
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
};
