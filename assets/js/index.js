// JavaScript Document
$(function() {
    // グローバル変数
    dataSongs = ""; // xmlデータソース

    // ページ読み込み時(xml読み込み)
    $.ajax({
        url: 'assets/xml/songs.xml',
        type: 'GET',
        dataType: 'xml',
        cache: false,
        })
        .done(function(data) {
            // 曲リストを初期化
            $("#list-song").empty();

            dataSongs = data;
            $(dataSongs).find("data song").each(function(index, song){
                let songNumber = $(song).find('number').text();
                let songTitle = $(song).find('title').text();
//                console.log("number:" + songNumber);
//                console.log("title:" + songTitle);
                let html = '<button type="button" class="btn-select-song list-group-item list-group-item-action" data-song-number="' + songNumber + '">';
                html+= '<div class="d-flex flex-row">';
                html+= '<div class="list-song-number">' + songNumber + '</div>';
                html+= '<div class="list-song-name">' + songTitle + '</div>';
                html+= '</div>';
                html+= '</button>';
                $('#list-song').append(html);
            });
        })
        .fail(function(daxhr, textStatus, errorThrownta){
            alert("データが読み込めませんでした：" + daxhr.status);
        })
        .always(function(data){
        });

    // リロード
    $("#navbar-brand").click(function(){
        location.reload();
    });

    // 曲選択
    $("body").on('click','.btn-select-song', function() {

        // 選択した曲番
        let selectedNumber = $(this).data('song-number');
        $(dataSongs).find("data song").each(function(index, song){
//            console.log($(this).data('song-number'));

            let songNumber = $(song).find('number').text();
            if (selectedNumber == songNumber) {
                // 歌詞表示処理
                let title = $(song).find('title').text();
                let explanation = nl2br($(song).find('explanation').text());
                let lyrics = nl2br($(song).find('lyrics').text());
                let optional = nl2br($(song).find('optional').text());
                $("#song-title").text(songNumber + "番 " + title);
                $("#song-explanation").html(explanation);
                $("#song-lyrics").html(lyrics);
                $("#song-optional").html(optional);

                // モーダルウインドウ消去
                $('#modal-song-list').modal('hide');
                return false;
            }
        });
    });



//console.log("aaa");

    // 開業処理
    function nl2br(str) {
        str = str.replace(/\r\n/g, "<br />");
        str = str.replace(/(\n|\r)/g, "<br />");
        return str;
    }
});
