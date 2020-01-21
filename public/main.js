function getComments() {
  $.get("/comments", function(data){
    if(!data) {
      console.log('no data...')
    } else {
      console.log('Received data...')
      // for(var i = 0; i < data.length; i++){
      //   console.log(data[i].name)
      // }
      showComments(data)
    }
  })
}

function showComments(_data) {
  var comments_list = document.querySelector('#comments_list');
  var html = '';
  for(var i = 0; i < _data.length; i++){
    console.log(_data[i].name)
    html += '<li>'
    html += '<p>' + _data[i].comment + '</p>'
    html += '<b>작성자: ' + _data[i].name + '</b>'
    html += '<span>id: ' + _data[i].id + '</span>'
    html += '</li>'
  }
  comments_list.innerHTML = html;
}

// 서버에서 글 가져오기
getComments()