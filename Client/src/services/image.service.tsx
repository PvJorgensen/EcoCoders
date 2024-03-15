import axiosInstance from "./axios.service";

export default function ImageService() {

    const insertImage = async (image: File) => {
        try {
            const response = await axiosInstance.post('storage/v1/object/imagr', image)
        } catch (error) {
            console.log(error);
        }
    }


}