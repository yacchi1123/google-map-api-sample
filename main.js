// GoogleMapオプション
const Options = {
 zoom: 15,      //地図の縮尺値
 mapTypeId: 'roadmap'   //地図の種類
};

const createMap = (address) => {
  // GoogleMap生成
  const map = new google.maps.Map(document.getElementById('map'), Options);

  // 渋滞情報のレイヤー作成
  const trafficLayer = new google.maps.TrafficLayer();
  trafficLayer.setMap(map);

  // 入力した住所の緯度と経度を取得し、ピン留め
  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({
      address
    }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {

        // 経度と緯度取得
        const latlng = results[0].geometry.location;

        // ピン留め及びピン留めした部分を中央に表示
        map.setCenter(latlng);
        new google.maps.Marker({position:latlng, map:map});
      }
  })
};

const btn = document.getElementById('search-btn');
btn.addEventListener('click', () => {
  const inputAddress = document.getElementById('address');
  createMap(inputAddress.value);
})