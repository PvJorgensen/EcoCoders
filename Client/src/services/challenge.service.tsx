import axiosInstance from "./axios.service";

const challengeTable = 'Challenge';
const userJoinChallengeTable = 'UserChallenge';

export default function ChallengeService() {
    
    interface Challenge {
        id: number;
        name: string;
        description: string;
        longitude: number;
        latitude: number;
        date_start: number; //In typeScript there is no TimeStamp, so we have to use number
        date_end: number; //In typeScript there is no TimeStamp, so we have to use number
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


    // Find The challenges from a user
    const getChallengesByUserId = async (userId: number): Promise<Challenge[]> => {
        try {
            const response = await axiosInstance.get<Challenge[]>(`/${userJoinChallengeTable}?id_user=eq.${userId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching challenges for user with id ${userId} :`, error);
            throw error;
        }
    };

    // Find The challenges from a user
    const getUsersInOneChallenge = async (challengeId: number): Promise<Challenge[]> => {
        try {
            const response = await axiosInstance.get<Challenge[]>(`/${userJoinChallengeTable}?id_challenge=eq.${challengeId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching users for challenge with id ${challengeId} :`, error);
            throw error;
        }
    };

    // Join a Challenge
    const joinChallenge = async (userId: number, challengeId: number): Promise<void> => {
        try {
            const userChallengeData = { id_user: userId, id_challenge: challengeId };
            await axiosInstance.post(`/${userJoinChallengeTable}`, userChallengeData);
        } catch (error) {
            console.error(`Error joining challenge with id ${challengeId} :`, error);
            throw error;
        }
    };

    // Leave a Challenge
    const leaveChallenge = async (userId: number, challengeId: number): Promise<void> => {
        try {
            await axiosInstance.delete(`/${userJoinChallengeTable}?id_user=eq.${userId}&id_challenge=eq.${challengeId}`);
        } catch (error) {
            console.error(`Error leaving challenge with id ${challengeId} :`, error);
            throw error;
        }
    };

    return {
        getAllChallenges,
        getChallengeById,
        createChallenge,
        updateChallenge,
        deleteChallenge,
        getUsersInOneChallenge,
        getChallengesByUserId,
        joinChallenge,
        leaveChallenge
    };
}