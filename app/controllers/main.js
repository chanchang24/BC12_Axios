
var sanPhamService = new sanPhamService();
function getEle(id) {
    return document.getElementById(id);
}


var layDanhSachSP = function () {
    sanPhamService.layDSSP().then(function (result) {// result là mảng lấy từ promise trả về
        // console.log(result.data);
        //render Table
        renderTable(result.data);// result.data là 1 cái mảng
        setLocalStorage(result.data);
    }).catch(function (error) {
        console.log(error);// something was wrong
    })
}
layDanhSachSP();

var themSanPham = function () {
    
    //lay thong tin nhap tu form
    var tenSP = getEle('TenSP').value;
    var gia = getEle('GiaSP').value;
    var hinhAnh = getEle('HinhSP').value;
    var moTa = getEle('moTa').value;

    //khoi tao doi tuong sp tu lop doi tuong san pham
    var sp = new SanPham(tenSP, gia, hinhAnh, moTa);

    //Goi API de luu data xuong csdl(database)
    sanPhamService.themSP(sp).then(function (result) {
        layDanhSachSP();
    }).catch(function (error) {
        console.log(error);
    })
}
getEle('btnThemSP').addEventListener('click', function () {
    getEle('formSP').reset();
    var modalFooter = document.querySelector('.modal-footer');
    modalFooter.innerHTML = `<button class =" btn btn-success" onclick="themSanPham()"> Thêm sản phẩm</button>`
})

//Xoa san pham
var xoaSanPham = function (id) {
    sanPhamService.xoaSP(id).then(function () {
        //load lai danh sach san pham sau khi xoa thanh cong
        layDanhSachSP();
    }).catch(function (error) {
        console.log(error);
    })
}
var capNhatSanPham = function (id) {
    var tenSP = getEle('TenSP').value;
    var gia = getEle('GiaSP').value;
    var hinhAnh = getEle('HinhSP').value;
    var moTa = getEle('moTa').value;

    //khoi tao doi tuong sp tu lop doi tuong san pham
    var sp = new SanPham(tenSP, gia, hinhAnh, moTa);

    //Cap nhat thong tin moi
    sanPhamService.capNhatSP(id , sp).then(function(result){
        layDanhSachSP();
        //An modal sau khi cap nhat
        document.querySelector('#myModal .close').click();
    }).catch(function (error) {
        console.log(error);
    })
}

var xemSanPham = function (id) {

    sanPhamService.xemSP(id).then(function (result) {
        console.log(result.data);
        var sp = result.data;
        console.log(sp.id);
        //Mở modal
        getEle('btnThemSP').click();//dom tới button click sẽ mở lên
        //JQuery
        // $('#myModal').modal('show');
        //Đổ data lên form
        getEle('TenSP').value = sp.tenSP;
        getEle('GiaSP').value = sp.gia;
        getEle('HinhSP').value = sp.hinhAnh;
        getEle('moTa').value = sp.moTa;
        
        //Them button cập nhật cho form
        var modalFooter = document.querySelector('.modal-footer')
        modalFooter.innerHTML = `<button class =" btn btn-success" onclick="capNhatSanPham('${sp.id}')">Cập nhật</button>`;



    }).catch(function (error) {
        console.log(error);
    })
}

getEle('ipTimKiem').addEventListener('keyup', function(){
    var mangSP = getLocalStorage();
    var chuoiTK = getEle('ipTimKiem').value;
    var mangTK = sanPhamService.timKiemSP(mangSP,chuoiTK);
    renderTable(mangTK);

})
function renderTable(mangSP) {
    var content = '';
    mangSP.map(function (sp, index) {
        content += `
            <tr>
                <td>${index + 1}</td>
                <td>${sp.tenSP}</td>
                <td>${sp.gia}</td>
                <td>
                    <img style="width:80px; heigh:80px" src="${sp.hinhAnh}" />
                </td>
                <td>${sp.moTa}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaSanPham('${sp.id}')">Xoá</button>
                    <button class="btn btn-success" onclick="xemSanPham('${sp.id}')">Xem</button>
                </td>
            </tr>
        `;
    })
    getEle('tblDanhSachSP').innerHTML = content
}
function setLocalStorage(dssp) {
    localStorage.setItem('DSSP', JSON.stringify(dssp));
}
function getLocalStorage() {
    if (localStorage.getItem('DSSP')) {
        return JSON.parse(localStorage.getItem('DSSP'));
    }

}