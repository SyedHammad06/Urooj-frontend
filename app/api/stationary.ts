import axios from 'axios';

const BASE_URL = 'http://147.93.102.224:5000/api/Stationary';

export const getAllStationary = async () => {
    try {
        const res = await axios.get(`${BASE_URL}/GetAll`);
        return res.data;
    } catch (error) {
        console.error('Error fetching stationery:', error);
        throw error;
    }
};

export const addStationary = async (body: unknown, token: string | null) => {
    try {
        const res = await axios.post(`${BASE_URL}/Add`, body, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.error('Error adding stationery:', error);
        throw error;
    }
};

export const deleteStationary = async (
    stationaryId: number,
    token: string | null
) => {
    try {
        const res = await axios.post(
            `${BASE_URL}/Remove?stationaryId=${stationaryId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        return res;
    } catch (error) {
        console.error('Error deleting stationery:', error);
        throw error;
    }
};

export const updateStationary = async (
    updatedData: unknown,
    token: string | null
) => {
    try {
        const res = await axios.post(`${BASE_URL}/Update`, updatedData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        console.error('Error updating stationery:', error);
        throw error;
    }
};
