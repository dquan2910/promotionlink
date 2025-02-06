
async function postData(url = "", data = {}) {    const response = await fetch(url, {
    method: "POST",        headers: {
   "Content-Type": "application/json",        },
    body: JSON.stringify(data),    });
    return response.json();}
    postData("/api/v2/voucher_wallet/save_voucher", {
   "voucher_promotionid": tempId,   "signature": "tempSign",
   "signature_source": "0",
   }).then((data) => {    console.log(data);
   });