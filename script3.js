async function postData(url = "", data = {}) {    const response = await fetch(url, {
    method: "POST",        headers: {
   "Content-Type": "application/json",        },
    body: JSON.stringify(data),    });
    return response.json();}

async function SpamVoucher() {
    var new_window = window.open('');
    while(true)
    {
        try
        {
            const data = await postData("/api/v2/voucher_wallet/save_voucher", {
                "voucher_promotionid": tempId,   "signature": "tempSign",
                "signature_source": "0",
                });
                data.error
        }
        catch(error)
        {
            new_window.document.write('Đã dính captcha =))');
            break;
        }
    }
}
SpamVoucher();