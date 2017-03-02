
export function draftEmail(jsonObj){
  var jsonInformationArray = [];

    var fieldsObj=jsonObj['fields'];
    for(var i in fieldsObj){
        jsonInformationArray.push(fieldsObj[i].displayName);
        jsonInformationArray.push(fieldsObj[i].value);
    }

  var fieldsData = '';
  for(var i = 0; i < jsonInformationArray.length; i++){
    fieldsData += jsonInformationArray[i];
    if(i%2 != 0){
      fieldsData += '\n';
    }else{
      fieldsData += ': ';
    }
  }

  var emailDraft = jsonObj.displayName + '\n' + fieldsData + '\n' + '\n' + "Made With Cordial!";
  return emailDraft;
}
