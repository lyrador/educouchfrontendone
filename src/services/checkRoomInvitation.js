// axios
import axios from 'axios'
import BASE_URL from './baseUrl'

export const checkRoomInvitation = async (id, password) => {
    await axios.get(BASE_URL + `/api/v1/rooms/${id}/${password}`)
        .then(response => {
            return response;
        });
}

