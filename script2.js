async function postData(url = "", data = {}) {    const response = await fetch(url, {
    method: "POST",        headers: {
   "Content-Type": "application/json",        },
    body: JSON.stringify(data),    });
    return response.json();}
const listvoucher = [tempList];
var total = listvoucher.length;
var count = 0;
var new_window = window.open('');
new_window.document.write('<h1>Danh sách thực hiện lưu voucher:<h1>');
    for(const item of listvoucher) {
        var tempPos = item.indexOf(":");
        var id = item.substring(0, tempPos);
        var signature = item.substring(tempPos + 1);
        const data = await postData("/api/v2/voucher_wallet/save_voucher", {
            "voucher_promotionid": parseInt(id),   "signature": signature,
            "signature_source": "0",
            });
                if(data.error == 14)
                {
                    new_window.document.write(`<h2>${id} - ${data.error_msg}</h2>`);
                }
                else
                {
                    var resultMsg = data.error_msg;
                    if(resultMsg == "")
                    {
                        resultMsg = "Lưu thành công";
                        count++;
                    }
                    var percentUsed = data.data.voucher.percentage_used;
                    var voucherCode = data.data.voucher.voucher_code;
                    new_window.document.write(`<h2 style = "background-color: #00FF00;"> ${voucherCode} - ${percentUsed}% đã sử dụng - ${resultMsg}</h2>`);
                }
    }
    new_window.document.write(`<h1 style = "color: red;">Kết quả: ${count}/${total} voucher đã lưu thành công</h1>`);