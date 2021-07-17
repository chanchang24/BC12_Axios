function sanPhamService() {
    this.layDSSP = function () {
        //Get : lay du lieu tu server tu phia backend
        // axios tra ve 1 promise
        return axios({
            url: 'https://60eea4afeb4c0a0017bf4558.mockapi.io/products',
            method: 'GET'
        });
    }
    this.themSP = function (sp) {//axios cung cap cho 1 cai data
        //POST : them moi du lieu
        return axios({
            url: 'https://60eea4afeb4c0a0017bf4558.mockapi.io/products',
            method: 'POST',
            data: sp,//them thuoc tinh data day len csdl
        })
    }
    this.xoaSP = function (id) {// truyền vào cái duy nhất
        //DELETE: xóa data thông qua id
        return axios({
            url: `https://60eea4afeb4c0a0017bf4558.mockapi.io/products/${id}`,
            method: 'DELETE',
        });
    }
    this.xemSP = function (id) {
        //GET: lấy data của 1 sản phầm dựa vào id
        return axios({
            url: `https://60eea4afeb4c0a0017bf4558.mockapi.io/products/${id}`,
            method: 'GET',
        })
    }
    this.capNhatSP = function (id,sp) {
        return axios({
            url:`https://60eea4afeb4c0a0017bf4558.mockapi.io/products/${id}`,
            method: 'PUT',
            data : sp,
        })
    }
    this.timKiemSP = function(dssp, chuoiTK){
        return dssp.filter(function(sp){
            return sp.tenSP.toLowerCase().indexOf(chuoiTK.toLowerCase()) !== -1;// khác -1 hoặc index
        })
    }
}