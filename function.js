function copy() {
    let textarea = document.getElementById("bodycode");
    if(textarea.value == "")
    {
        document.getElementById("thongbao").innerHTML = "Chưa có code copy làm chi :v";
    }
    else
    {
        textarea.select();
        document.execCommand("copy");
        document.getElementById("thongbao").innerHTML = "Đã copy!!!";
    }      
  }

  function change1(){
    if(document.getElementById("promolink").value == "")
    {
        document.getElementById("thongbao").innerHTML = "Vui lòng điền link.";
    }
    else    
    {
        var promolink = document.getElementById("promolink").value;
        var posOfPromotionId = promolink.indexOf("&promotionId=");
        var posOfSignature = promolink.indexOf("&signature=");
        if(posOfPromotionId == -1 || posOfSignature == -1){
            document.getElementById("thongbao").innerHTML = "Đường dẫn có vẻ sai, vui lòng điền lại";
        }
        else
        {
            var promotionId = promolink.substring(posOfPromotionId + 13, posOfSignature);
            var signature =  (promolink.substring(posOfSignature + 11)).substring(0,64);
            document.getElementById("thongbao").innerHTML = "";
            var bodyCode = "{\n\t\"voucher_promotionid\":" + promotionId + ",\n\t\"signature\":\"" + signature + "\",\n\t\"signature_source\":\"0\"\n}";
            
            document.getElementById("bodycode").value = bodyCode;
        }
    }   
  }
  function change2(){
    if(document.getElementById("promolink").value == "")
    {
        document.getElementById("thongbao").innerHTML = "Vui lòng điền link.";
    }
    else    
    {
        var promolink = document.getElementById("promolink").value;
        var posOfPromotionId = promolink.indexOf("&promotionId=");
        var posOfSignature = promolink.indexOf("&signature=");
        if(posOfPromotionId == -1 || posOfSignature == -1){
            document.getElementById("thongbao").innerHTML = "Đường dẫn có vẻ sai, vui lòng điền lại";
        }
        else
        {
            var promotionId = promolink.substring(posOfPromotionId + 13, posOfSignature);
            var signature =  (promolink.substring(posOfSignature + 11)).substring(0,64);
            document.getElementById("thongbao").innerHTML = "";
            var bodyCode = "async function postData(url = \"\", data = {}) {    const response = await fetch(url, {\n method: \"POST\",        headers: {\n\"Content-Type\": \"application/json\",        },\n body: JSON.stringify(data),    });\n return response.json();}\n postData(\"/api/v2/voucher_wallet/save_voucher\", {\n\"voucher_promotionid\": " + promotionId +",   \"signature\": \"" + signature +"\",\n\"signature_source\": \"0\",    \"security_device_fingerprint\": sessionStorage[\'shopee_webUnique_ccd\'].replace(/\\\"/gi, \'\'),\n}).then((data) => {    console.log(data);\n});";
            document.getElementById("bodycode").value = bodyCode;
        }
    }   
  }
  function change3(){
    if(document.getElementById("promolink").value == "")
    {
        document.getElementById("thongbao").innerHTML = "Vui lòng điền link.";
    }
    else    
    {
        var promolink = document.getElementById("promolink").value;
        var posOfPromotionId = promolink.indexOf("&promotionId=");
        var posOfSignature = promolink.indexOf("&signature=");
        if(posOfPromotionId == -1 || posOfSignature == -1){
            document.getElementById("thongbao").innerHTML = "Đường dẫn có vẻ sai, vui lòng điền lại";
        }
        else
        {
            var promotionId = promolink.substring(posOfPromotionId + 13, posOfSignature);
            var signature =  (promolink.substring(posOfSignature + 11)).substring(0,64);
            document.getElementById("thongbao").innerHTML = "";
            var bodyCode = promotionId +":"+signature;
            document.getElementById("bodycode").value = bodyCode;
        }
    }   
  }
  function reset()
  {
      document.getElementById("promolink").value = "";
      document.getElementById("bodycode").value = "";
document.getElementById("thongbao").innerHTML = "";
  }
