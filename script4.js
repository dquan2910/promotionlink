async function postData(url = "", data = {}) {    const response = await fetch(url, {
    method: "POST",        headers: {
   "Content-Type": "application/json",        },
    body: JSON.stringify(data),    });
    return response.json();}
async function SaveVoucher() {
    const listId = [tempListId];
    const listSign = [tempListSign];
var total = listId.length;
var count = 0;
var savedCount = 0;
var new_window = window.open('');
new_window.document.write('<h2>Bắt đầu thực hiện lưu voucher:<h2>');
while(true)
{
    var loopLength = listId.length;
    if(loopLength == 0) break;
    try
    {
        for(let i = 0; i < loopLength; i++)
        {
            await wait(200);
            const data = await postData("/api/v2/voucher_wallet/save_voucher", {
                "voucher_promotionid": listId[i], "signature": listSign[i],
                "signature_source": "0",
                });
            count++;
            var err = data.error;
            var errMsg = data.error_msg;
            if (err == 0)
            {
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
                        maxValue = data.data.voucher.discount_value;
                        if(maxValue.length == 1)
                            maxValue = data.data.voucher.reward_cap;
                        if(maxValue.length == 1)
                            maxValue = data.data.voucher.discount_cap;
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
                        if(maxValue != "không giới hạn") maxValue = "tối đa" + maxValue;
                        discount_info = `Giảm ${percent} ${maxValue} ${minSpend}`;
                    }
                let date = new Date(data.data.voucher.collect_time * 1000);
                var claimDate = date.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
                new_window.document.body.insertAdjacentHTML('afterbegin', `<h2 style="background-color: #00FF00;">[${count}]${errMsg} ${data.data.voucher.voucher_code} - ${discount_info} - ${data.data.voucher.percentage_used}% đã sử dụng - ${claimDate}</h2>`);
                listId.slice(i,1);
                listSign.slice(i,1);
                i = i - 1;
            }
            else if (err == 5) //Đã lưu trước đó
            {
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
                        maxValue = data.data.voucher.discount_value;
                        if(maxValue.length == 1)
                            maxValue = data.data.voucher.reward_cap;
                        if(maxValue.length == 1)
                            maxValue = data.data.voucher.discount_cap;
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
                        if(maxValue != "không giới hạn") maxValue = "tối đa" + maxValue;
                        discount_info = `Giảm ${percent} ${maxValue} ${minSpend}`;
                    }
                let date = new Date(data.data.voucher.collect_time * 1000);
                var claimDate = date.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
                new_window.document.body.insertAdjacentHTML('afterbegin', `<h2 style="background-color: #00FF00;">[${count}]Lưu thành công: ${data.data.voucher.voucher_code} - ${discount_info} - ${data.data.voucher.percentage_used}% đã sử dụng - ${claimDate}</h2>`);
                savedCount = savedCount - 1;
                listId.slice(i,1);
                listSign.slice(i,1);
                i = i - 1;
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
                savedCount = savedCount - 1;
                listId.slice(i,1);
                listSign.slice(i,1);
                i = i - 1;
            }
            }
            else if (err == 10002)
            {
                new_window.document.body.insertAdjacentHTML('afterbegin', '<h2>Voucher không hợp lệ</h2>');
                savedCount = savedCount - 1;
                listId.slice(i,1);
                listSign.slice(i,1);
                i = i - 1;
            }
            else //Captcha
            {
                throw new Error("Đã dính captcha");
            }
        }
    }
    catch (error)
    {
        new_window.document.body.insertAdjacentHTML('afterbegin', `<h2>${error.message}</h2>`);
        break;
    }
}
    savedCount = total - listId.length + savedCount;
    new_window.document.body.insertAdjacentHTML('afterbegin',`<h1 style = "color: red;">Kết quả: ${savedCount}/${total} voucher đã lưu thành công</h1>`);
}
SaveVoucher();