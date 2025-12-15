import { AgencyContact, AgencyContactResponse } from '@/types/agency';

//const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost/dolce-samui/backend/api';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://dolcevillasamui.com/backend/api';


export class AgencyService {
  /**
   * สร้าง agency contact ใหม่
   */
  static async createAgencyContact(
    contact: Omit<AgencyContact, 'id' | 'createdAt'>
  ): Promise<AgencyContactResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/agency-contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: contact.firstName,
          lastName: contact.lastName,
          agencyName: contact.agencyName,
          details: contact.details || '',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating agency contact:', error);
      throw error;
    }
  }

  /**
   * ดึงข้อมูล agency contacts ทั้งหมด
   */
  static async getAllAgencyContacts(): Promise<AgencyContactResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/agency-contacts`);

      if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูล');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching agency contacts:', error);
      throw error;
    }
  }

  /**
   * ดึงข้อมูล agency contact ตาม ID
   */
  static async getAgencyContactById(id: number): Promise<AgencyContactResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/agency-contacts/${id}`);

      if (!response.ok) {
        throw new Error('เกิดข้อผิดพลาดในการดึงข้อมูล');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching agency contact:', error);
      throw error;
    }
  }
}

