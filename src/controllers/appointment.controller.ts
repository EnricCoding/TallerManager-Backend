// src/controllers/appointment.controller.ts
import { Request, Response, NextFunction } from "express";
import Appointment, { IAppointment } from "../models/Appointment.js";

/*
  Note: In addition to the properties in your Appointment interface:
  
  export interface Appointment {
    id: string;
    clientId: string;
    workshopId: string;
    serviceId: string;
    mechanicId: string;
    date: Date;
    status: 'pending' | 'confirmed' | 'canceled' | 'completed';
    notes?: string;
  }

  We have added an optional property:
    reminderSent?: boolean;
  
  This property can be used to track whether a reminder notification has been sent.
*/

// Create a new appointment
export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // You can also perform validation and extra business logic here before saving
    const appointmentData: Partial<IAppointment> = req.body;
    const appointment = new Appointment(appointmentData);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    next(error);
  }
};

// Retrieve all appointments
export const getAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const appointments = await Appointment.find()
      .populate("clientId") // Adjust population keys if your model uses different names
      .populate("workshopId")
      .populate("serviceId")
      .populate("mechanicId");
    res.json(appointments);
  } catch (error) {
    next(error);
  }
};

// Retrieve a single appointment by ID
export const getAppointmentById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id)
      .populate("clientId")
      .populate("workshopId")
      .populate("serviceId")
      .populate("mechanicId");
    if (!appointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }
    res.json(appointment);
  } catch (error) {
    next(error);
  }
};

// Update an existing appointment
export const updateAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData: Partial<IAppointment> = req.body;
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      updatedData,
      { new: true }
    );
    if (!updatedAppointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }
    res.json(updatedAppointment);
  } catch (error) {
    next(error);
  }
};

// Delete an appointment
export const deleteAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedAppointment = await Appointment.findByIdAndDelete(id);
    if (!deletedAppointment) {
      res.status(404).json({ message: "Appointment not found" });
      return;
    }
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    next(error);
  }
};
