
export const getProductImage = (image?: string) => {
    if (!image) {
        return 'https://via.placeholder.com/300x200?text=No+Image';
    }

    return `${import.meta.env.VITE_APP_API_URL}/${image}`;
};
