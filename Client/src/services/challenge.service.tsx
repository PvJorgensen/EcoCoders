import axiosInstance from "./axios.service";

const challengeTable = 'Challenge';

export default function ChallengeService() {
    
    interface Challenge {
        id: number;
        name: string;
        description: string;
        longitude: number;
        latitude: number;
        date_start: Date;
        date_end: Date;
        id_user: number;
    }

    const getAllChallenges = async (): Promise<Challenge[]> => {
        try {
            const response = await axiosInstance.get<Challenge[]>(`/${challengeTable}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching Challenges:', error);
            throw error;
        }
    };


    const getChallengeById = async (ChallengeId: number): Promise<Challenge> => {
        try {
            const response = await axiosInstance.get<Challenge>(`/${challengeTable}?id=eq.${ChallengeId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching Challenge with id ${ChallengeId} :`, error);
            throw error;
        }
    };

    //rember to do a post, the infotmation must be like this:
    //{
    //  "id:" 1,
    //  "name": "..."
    //  ...
    // }

    const createChallenge = async (ChallengeData: Challenge): Promise<Challenge> => {
        try {
            const response = await axiosInstance.post<Challenge>(`/${challengeTable}`, ChallengeData);
            return response.data;
        } catch (error) {
            console.error('Error creating Challenge:', error);
            throw error;
        }
    };
    
    const updateChallenge = async (ChallengeId: number, ChallengeData: Challenge): Promise<Challenge> => {
        try {
            const response = await axiosInstance.patch<Challenge>(`/${challengeTable}?id=eq.${ChallengeId}`, ChallengeData);
            return response.data;
        } catch (error) {
            console.error(`Error updating Challenge with id ${ChallengeId} :`, error);
            throw error;
        }
    };

    const deleteChallenge = async (challengeId: number): Promise<void> => {
        try {
            await axiosInstance.delete(`/${challengeTable}?id=eq.${challengeId}`);
        } catch (error) {
            console.error(`Error deleting challenge with id ${challengeId} :`, error);
            throw error;
        }
    };

    return {
        getAllChallenges,
        getChallengeById,
        createChallenge,
        updateChallenge,
        deleteChallenge
    };
}