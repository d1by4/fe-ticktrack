import { defineStore } from "pinia";
import { axiosInstance } from "@/plugins/axios";
import { handleError } from "@/helpers/errorHelper";
import router from "@/router";

export const useTicketStore = defineStore("tickets", {
  state: () => ({
    tickets: [],
    loading: false,
    error: null,
    success: null,
  }),

  actions: {
    async fetchTickets(params) {
      this.loading = true;

      try {
        const response = await axiosInstance.get("ticket", { params });
        this.tickets = response.data.data;
      } catch (error) {
        this.error = handleError(error);
      } finally {
        this.loading = false;
      }
    },

    async fetchTicket(code) {
      this.loading = true;

      try {
        const response = await axiosInstance.get(`/ticket/${code}`);

        return response.data.data;
      } catch (error) {
        this.error = handleError(error);
      } finally {
        this.loading = false;
      }
    },

    async createTicket(payload) {
      // TODO: Implement createTicket action
      // Steps:
      // 1. Set loading state
      // 2. Make API call to create ticket
      // 3. Set success message
      // 4. Redirect to dashboard
      // 5. Handle error
      // 6. Reset loading state
    },

    async createTicketReply(code, payload) {
      this.loading = true;

      try {
        const response = await axiosInstance.post(`/ticket-reply/${code}`, payload);

        this.success = response.data.message;
        return response.data.data;
      } catch (error) {
        this.error = handleError(error);
      } finally {
        this.loading = false;
      }
    },
  },
});
