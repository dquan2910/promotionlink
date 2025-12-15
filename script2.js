async function postData(url = "", data = {}) {    const response = await fetch(url, {
    method: "POST",        headers: {
   "Content-Type": "application/json",        },
    body: JSON.stringify(data),    });
    return response.json();}
async function SaveVoucher() {
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
                    var minSpend = data.data.voucher.min_spend.toString();
                    if(minSpend.length == 1)
                        minSpend = minSpend + "₫";
                    else if(minSpend.length < 9)
                        minSpend = minSpend;
                    else
                        minSpend = minSpend.substring(0, minSpend.length - 8) + "K";
                    minSpend = " cho đơn từ " + minSpend;
                    var maxValue = data.data.voucher.reward_value.toString();
                    if(maxValue.length == 1)
                    {
                        maxValue = data.data.voucher.discount_value.toString();
                        if(maxValue.length == 1)
                            maxValue = data.data.voucher.reward_cap.toString();
                        if(maxValue.length == 1)
                            maxValue = data.data.voucher.discount_cap.toString();
                    }
                    if(maxValue.length == 1)
                        maxValue = "không giới hạn";
                    else if(maxValue.length < 9)
                        maxValue = maxValue.substring(0, maxValue.length - 5) + "₫";
                    else
                        maxValue = maxValue.substring(0, maxValue.length - 8) + "K";
                    var discount_info;
                        if(percent == "0")
                            discount_info = "Giảm" + maxValue + minSpend;
                        else
                        {
                            if(maxValue != "không giới hạn") maxValue = "tối đa " + maxValue;
                            discount_info = `Giảm ${percent} ${maxValue} ${minSpend}`;
                        }   
                    new_window.document.write(`<h2 style = "background-color: #00FF00;"> ${voucherCode} - ${discount_info}: ${percentUsed}% đã sử dụng - ${resultMsg}</h2>`);
                }
    }
    new_window.document.write(`<h1 style = "color: red;">Kết quả: ${count}/${total} voucher đã lưu thành công</h1>`);
    new_window.document.write("<a href=\"https://shopee.vn/user/voucher-wallet\"><button style=\"width: 100%; height: 100px; background-color:#fe5723; color: white; font-size: 35px;\"> Về ví voucher</button></a>");

}
SaveVoucher();