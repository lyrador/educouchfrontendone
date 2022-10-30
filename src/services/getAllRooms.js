
// axios
import axios from 'axios'
import BASE_URL from './baseUrl'

export const getAllRooms = async () => {
    await axios.get(BASE_URL + `/api/v1/rooms/all`)
        .then(response => {
            return response;
        });
}