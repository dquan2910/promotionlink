async function postData(url = "", data = {}) {    const response = await fetch(url, {
    method: "POST",        headers: {
   "Content-Type": "application/json",        },
    body: JSON.stringify(data),    });
    return response.json();}
    postData("/api/v2/voucher_wallet/save_voucher", {
   "voucher_promotionid": tempId,   "signature": "tempSign",
   "signature_source": "0",
   }).then((data) => {
    var new_window = window.open('');
    if(data.error != 14)
    {
    let date = new Date(data.data.voucher.claim_end_time * 1000); 
   var claimEnd = date.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
   date = new Date(data.data.voucher.claim_start_time * 1000);
   var claimStart = date.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
   date = new Date(data.data.voucher.end_time * 1000); 
   var endTime = date.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
   date = new Date(data.data.voucher.start_time * 1000); 
   var startTime = date.toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
   var percent = data.data.voucher.discount_percentage;
   if(percent == "0")
    percent = "trực tiếp";
   else
    percent = percent +"%";
   var voucherCode = data.data.voucher.voucher_code;
   var percentUsed = data.data.voucher.percentage_used;
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
   var info = data.data.voucher.icon_text;
   var resultMsg = data.error_msg;
   if(resultMsg == "")
    resultMsg = "Lưu thành công";
   new_window.document.write(`<h1> ${voucherCode} - ${percentUsed}% đã sử dụng - ${resultMsg}</h1>`);
   new_window.document.write(`<h3>${discount_info}</h3>`);
   new_window.document.write(`<h3>Info: ${info}</h3>`);
   new_window.document.write(`<h3>Thời gian lưu: ${claimStart} - ${claimEnd}</h3>`);
   new_window.document.write(`<h3>Hiệu lực mã: ${startTime} - ${endTime}</h3>`);
   new_window.document.write("<a href=\"https://shopee.vn/user/voucher-wallet\"><button style=\"width: 100%; height: 100px; background-color:#fe5723; color: white; font-size: 35px;\"> Về ví voucher</button></a>");
    }
    else
    {
        new_window.document.write(`<h3>${tempId} - ${data.error_msg}</h3>`);
    }
   });