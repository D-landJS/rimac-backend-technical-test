export interface AppointmentConfirmationPublisher {
  publishConfirmation(appointmentId: string): Promise<void>;
}
