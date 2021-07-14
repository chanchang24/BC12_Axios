function sanPhamService(){
    this.layDSSP = function(){
        //Get : lay du lieu tu server tu phia backend
        // axios tra ve 1 promise
        return axios({
            url: 'https://60eea4afeb4c0a0017bf4558.mockapi.io/products',
            method: 'GET'
        });
    }
}