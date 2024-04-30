import axios from 'axios';

export default async function check(text: string) {
    try {
        const response = await axios.post('https://vector.profanity.dev', { message: text });
        return response.data;
    } catch (error) {
        console.error('Error checking profanity:', error);
        return { flaggedFor: [] };
    }
}
