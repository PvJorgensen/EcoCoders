import axiosInstance from "./axios.service";

const greenPointTable = 'GreenPoint';

export default function GreenPointService() {

    interface GreenPoint {
        id: number; 
        name: string;
        longitude: number;
        latitude: number; 
        opening: number; //In typeScript there is no TimeStamp, so we have to use number
        closing: number; //In typeScript there is no TimeStamp, so we have to use number
    }

    const getAllGreenPoints = async (): Promise<GreenPoint[]> => {
        try {
            const response = await axiosInstance.get<GreenPoint[]>(`/${greenPointTable}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching GreenPoints:', error);
            throw error;
        }
    };


    const getGreenPointById = async (GreenPointId: number): Promise<GreenPoint> => {
        try {
            const response = await axiosInstance.get<GreenPoint>(`/${greenPointTable}?id=eq.${GreenPointId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching GreenPoint with id ${GreenPointId} :`, error);
            throw error;
        }
    };

    //rember to do a post, the infotmation must be like this:
    //{
    //  "id:" 1,
    //  "name": "..."
    //  ...
    // }

    const createGreenPoint = async (GreenPointData: GreenPoint): Promise<GreenPoint> => {
        try {
            const response = await axiosInstance.post<GreenPoint>(`/${greenPointTable}`, GreenPointData);
            return response.data;
        } catch (error) {
            console.error('Error creating GreenPoint:', error);
            throw error;
        }
    };
    
    const updateGreenPoint = async (GreenPointId: number, GreenPointData: GreenPoint): Promise<GreenPoint> => {
        try {
            const response = await axiosInstance.patch<GreenPoint>(`/${greenPointTable}?id=eq.${GreenPointId}`, GreenPointData);
            return response.data;
        } catch (error) {
            console.error(`Error updating GreenPoint with id ${GreenPointId} :`, error);
            throw error;
        }
    };

    const deleteGreenPoint = async (GreenPointId: number): Promise<void> => {
        try {
            await axiosInstance.delete(`/${greenPointTable}?id=eq.${GreenPointId}`);
        } catch (error) {
            console.error(`Error deleting GreenPoint with id ${GreenPointId} :`, error);
            throw error;
        }
    };

    return {
        getAllGreenPoints,
        getGreenPointById,
        createGreenPoint,
        updateGreenPoint,
        deleteGreenPoint
    };
}