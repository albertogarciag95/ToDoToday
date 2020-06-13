export interface User {
  name: string;
  userName: string;
  birthDate: Date;
  email: string;
  password: string;
  image: File,
  itineraries?: any[]
}
