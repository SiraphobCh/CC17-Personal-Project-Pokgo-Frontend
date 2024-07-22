import axios from "../config/axios";

const eventApi = {};

eventApi.userEvent = () => axios.get("/user/event");
eventApi.createEvent = (body) => axios.post("user/create-event", body);
eventApi.deleteEvent = (id) => axios.delete(`user/delete-event/${id}`, id);
eventApi.getAllEvents = () => axios.get("/user/all-event");
eventApi.joinEvent = (id) => axios.post(`/event/join-event/${id}`);
eventApi.cancelEvent = (id) => axios.patch(`/event/cancel-event/${id}`);

export default eventApi;
