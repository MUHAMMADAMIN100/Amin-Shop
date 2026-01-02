export const getCategoryImage = (image?: string) => {
    if (!image) {
        return "https://via.placeholder.com/40";
    }
    return `${import.meta.env.VITE_APP_API_URL}/images/${image}`;
};
