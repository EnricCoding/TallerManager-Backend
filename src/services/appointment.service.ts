// src/services/appointment.service.ts
import Appointment, { IAppointment } from "../models/Appointment.js";

/**
 * Creates a new appointment.
 * @param appointmentData - Partial data for creating an appointment.
 * @returns The newly created appointment.
 */
export const createAppointmentService = async (
  appointmentData: Partial<IAppointment>
): Promise<IAppointment> => {
  const appointment = new Appointment(appointmentData);
  return await appointment.save();
};

/**
 * Retrieves all appointments.
 * @returns An array of appointments.
 */
export const getAppointmentsService = async (): Promise<IAppointment[]> => {
  return await Appointment.find();
};

/**
 * Retrieves an appointment by its ID.
 * @param id - The appointment's ID.
 * @returns The appointment if found, otherwise null.
 */
export const getAppointmentByIdService = async (
  id: string
): Promise<IAppointment | null> => {
  return await Appointment.findById(id);
};

/**
 * Updates an appointment by its ID.
 * @param id - The appointment's ID.
 * @param updateData - Data to update in the appointment.
 * @returns The updated appointment if found, otherwise null.
 */
export const updateAppointmentService = async (
  id: string,
  updateData: Partial<IAppointment>
): Promise<IAppointment | null> => {
  return await Appointment.findByIdAndUpdate(id, updateData, { new: true });
};

/**
 * Deletes an appointment by its ID.
 * @param id - The appointment's ID.
 * @returns The deleted appointment if found, otherwise null.
 */
export const deleteAppointmentService = async (
  id: string
): Promise<IAppointment | null> => {
  return await Appointment.findByIdAndDelete(id);
};