async function postData(url = "", data = {}) {    const response = await fetch(url, {
    method: "POST",        headers: {
   "Content-Type": "application/json",        },
    body: JSON.stringify(data),    });
    return response.json();}

function wait(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
}
async function SpamVoucher() {
    var new_window = window.open('');
    var count = 0;
    new_window.document.write(`<h1> Bắt đầu lưu voucher </h1>`)
    while(true)
    {
        try
        {
            await wait(300);
            const data = await postData("/api/v2/voucher_wallet/save_voucher", {
                "voucher_promotionid": tempId, "signature": "tempSign",
                "signature_source": "0",
                });
            count++;
            var err = data.error;
            if(err == 0)
            {
                let date = new Date(data.data.voucher.collect_time * 1000); 
                var claimDate = date.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
                new_window.document.write(`<h2 style = "background-color: #00FF00;">[${claimDate}] Lưu thành công: ${data.data.voucher.voucher_code} - ${data.data.voucher.percentage_used}% đã sử dụng</h2>`);
                break;                   
            }
            else if(err == 5)
            {
                new_window.document.write(`<h2>[${count}]${data.error_msg}</h2>`);
                break;
            }
            else if(err == 14)
            {
                var invalidCode = data.data.invalid_message_code;
                var errMsg = data.error_msg;
                if(invalidCode == 4)
                {
                    new_window.document.write(`<h2>[${count}]${errMsg}</h2>`);
                    continue;
                }
                else
                {
                    new_window.document.write(`<h2>[${count}]${errMsg}</h2>`);
                    break;
                }
            }
            else if(err == 10002)
            {
                new_window.document.write(`<h2>Voucher không hợp lệ</h2>`);
                break;
            }
            else
            {
                new_window.document.write(`<h2>[${count}]${err} - Đã dính captcha =)))</h2>`);
                break;
            }    
        }
        catch(error)
        {
            new_window.document.write('Đã dính captcha =))');
            break;
        }
    }
}
SpamVoucher();