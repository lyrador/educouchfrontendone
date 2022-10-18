// axios
import axios from 'axios'
import BASE_URL from './baseUrl'

export const createRoom = async (creatorUsername, roomName, description, participants) => {
    try {
        const {data} = await axios.post(BASE_URL + '/api/v1/rooms', {creatorUsername, roomName, description, participants});
        return data;
    } catch(err) {
        console.log(err)
    }
}