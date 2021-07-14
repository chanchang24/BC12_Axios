
var sanPhamService = new sanPhamService();
function getEle(id){
    return document.getElementById(id);
}


var layDanhSachSP = function(){
    sanPhamService.layDSSP().then(function(result){// result là mảng lấy từ promise trả về
        // console.log(result.data);
        //render Table
        renderTable(result.data);// result.data là 1 cái mảng

    }).catch(function(error){
        console.log(error);// something was wrong
    })
}
 layDanhSachSP();
function renderTable(mangSP){
    var content = '';
    mangSP.map(function(sp, index){
        content += `
            <tr>
                <td>${index+1}</td>
                <td>${sp.tenSP}</td>
                <td>${sp.gia}</td>
                <td>
                    <img style="width:80px; heigh:80px" src="${sp.hinhAnh}" />
                </td>
                <td>${sp.moTa}</td>
                <td>
                    <button class="btn btn-danger">Xoá</button>
                    <button class="btn btn-success">Xem</button>
                </td>
            </tr>
        `;
    })
    getEle('tblDanhSachSP').innerHTML = content
}