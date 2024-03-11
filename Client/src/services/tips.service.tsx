import axiosInstance from "./axios.service";

const tipsTable = 'Tips';

export default function TipsService() {
    
    interface Tips {
        id: number;
        name: string;
        description: string;
        category: string;
    }

    const getAllTips = async (): Promise<Tips[]> => {
        try {
            const response = await axiosInstance.get<Tips[]>(`/${tipsTable}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching Tipss:', error);
            throw error;
        }
    };

    const getAllTipsByCategory = async (category: string): Promise<Tips[]> => {
        try {
            const response = await axiosInstance.get<Tips[]>(`/${tipsTable}?category=eq.${category}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching Tipss:', error);
            throw error;
        }
    };


    const getTipsById = async (tipsId: number): Promise<Tips> => {
        try {
            const response = await axiosInstance.get<Tips>(`/${tipsTable}?id=eq.${tipsId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching Tips with id ${tipsId} :`, error);
            throw error;
        }
    };

    //rember to do a post, the infotmation must be like this:
    //{
    //  "id:" 1,
    //  "name": "..."
    //  ...
    // }

    const createTips = async (tipsData: Tips): Promise<Tips> => {
        try {
            const response = await axiosInstance.post<Tips>(`/${tipsTable}`, tipsData);
            return response.data;
        } catch (error) {
            console.error('Error creating Tips:', error);
            throw error;
        }
    };
    
    const updateTips = async (tipsId: number, tipsData: Tips): Promise<Tips> => {
        try {
            const response = await axiosInstance.patch<Tips>(`/${tipsTable}?id=eq.${tipsId}`, tipsData);
            return response.data;
        } catch (error) {
            console.error(`Error updating Tips with id ${tipsId} :`, error);
            throw error;
        }
    };

    const deleteTips = async (tipsId: number): Promise<void> => {
        try {
            await axiosInstance.delete(`/${tipsTable}?id=eq.${tipsId}`);
        } catch (error) {
            console.error(`Error deleting Tips with id ${tipsId} :`, error);
            throw error;
        }
    };

    return {
        getAllTips,
        getTipsById,
        createTips,
        updateTips,
        deleteTips
    };
}