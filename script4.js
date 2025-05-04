async function postData(url = "", data = {}) {    const response = await fetch(url, {
    method: "POST",        headers: {
   "Content-Type": "application/json",        },
    body: JSON.stringify(data),    });
    return response.json();}
async function SaveVoucher() {
    const listvoucher = new Array();
    listvoucher[0] = new Array(tempList);
    listvoucher[1] = new Array(tempList);
var total = listvoucher.length;
var count = 0;
var new_window = window.open('');
new_window.document.body.write('<h1>Danh sách thực hiện lưu voucher:<h1>');
while(true)
{
    try
    {
        for(const item of listvoucher) {
            var tempPos = item[0].indexOf(":");
            var id = item.substring(0, tempPos);
            var signature = item.substring(tempPos + 1);
            await wait(200);
            const data = await postData("/api/v2/voucher_wallet/save_voucher", {
                "voucher_promotionid": id, "signature": signature,
                "signature_source": "0",
                });
            count++;
            var err = data.error;
            var errMsg = data.error_msg;
            if (err == 0)
            {
                let date = new Date(data.data.voucher.collect_time * 1000);
                var claimDate = date.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
                new_window.document.body.insertAdjacentHTML('afterbegin', `<h2 style="background-color: #00FF00;">[${claimDate}] Lưu thành công: ${data.data.voucher.voucher_code} - ${data.data.voucher.percentage_used}% đã sử dụng</h2>`);
                break;
            }
            else if (err == 5) //Đã lưu trước đó
            {
                new_window.document.body.insertAdjacentHTML('afterbegin', `<h2>[${count}]${data.error_msg}</h2>`);
                break;
            }
            else if (err == 14)
            {
            var invalidCode = data.data.invalid_message_code;
            if (invalidCode == 4)
            {
                new_window.document.body.insertAdjacentHTML('afterbegin', `<h2>[${count}]${errMsg}</h2>`);
                continue;
            }
            else if (invalidCode == 8) //Khung thời gian chưa bắt đầu
            {
                new_window.document.body.insertAdjacentHTML('afterbegin', `<h2>[${count}]${errMsg}</h2>`);
                continue;
            }
            else
            {
                new_window.document.body.insertAdjacentHTML('afterbegin', `<h2>[${count}]${errMsg}</h2>`);
                break;
            }
            }
            else if (err == 10002)
            {
                new_window.document.body.insertAdjacentHTML('afterbegin', '<h2>Voucher không hợp lệ</h2>');
                break;
            }
            else
            {
                new_window.document.body.insertAdjacentHTML('afterbegin', `<h2>[${count}]${err} - Đã dính captcha</h2>`);
                break;
            }
        }
    }
    catch (error)
    {
        new_window.document.body.insertAdjacentHTML('afterbegin', `<h2>Đã dính captcha</h2>`);
        break;
    }
}
    var savedCount = 0;
    new_window.document.body.insertAdjacentHTML('afterbegin',`<h1 style = "color: red;">Kết quả: ${savedCount}/${total} voucher đã lưu thành công</h1>`);
}
SaveVoucher();