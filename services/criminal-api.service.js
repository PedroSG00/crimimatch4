const axios = require('axios')

class ApiService {

    constructor() {

        // this.fetchApp = fetch('https://api.fbi.gov/wanted/v1/list')
        //     .then(res => res.json())

    }

    getAllCriminals = () => {
        console.log(getAllCriminals)
        return this.fetchApp.get('/wanted/api')
    }

    getOneCriminal = () => {
        return this.fetchApp.get(`/wanted/api/${ciminalId}`)
    }
}

module.exports = ApiService