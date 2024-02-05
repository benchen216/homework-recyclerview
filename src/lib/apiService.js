import axios from 'axios';

const API_BASE_URL = 'https://apiv2.vivipic.com/list-design';

export const fetchDesigns = async (pageIndex = null) => {
    try {
        const response = await axios.get(API_BASE_URL, {
            params: {
                token: '1',
                type: 'template',
                locale: 'tw',
                list_all: '1',
                list_category: '0',
                theme: '1',
                cache: 'true',
                platform: 'vivipic.com',
                ver: 'jsOSKd',
                page_index: pageIndex,
            },
        });
        console.log('Fetched designs:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch designs:', error);
        return null;
    }
};
