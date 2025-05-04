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
//Lưu bằng Postman
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
//Lưu bình thường (không hiện UI) Javascript
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
            var bodyCode = "async function postData(url = \"\", data = {}) {    const response = await fetch(url, {\n method: \"POST\",        headers: {\n\"Content-Type\": \"application/json\",        },\n body: JSON.stringify(data),    });\n return response.json();}\n postData(\"/api/v2/voucher_wallet/save_voucher\", {\n\"voucher_promotionid\": " + promotionId +",   \"signature\": \"" + signature +"\",\n\"signature_source\": \"0\",\n}).then((data) => {    console.log(data);\n});";
            if(document.getElementById("bodycode").value.indexOf("async") == 0 && document.getElementById("bodycode").value.indexOf(promotionId) != -1)
            {
                bodyCode = "avascript: " + bodyCode
            }
            document.getElementById("bodycode").value = bodyCode;
        }
    }   
  }
//Lưu bằng BOT
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
//Lưu bằng Javascript có UI
  function change4(){
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
            var bodyCode = 
    `fetch('https://dquan2910.github.io/promotionlink/script.js')
.then(response => response.text())
.then(scriptContent => {
var finalScript = scriptContent.replace('tempId', '${promotionId}').replace('tempSign', '${signature}');
var s = document.createElement('script'); s.type = 'text/javascript';
s.text = finalScript;
document.head.appendChild(s);
});`;
            bodyCode = checkCheckedBox(bodyCode);
            document.getElementById("bodycode").value = bodyCode;
        }
    }   
  }
 //Lưu thường (Nhiều link)
  function change5(){
    if(document.getElementById("promolink").value == "")
    {
        document.getElementById("thongbao").innerHTML = "Vui lòng điền link.";
    }
    else    
    {
        var promolink = document.getElementById("promolink").value;
        var stringList = "";
        var listVoucher = promolink.split(',');
        var errList = "";
        var count = 0;
        var test = "";
        var listLength = listVoucher.length;
        for (i = 0; i < listLength; i++)
        {
            
            var linkVoucher = listVoucher[i].trim();
            var posOfPromotionId = linkVoucher.indexOf("&promotionId=");
            var posOfSignature = linkVoucher.indexOf("&signature=");
            if(posOfPromotionId == -1 || posOfSignature == -1)
            {                
                if(errList.length != 0) errList = errList + ", ";
                var posOfLink = i + 1;
                errList = errList + "Link " + posOfLink;
                count++;
                continue;
            }
            else
            {
                if(stringList.length != 0) stringList = stringList + ", ";
                var promotionId = linkVoucher.substring(posOfPromotionId + 13, posOfSignature);
                var signature =  (linkVoucher.substring(posOfSignature + 11)).substring(0,64);
                var code = '"' + promotionId + ":" + signature + '"';
                stringList = stringList + code;
            }
        }
        if(count != listLength)
            {
                if(count > 0)
                {
                    errList = errList + " sai nên không thêm vào list";
                    document.getElementById("thongbao").innerHTML = errList;
                }
                else 
                {
                    document.getElementById("thongbao").innerHTML = "";
                }
                var bodyCode =
                `fetch('https://dquan2910.github.io/promotionlink/script2.js')
                .then(response => response.text())
                .then(scriptContent => {
                var finalScript = scriptContent.replace('tempList', '${stringList}');
                var s = document.createElement('script'); s.type = 'text/javascript';
                s.text = finalScript;
                document.head.appendChild(s);
                });`;
                bodyCode = checkCheckedBox(bodyCode);
                document.getElementById("bodycode").value = bodyCode;
            }
            else
            {
                document.getElementById("thongbao").innerHTML = "Tất cả link voucher đều sai!!!";
            }
    }   
  }
  //Spam lưu (1 link)
  function change6(){
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
            var bodyCode = 
    `fetch('https://dquan2910.github.io/promotionlink/script3.js')
.then(response => response.text())
.then(scriptContent => {
var finalScript = scriptContent.replace('tempId', '${promotionId}').replace('tempSign', '${signature}');
var s = document.createElement('script'); s.type = 'text/javascript';
s.text = finalScript;
document.head.appendChild(s);
});`;
            bodyCode = checkCheckedBox(bodyCode);
            document.getElementById("bodycode").value = bodyCode;
        }
    }   
  }
  //Spam lưu (Nhiều link)
  function change7(){
    if(document.getElementById("promolink").value == "")
    {
        document.getElementById("thongbao").innerHTML = "Vui lòng điền link.";
    }
    else    
    {
        var promolink = document.getElementById("promolink").value;
        var stringListId = "";
        var stringListSign = "";
        var listVoucher = promolink.split(',');
        var errList = "";
        var count = 0;
        var listLength = listVoucher.length;
        for (i = 0; i < listLength; i++)
        {
            var linkVoucher = listVoucher[i].trim();
            var posOfPromotionId = linkVoucher.indexOf("&promotionId=");
            var posOfSignature = linkVoucher.indexOf("&signature=");
            if(posOfPromotionId == -1 || posOfSignature == -1)
            {                
                if(errList.length != 0) errList = errList + ", ";
                var posOfLink = i + 1;
                errList = errList + "Link " + posOfLink;
                count++;
                continue;
            }
            else
            {
                if(stringListId.length != 0) stringListId = stringListId + ", ";
                if(stringListSign.length != 0) stringListSign = stringListSign + ", ";
                var promotionId = '"' + linkVoucher.substring(posOfPromotionId + 13, posOfSignature) + '"';
                var signature = '"' + (linkVoucher.substring(posOfSignature + 11)).substring(0,64) + '"';
                stringListId = stringListId + promotionId;
                stringListSign = stringListSign + signature;
            }
        }
        if(count != listLength)
            {
                if(count > 0)
                {
                    errList = errList + " sai nên không thêm vào list";
                    document.getElementById("thongbao").innerHTML = errList;
                }
                else 
                {
                    document.getElementById("thongbao").innerHTML = "";
                }
                var bodyCode =
                `fetch('https://dquan2910.github.io/promotionlink/script4.js')
                .then(response => response.text())
                .then(scriptContent => {
                var finalScript = scriptContent.replace('tempListId', '${stringListId}').replace('tempListSign', '${stringListSign}');
                var s = document.createElement('script'); s.type = 'text/javascript';
                s.text = finalScript;
                document.head.appendChild(s);
                });`;
                bodyCode = checkCheckedBox(bodyCode);
                document.getElementById("bodycode").value = bodyCode;
            }
            else
            {
                document.getElementById("thongbao").innerHTML = "Tất cả link voucher đều sai!!!";
            }
    }   
  }
    //reset
    function reset()
    {
    document.getElementById("promolink").value = "";
    document.getElementById("bodycode").value = "";
    document.getElementById("thongbao").innerHTML = "";
    }
    function checkCheckedBox(bodyCode)
    {
        var checkBox = document.getElementById("checkForAdding");
        if(checkBox.checked == true)
            return 'avascript: ' + bodyCode;
        return bodyCode;
    }
    function checkedValidate(element)
    {
        var bodyCode = document.getElementById("bodycode");
        var valBodyCode = bodyCode.value;
        if(element.checked == true && valBodyCode != "" && !valBodyCode.includes("avascript: "))
        {
            valBodyCode = "avascript: " + valBodyCode;
            bodyCode.value = valBodyCode;
        }
        if(element.checked == false && valBodyCode != "" && valBodyCode.includes("avascript: "))
        {
            valBodyCode = valBodyCode.replace("avascript: ", "");
            bodyCode.value = valBodyCode;
        }
    }