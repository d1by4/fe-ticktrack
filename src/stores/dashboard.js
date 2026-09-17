// TODO: Import necessary dependencies
// Hint: You'll need pinia, axios, and error helper
import { defineStore } from "pinia";
import { axiosInstance } from "@/plugins/axios";
import { handleError } from "@/helpers/errorHelper";

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    // TODO: Define your state properties
    // Hint: You'll need statistic, loading, error, and success states
    statistic: null,
    loading: false,
    error: null,
    success: null,
  }),

  actions: {
    async fetchStatistics() {
      this.loading = true;

      try {
        const response = await axiosInstance.get("dashboard/statistics");

        console.log("Full API response:", response);
        console.log("Response data:", response.data);
        console.log("Statistics:", response.data.data);

        this.statistic = response.data.data;

        return response.data.data;
      } catch (error) {
        console.error("Fetch statistics failed:", error);
        console.error("API error response:", error.response?.data);
        this.error = handleError(error);
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
