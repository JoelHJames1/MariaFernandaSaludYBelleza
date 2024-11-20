import { create } from 'zustand';
import { 
  addDoc, 
  collection, 
  getDocs, 
  query, 
  where,
  serverTimestamp,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { format } from 'date-fns';

interface Appointment {
  id?: string;
  service: string;
  serviceDetails: any;
  date: Date;
  time: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  businessEmail: string;
  createdAt: Date;
}

interface AppointmentStore {
  appointments: Appointment[];
  loading: boolean;
  fetchAppointments: () => Promise<void>;
  createAppointment: (appointmentData: Omit<Appointment, 'id'>) => Promise<void>;
}

export const useAppointmentStore = create<AppointmentStore>((set) => ({
  appointments: [],
  loading: false,
  fetchAppointments: async () => {
    set({ loading: true });
    try {
      const querySnapshot = await getDocs(collection(db, 'appointments'));
      const appointments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        date: (doc.data().date as Timestamp).toDate(),
        createdAt: (doc.data().createdAt as Timestamp).toDate()
      })) as Appointment[];
      set({ appointments });
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  createAppointment: async (appointmentData) => {
    try {
      // Format the date for Firestore
      const firestoreData = {
        ...appointmentData,
        date: Timestamp.fromDate(appointmentData.date),
        createdAt: serverTimestamp()
      };

      // Add to Firestore
      const docRef = await addDoc(collection(db, 'appointments'), firestoreData);

      // Trigger Cloud Function for email notifications by adding a document to a separate collection
      await addDoc(collection(db, 'mail'), {
        to: [appointmentData.clientEmail, appointmentData.businessEmail],
        template: {
          name: 'appointment',
          data: {
            clientName: appointmentData.clientName,
            serviceName: appointmentData.service,
            date: format(appointmentData.date, 'PPP', { locale: require('date-fns/locale/es') }),
            time: appointmentData.time,
            price: appointmentData.serviceDetails.price
          }
        }
      });

      return docRef;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  }
}));